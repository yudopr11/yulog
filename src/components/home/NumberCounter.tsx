import { useEffect, useRef, useState } from 'react';

interface NumberCounterProps {
  target: number;
  duration?: number;
  className?: string;
}

export default function NumberCounter({
  target,
  duration = 2000,
  className = '',
}: NumberCounterProps) {
  const [count, setCount] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = Date.now();

    const animate = () => {
      if (startTimeRef.current === null) return;

      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easing function (ease-out cubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const currentCount = Math.floor(target * easeProgress);
      setCount(currentCount);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, duration]);

  return <div className={className}>{count}</div>;
}
