import './SelectionBox.css';

interface SelectionBoxProps {
  label: string;
  className?: string;
}

/** Moldura com alças nos cantos, como a seleção de um editor de design. */
export function SelectionBox({ label, className = '' }: SelectionBoxProps) {
  return (
    <div className={`selection-box ${className}`} aria-hidden="true">
      <b />
      <b />
      <b />
      <b />
      <em>{label}</em>
    </div>
  );
}
