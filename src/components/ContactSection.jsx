import { useState } from 'react';
import { useInView } from '../hooks/useInView';

export default function ContactSection() {
  const [ref, visible] = useInView();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('norkina05@icloud.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = 'mailto:norkina05@icloud.com';
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="section__wrap">
        <div className={`contact__card reveal${visible ? ' reveal--visible' : ''}`} ref={ref}>
          <h2 className="contact__title">Контакты</h2>
          <p className="contact__lead">
            Ищу работу SMM-специалистом. Готова работать удалённо или в гибридном формате.
          </p>
          <div className="contact__buttons">
            <a href="mailto:norkina05@icloud.com" className="btn btn--primary">
              norkina05@icloud.com
            </a>
            <a href="tel:+79263350550" className="btn btn--ghost">
              +7 (926) 335-05-50
            </a>
            <button type="button" className="btn btn--ghost" onClick={copyEmail}>
              {copied ? 'Скопировано ✓' : 'Скопировать почту'}
            </button>
          </div>
          <p className={`contact__copy${copied ? ' contact__copy--success' : ''}`}>
            {copied ? 'Почта скопирована' : 'Обычно отвечаю в тот же день'}
          </p>
        </div>
      </div>

      <footer className="footer">
        <div className="section__wrap">Норкина Валерия · SMM-специалист · 2026</div>
      </footer>
    </section>
  );
}
