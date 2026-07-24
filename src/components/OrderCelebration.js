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

    const start = context.currentTime + 0.04;

    // A crisp, ascending three-note order alert: ting ... ting ... ting.
    [
      [0, 1318.51, 0.13, 0.46],
      [0.2, 1567.98, 0.14, 0.54],
      [0.4, 2093, 0.16, 0.72],
    ].forEach(([delay, frequency, volume, duration], index) => {
      const noteStart = start + delay;
      addRegisterClick(context, noteStart, 0.018, 0.055, 3300 + index * 420);
      addTone(context, noteStart, frequency, duration, volume);
      addTone(context, noteStart + 0.006, frequency * 2, duration * 0.74, volume * 0.42);
      addTone(context, noteStart + 0.012, frequency * 3.01, duration * 0.48, volume * 0.16);
    });

    // A tiny final shimmer keeps the last "ting" bright and celebratory.
    addTone(context, start + 0.47, 2637.02, 0.55, 0.07);
    addTone(context, start + 0.49, 3520, 0.42, 0.035);

    window.setTimeout(() => context.close(), 1400);
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
      <button type="button" className="order-sound-button" onClick={play}>
        {needsTap ? "Play order tings" : "Replay order tings"}
      </button>
    </div>
  );
}