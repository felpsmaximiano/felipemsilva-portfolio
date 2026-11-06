import { useEffect, useState } from 'react';

/**
 * Digita e apaga cada palavra da lista em loop (ex.: os cargos no topo).
 * Com `animate` falso (movimento reduzido), mostra todas as palavras de uma vez.
 * Com `animate` verdadeiro, fica vazio até `enabled` ligar, para não piscar.
 */
export function useTypewriterLoop(words: readonly string[], enabled: boolean, animate = true) {
  const [text, setText] = useState(animate ? '' : words.join(' · '));

  useEffect(() => {
    if (!animate) {
      setText(words.join(' · '));
      return;
    }
    if (!enabled) return;
    let index = 0;
    let chars = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const word = words[index % words.length];
      if (!deleting) {
        chars += 1;
        if (chars >= word.length) {
          deleting = true;
          setText(word);
          timer = window.setTimeout(tick, 1800);
          return;
        }
      } else {
        chars -= 1;
        if (chars <= 0) {
          deleting = false;
          index += 1;
        }
      }
      setText(word.slice(0, chars));
      timer = window.setTimeout(tick, deleting ? 28 : 55);
    };

    tick();
    return () => window.clearTimeout(timer);
  }, [words, enabled, animate]);

  return text;
}
