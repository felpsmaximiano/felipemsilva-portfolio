import { useLanguage } from '@/i18n';
import './Navbar.css';

export function Navbar() {
  const { t, lang, toggleLang } = useLanguage();
  const links = [
    { href: '#sobre', label: t.navAbout },
    { href: '#projetos', label: t.navProjects },
    { href: '#stack', label: t.navStack },
    { href: '#contato', label: t.navContact },
  ];

  return (
    <nav className="navbar" data-intro="nav">
      <div className="container navbar__inner">
        <a className="navbar__logo" href="#topo">
          <b>FM</b>
          <span>FELIPE.DEV</span>
        </a>
        <div className="navbar__links">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="navbar__status">
          <i className="navbar__dot" />
          <span>{t.openToWork}</span>
        </div>
        <button type="button" className="navbar__lang" onClick={toggleLang} aria-label={t.switchLanguage}>
          <span className={lang === 'pt' ? 'is-on' : undefined}>PT</span> /{' '}
          <span className={lang === 'en' ? 'is-on' : undefined}>EN</span>
        </button>
      </div>
    </nav>
  );
}
