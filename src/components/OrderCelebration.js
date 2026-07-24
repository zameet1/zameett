"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

const CHIME_URL = "/audio/zameett-sale-chime-v4.wav";

export default function OrderCelebration({ active }) {
  const [needsTap, setNeedsTap] = useState(false);
  const audioRef = useRef(null);

  const play = useCallback(async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(CHIME_URL);
      audioRef.current.preload = "auto";
      audioRef.current.volume = 0.78;
    }

    audioRef.current.currentTime = 0;
    try {
      await audioRef.current.play();
      setNeedsTap(false);
    } catch {
      setNeedsTap(true);
    }
  }, []);

  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(play, 180);
    return () => window.clearTimeout(timer);
  }, [active, play]);

  useEffect(() => () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, []);

  if (!active) return null;

  return (
    <div className="order-celebration" aria-label="Order completed successfully">
      <audio src={CHIME_URL} preload="auto" aria-hidden="true" />
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
      <div className="order-success-seal" aria-hidden="true"><span>{"\u2713"}</span></div>
      <button type="button" className="order-sound-button" onClick={play}>
        {needsTap ? "Play sale chime" : "Replay sale chime"}
      </button>
    </div>
  );
}