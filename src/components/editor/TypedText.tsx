import { useSyncExternalStore, type HTMLAttributes, type ReactNode } from 'react';
import type { RichText } from '@/content';
import { typingState } from '@/lib/editor-session';
import './TypedText.css';

interface TypedTextProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Identificador usado pelo motor de animação para "digitar" este bloco. */
  typingId: string;
  text: RichText;
}

const lengthOf = (text: RichText) =>
  text.reduce((n, part) => n + (typeof part === 'string' ? part.length : part.b.length), 0);

/**
 * Parágrafo com trechos em negrito que pode ser "digitado" aos poucos.
 * O texto ainda não digitado fica invisível (mas ocupa espaço), então o layout
 * não pula durante a animação. Sem animação ativa, mostra tudo.
 */
export function TypedText({ typingId, text, ...rest }: TypedTextProps) {
  const typed = useSyncExternalStore(typingState.subscribe, () => typingState.get()[typingId]);
  const total = lengthOf(text);
  const typing = typed !== undefined;
  let remaining = typing ? Math.min(typed, total) : total;
  let caretPlaced = !typing;

  const parts = text.map((part, i) => {
    const content = typeof part === 'string' ? part : part.b;
    const cut = Math.max(0, Math.min(content.length, remaining));
    remaining -= content.length;

    const nodes: ReactNode[] = [content.slice(0, cut)];
    if (!caretPlaced && cut < content.length) {
      nodes.push(<span key="caret" className="typed-caret" aria-hidden="true" />);
      caretPlaced = true;
    }
    if (cut < content.length) {
      nodes.push(
        <span key="ghost" className="typed-ghost" aria-hidden="true">
          {content.slice(cut)}
        </span>,
      );
    }
    return typeof part === 'string' ? <span key={i}>{nodes}</span> : <b key={i}>{nodes}</b>;
  });

  // enquanto "digita", leitores de tela recebem o texto completo
  const fullText = text.map((p) => (typeof p === 'string' ? p : p.b)).join('');

  return (
    <p
      data-typing-id={typingId}
      data-length={total}
      aria-label={typing ? fullText : undefined}
      {...rest}
    >
      {parts}
      {!caretPlaced && <span className="typed-caret" aria-hidden="true" />}
    </p>
  );
}
