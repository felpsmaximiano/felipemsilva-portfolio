import { profile } from '@/content';
import { useLanguage } from '@/i18n';
import './Footer.css';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="container footer__inner mono">
        <span>
          © {new Date().getFullYear()} {profile.fullName}
        </span>
        <span>{t.footer}</span>
      </div>
    </footer>
  );
}
