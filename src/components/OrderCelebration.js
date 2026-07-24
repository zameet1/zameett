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

async function playCoinChime() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return false;

  const context = new AudioContext();
  try {
    await context.resume();
    if (context.state !== "running") {
      await context.close();
      return false;
    }

    const start = context.currentTime;
    [
      { frequency: 987.77, delay: 0, duration: 0.18, volume: 0.16 },
      { frequency: 1318.51, delay: 0.07, duration: 0.24, volume: 0.13 },
      { frequency: 1975.53, delay: 0.14, duration: 0.36, volume: 0.1 },
    ].forEach(({ frequency, delay, duration, volume }) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, start + delay);
      gain.gain.setValueAtTime(0.0001, start + delay);
      gain.gain.exponentialRampToValueAtTime(volume, start + delay + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + delay + duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(start + delay);
      oscillator.stop(start + delay + duration);
    });

    window.setTimeout(() => context.close(), 900);
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