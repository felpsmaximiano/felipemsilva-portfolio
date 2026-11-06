import { useEffect, useRef } from 'react';

/**
 * Revela o elemento quando ele entra na tela.
 * Só esconde o que começa fora da tela, então o primeiro quadro da página
 * já aparece completo. Usa `data-reveal` (não `className`) para não
 * conflitar com as classes controladas pelo React.
 */
export function useReveal<T extends HTMLElement>(onReveal?: (el: T) => void) {
  const ref = useRef<T>(null);
  const callback = useRef(onReveal);
  callback.current = onReveal;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const show = () => {
      el.dataset.reveal = 'shown';
      callback.current?.(el);
    };

    if (reduced || el.getBoundingClientRect().top < window.innerHeight * 0.95) {
      show();
      return;
    }

    el.dataset.reveal = 'hidden';
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
