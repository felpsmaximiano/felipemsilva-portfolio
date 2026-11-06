import { useReveal } from '@/hooks/useReveal';
import { SelectionBox } from './SelectionBox';
import './SectionHeading.css';

interface SectionHeadingProps {
  index: string;
  code: string;
  title: string;
  outline: string;
  subtitle?: string;
  layer: string;
}

/** Título de seção: índice em código, título com parte vazada e uma seleção que pisca ao aparecer. */
export function SectionHeading({ index, code, title, outline, subtitle, layer }: SectionHeadingProps) {
  const ref = useReveal<HTMLDivElement>((el) => {
    el.dataset.flash = 'true';
  });

  return (
    <header className="section-heading">
      <div className="section-heading__id mono">
        <b>{index}</b>
        <span>{code}</span>
      </div>
      <div ref={ref} className="section-heading__title-wrap">
        <h2 className="section-heading__title">
          {title} <span className="outline-text">{outline}</span>
        </h2>
        <SelectionBox label={layer} className="section-heading__selection" />
      </div>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </header>
  );
}
