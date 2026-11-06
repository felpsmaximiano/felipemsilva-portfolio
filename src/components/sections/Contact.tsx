import { profile } from '@/content';
import { useLanguage } from '@/i18n';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { SelectionBox } from '@/components/ui/SelectionBox';
import { useReveal } from '@/hooks/useReveal';
import '@/components/ui/SectionHeading.css';
import './Contact.css';

const prettyUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export function Contact() {
  const { t } = useLanguage();
  const titleRef = useReveal<HTMLDivElement>((el) => {
    el.dataset.flash = 'true';
  });

  return (
    <section className="contact" id="contato">
      <div className="container">
        <div className="contact__eyebrow mono">{t.contactEyebrow}</div>
        <div ref={titleRef} className="section-heading__title-wrap">
          <h2 className="section-heading__title contact__title">
            {t.contactTitle}
            <br />
            <span className="outline-text">{t.contactTitleOutline}</span>
          </h2>
          <SelectionBox label="h2.contato" className="section-heading__selection" />
        </div>
        <p className="contact__subtitle">{t.contactSubtitle}</p>

        <div className="contact__email" data-edit-section="resize" data-layer="campo.email" data-offset="0,0,0,.78">
          <CopyEmail email={profile.email} />
        </div>

        <Reveal className="contact__links">
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
            {prettyUrl(profile.links.linkedin)}
          </a>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
            {prettyUrl(profile.links.github)}
          </a>
        </Reveal>

        <Reveal>
          <ul className="contact__availability">
            {t.availability.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
