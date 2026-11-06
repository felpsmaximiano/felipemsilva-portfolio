import { useEffect, useState } from 'react';

/**
 * Conta de 0 até `target` quando `start` vira verdadeiro.
 * Começa em 0 para não "piscar" o valor final antes da contagem.
 */
export function useCountUp(target: number, start: boolean, stepMs = 140) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    setValue(0);
    const id = window.setInterval(() => {
      setValue((v) => {
        if (v + 1 >= target) window.clearInterval(id);
        return Math.min(target, v + 1);
      });
    }, stepMs);
    return () => window.clearInterval(id);
  }, [target, start, stepMs]);

  return value;
}
