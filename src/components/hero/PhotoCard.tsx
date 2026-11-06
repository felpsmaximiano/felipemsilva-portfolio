import { useEffect, useRef, useState } from 'react';
import { profile } from '@/content';
import { useLanguage } from '@/i18n';
import { mountHalftone } from '@/lib/effects';
import { SelectionBox } from '@/components/ui/SelectionBox';
import './PhotoCard.css';

const pad = (n: number) => String(Math.round(n)).padStart(3, '0');

/** Foto recortada sobre um painel cobalto com monograma em meio-tom que reage ao mouse. */
export function PhotoCard({ reducedMotion }: { reducedMotion: boolean }) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coords, setCoords] = useState('X 000 · Y 000');

  useEffect(() => {
    const card = cardRef.current;
    const canvas = canvasRef.current;
    if (!card || !canvas) return;
    return mountHalftone(canvas, card, {
      text: 'FM',
      caption: '</>  FULL STACK',
      reducedMotion,
      onPointer: (x, y) => setCoords(`X ${pad(x)} · Y ${pad(y)}`),
    });
  }, [reducedMotion]);

  return (
    <div
      className="photo-card"
      data-edit="photo"
      data-layer="felipe.foto"
      data-offset="70,46,4,.84"
      data-intro="felipe.foto"
    >
      <div ref={cardRef} className="photo-card__frame">
        <canvas ref={canvasRef} className="photo-card__dots" aria-hidden="true" />
        <img className="photo-card__photo" src={profile.photo} alt={`Foto de ${profile.fullName}`} />
        <div className="photo-card__scan" aria-hidden="true" />
        <div className="photo-card__coords mono">{coords}</div>
        <div className="photo-card__badge">
          <i />
          <span>{t.photoBadge}</span>
        </div>
      </div>
      <SelectionBox label="felipe.foto" className="photo-card__selection" />
    </div>
  );
}
