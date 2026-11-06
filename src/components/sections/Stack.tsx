import { skillGroups, spokenLanguages } from '@/content';
import { useLanguage } from '@/i18n';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import './Stack.css';

export function Stack() {
  const { t, pick } = useLanguage();

  return (
    <section className="section" id="stack">
      <div className="container">
        <SectionHeading
          index="//03"
          code="sec_stack"
          title={t.stackTitle}
          outline={t.stackTitleOutline}
          subtitle={t.stackSubtitle}
          layer="h2.stack"
        />

        <Reveal className="stack-matrix">
          {skillGroups.map((group) => (
            <div key={group.id} className="stack-matrix__cell">
              <h4>{pick(group.title)}</h4>
              <div className="stack-matrix__kicker mono">{pick(group.kicker)}</div>
              <ul className="stack-matrix__chips">
                {group.items.map((item) => {
                  const label = typeof item === 'string' ? item : pick(item);
                  return <li key={label}>{label}</li>;
                })}
              </ul>
            </div>
          ))}
        </Reveal>

        <Reveal className="stack-languages">
          {spokenLanguages.map((language) => (
            <div key={language.name.pt}>
              <span className="mono">
                {pick(language.name)} · {pick(language.level)}
              </span>
              <div className="stack-languages__meter" aria-label={`${language.score}/5`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <i key={n} className={n <= language.score ? 'is-on' : undefined} />
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
