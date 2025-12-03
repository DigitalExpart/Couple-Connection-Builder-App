import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeartBurstProps {
  x: number;
  y: number;
  onComplete: () => void;
}

export function HeartBurst({ x, y, onComplete }: HeartBurstProps) {
  const [hearts] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i * 360) / 8,
      delay: Math.random() * 0.2,
    }))
  );

  useEffect(() => {
    const timer = setTimeout(onComplete, 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{ left: x, top: y }}
    >
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            animation: `burstOut 0.8s ease-out forwards`,
            animationDelay: `${heart.delay}s`,
            transform: `rotate(${heart.angle}deg)`,
          }}
        >
          <Heart className="w-6 h-6 text-rose-500 fill-rose-400" />
        </div>
      ))}
      <style>{`
        @keyframes burstOut {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx, 60px), var(--ty, -60px)) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
