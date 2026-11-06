import { principles, timeline } from '@/content';
import { useLanguage } from '@/i18n';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Timeline } from './Timeline';
import './About.css';

export function About() {
  const { t, pick } = useLanguage();

  return (
    <section className="section" id="sobre">
      <div className="container">
        <SectionHeading
          index="//01"
          code="sec_sobre"
          title={t.aboutTitle}
          outline={t.aboutTitleOutline}
          subtitle={t.aboutSubtitle}
          layer="h2.sobre"
        />
        <div className="about">
          <Reveal>
            <p className="about__text">{t.aboutP1}</p>
            <p className="about__text">{t.aboutP2}</p>
            <ul className="about__principles">
              {principles.map((item) => (
                <li key={item.key.pt}>
                  <span className="mono">{pick(item.key)}</span>
                  <p>{pick(item.text)}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Timeline items={timeline} />
        </div>
      </div>
    </section>
  );
}
