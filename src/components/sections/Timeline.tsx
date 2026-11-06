import { useState } from 'react';
import type { TimelineItem } from '@/content';
import { useLanguage } from '@/i18n';
import { useReveal } from '@/hooks/useReveal';
import './Timeline.css';

export function Timeline({ items }: { items: TimelineItem[] }) {
  const { pick } = useLanguage();
  const [drawn, setDrawn] = useState(false);
  const ref = useReveal<HTMLOListElement>(() => setDrawn(true));

  return (
    <ol ref={ref} className={`timeline${drawn ? ' is-drawn' : ''}`}>
      {items.map((item) => (
        <li key={item.period.pt} className={`timeline__item${item.current ? ' is-current' : ''}`}>
          <div className="timeline__period mono">{pick(item.period)}</div>
          <h3>{pick(item.role)}</h3>
          <div className="timeline__place">{item.place}</div>
          <p>{pick(item.description)}</p>
          {item.image && (
            // a foto é "colocada" pelo cursor do editor quando a seção aparece
            <div className="timeline__photo" data-edit-section="place-image" data-layer="formatura.jpg">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4" />
              </svg>
              <img src={item.image.src} alt={pick(item.image.alt)} loading="lazy" />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
