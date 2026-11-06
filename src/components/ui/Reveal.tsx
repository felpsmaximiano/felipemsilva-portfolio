import type { ElementType, ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface RevealProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Envolve um bloco que aparece suavemente ao entrar na tela. */
export function Reveal({ as: Tag = 'div', className, children }: RevealProps) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
