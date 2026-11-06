import { useEffect, useRef } from 'react';
import { mountCursorTrail } from '@/lib/effects';

/** Canvas fixo com o rastro do mouse. Desligado em telas de toque e com movimento reduzido. */
export function CursorTrail({ enabled }: { enabled: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled || !ref.current || !window.matchMedia('(pointer: fine)').matches) return;
    return mountCursorTrail(ref.current);
  }, [enabled]);

  if (!enabled) return null;
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 90 }}
    />
  );
}
