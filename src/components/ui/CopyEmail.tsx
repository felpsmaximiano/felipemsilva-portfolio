import { useRef, useState } from 'react';
import { useLanguage } from '@/i18n';

/** Mostra o e-mail como texto selecionável e copia com um clique (com alternativa se o navegador recusar). */
export function CopyEmail({ email }: { email: string }) {
  const { t } = useLanguage();
  const [label, setLabel] = useState<string | null>(null);
  const codeRef = useRef<HTMLElement>(null);

  const selectText = () => {
    const node = codeRef.current;
    if (!node) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    setLabel(t.selectedFallback);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setLabel(t.copied);
      window.setTimeout(() => setLabel(null), 1800);
    } catch {
      selectText();
    }
  };

  return (
    <>
      <code ref={codeRef}>{email}</code>
      <button type="button" onClick={copy}>
        {label ?? t.copyEmail}
      </button>
    </>
  );
}
