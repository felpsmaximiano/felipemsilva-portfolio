import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface RevealProps {
  className?: string;
  children: ReactNode;
}

/** Envolve um bloco que aparece suavemente ao entrar na tela. */
export function Reveal({ className, children }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
