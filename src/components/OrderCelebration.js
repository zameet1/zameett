"use client";

import { useCallback, useEffect, useState } from "react";

const COINS = [
  [-250, -120, 110, 210, 18], [-205, -180, -80, 230, 22],
  [-160, -100, 140, 260, 17], [-115, -210, -120, 220, 24],
  [-70, -145, 95, 280, 19], [-25, -235, -150, 245, 22],
  [25, -220, 130, 265, 18], [70, -155, -95, 295, 21],
  [115, -205, 150, 235, 24], [160, -115, -135, 275, 18],
  [205, -175, 100, 225, 22], [250, -105, -110, 250, 19],
  [-285, -30, -120, 315, 21], [-225, -45, 150, 290, 17],
  [-145, -20, -90, 330, 23], [-55, -55, 120, 305, 18],
  [55, -35, -140, 325, 22], [145, -15, 100, 340, 18],
  [225, -40, -120, 300, 24], [285, -25, 150, 320, 19],
];

function addTone(context, start, frequency, duration, volume, type = "sine") {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.025, start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration);
}

function addRegisterClick(context, start, duration, volume, frequency) {
  const frameCount = Math.max(1, Math.floor(context.sampleRate * duration));
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const channel = buffer.getChannelData(0);
  for (let index = 0; index < frameCount; index += 1) {
    const envelope = 1 - index / frameCount;
    channel[index] = (Math.random() * 2 - 1) * envelope;
  }
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.value = frequency;
  filter.Q.value = 0.8;
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);
  source.start(start);
}

async function playCoinChime() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return false;

  const context = new AudioContext();
  try {
    await Promise.race([
      context.resume(),
      new Promise((resolve) => window.setTimeout(resolve, 350)),
    ]);
    if (context.state !== "running") {
      await context.close();
      return false;
    }

    const start = context.currentTime + 0.025;
    addRegisterClick(context, start, 0.045, 0.17, 1450);
    addTone(context, start + 0.035, 118, 0.1, 0.08, "square");
    addRegisterClick(context, start + 0.085, 0.08, 0.12, 720);
    addTone(context, start + 0.1, 1046.5, 0.18, 0.14, "triangle");
    addTone(context, start + 0.155, 1567.98, 0.23, 0.12, "triangle");
    addTone(context, start + 0.22, 2093, 0.34, 0.1);
    addTone(context, start + 0.285, 2637.02, 0.48, 0.075);

    window.setTimeout(() => context.close(), 1150);
    return true;
  } catch {
    await context.close();
    return false;
  }
}
export default function OrderCelebration({ active }) {
  const [needsTap, setNeedsTap] = useState(false);

  const play = useCallback(async () => {
    const played = await playCoinChime();
    setNeedsTap(!played);
  }, []);

  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(play, 180);
    return () => window.clearTimeout(timer);
  }, [active, play]);

  if (!active) return null;

  return (
    <div className="order-celebration" aria-label="Order completed successfully">
      <div className="order-coin-burst" aria-hidden="true">
        {COINS.map(([x, y, rotation, endY, size], index) => (
          <span
            className="order-coin"
            key={`${x}-${y}`}
            style={{
              "--coin-x": `${x}px`,
              "--coin-y": `${y}px`,
              "--coin-end-y": `${endY}px`,
              "--coin-rotation": `${rotation}deg`,
              "--coin-delay": `${index * 32}ms`,
              "--coin-size": `${size}px`,
            }}
          >
            Z
          </span>
        ))}
      </div>
      <div className="order-success-seal" aria-hidden="true"><span>✓</span></div>
      {needsTap && (
        <button type="button" className="order-sound-button" onClick={play}>
          Play coin sound
        </button>
      )}
    </div>
  );
}