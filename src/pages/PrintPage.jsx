import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { cases } from '../data/cases';
import { getPrintCaseCopy } from '../data/printCaseCopy';
import {
  MARQUEE_ITEMS,
  SKILLS,
  WORK_CATEGORIES,
  CATEGORY_LABELS,
  getCardHighlight,
} from '../data/siteMeta';
import '../styles/print.css';

function PrintToolbar() {
  return (
    <div className="print-toolbar no-print">
      <Link to="/" className="print-toolbar__back">
        ← Интерактивная версия
      </Link>
      <button type="button" className="print-toolbar__btn" onClick={() => window.print()}>
        Сохранить PDF
      </button>
    </div>
  );
}

export default function PrintPage() {
  const [params] = useSearchParams();

  useEffect(() => {
    document.title = 'Норкина Валерия — SMM-портфолио (A4)';
    document.documentElement.classList.add('print-mode');
    return () => document.documentElement.classList.remove('print-mode');
  }, []);

  useEffect(() => {
    if (params.get('autoprint') !== '1') return;
    const t = setTimeout(() => window.print(), 600);
    return () => clearTimeout(t);
  }, [params]);

  return (
    <div className="print-doc print-doc--a4">
      <PrintToolbar />

      <header className="a4-hero">
        <div className="a4-hero__text">
          <p className="a4-hero__eyebrow">Портфолио · 2026</p>
          <h1 className="a4-hero__name">
            Норкина <span>Валерия</span>
          </h1>
          <p className="a4-hero__role">SMM-специалист · открыта к предложениям</p>
          <p className="a4-hero__desc">
            Веду соцсети для бизнеса. Работаю с B2C и B2B: салоны красоты, клиники, IT, магазины, подбор персонала.
          </p>
          <p className="a4-hero__contacts">
            <a href="mailto:norkina05@icloud.com">norkina05@icloud.com</a>
            {' · '}
            <a href="tel:+79263350550">+7 (926) 335-05-50</a>
          </p>
          <div className="a4-hero__stats">
            <span><strong>5 лет</strong> в SMM</span>
            <span><strong>+50 тыс.</strong> подписчиков</span>
            <span><strong>7</strong> кейсов</span>
            <span><strong>Удалённо</strong> или гибридно</span>
          </div>
        </div>
        <div className="a4-hero__photo">
          <img
            src={`${import.meta.env.BASE_URL}assets/photo.png`}
            alt="Норкина Валерия"
            width="120"
            height="150"
          />
        </div>
      </header>

      <section className="a4-section">
        <h2 className="a4-section__title">Площадки и инструменты</h2>
        <div className="a4-tags">
          {MARQUEE_ITEMS.map((item) => (
            <span className="a4-tag" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="a4-section">
        <h2 className="a4-section__title">Кейсы</h2>
        <table className="a4-cases">
          <thead>
            <tr>
              <th>#</th>
              <th>Проект</th>
              <th>Результат</th>
              <th>Показатели</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((item, i) => {
              const copy = getPrintCaseCopy(item.slug, item);
              const cat = CATEGORY_LABELS[WORK_CATEGORIES[item.slug]];
              const metrics = item.heroMetrics
                .map((m) => `${m.value} ${m.label}`)
                .join(' · ');
              return (
                <tr key={item.slug}>
                  <td className="a4-cases__num">{String(i + 1).padStart(2, '0')}</td>
                  <td className="a4-cases__name">
                    <strong>{item.name}</strong>
                    <span>
                      {cat} · {item.cardTag}
                    </span>
                  </td>
                  <td className="a4-cases__result">
                    <em>{getCardHighlight(item)}</em>
                    {copy.resultsText && <p>{copy.resultsText}</p>}
                  </td>
                  <td className="a4-cases__metrics">{metrics}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="a4-section a4-section--skills">
        <h2 className="a4-section__title">Навыки</h2>
        <div className="a4-skills">
          {SKILLS.map((skill) => (
            <div className="a4-skill" key={skill.title}>
              <strong>{skill.title}</strong>
              <span>{skill.tags.join(' · ')}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="a4-footer">
        Ищу работу SMM-специалистом · удалённо или в гибридном формате · norkina05@icloud.com · +7 (926) 335-05-50
      </footer>
    </div>
  );
}
