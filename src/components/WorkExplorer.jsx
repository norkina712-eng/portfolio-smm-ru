import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cases } from '../data/cases';
import { WORK_CATEGORIES, CATEGORY_LABELS, getCardHighlight } from '../data/siteMeta';
import { useInView } from '../hooks/useInView';

function WorkCard({ item, index, featured }) {
  const navigate = useNavigate();

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const open = () => navigate(`/work/${item.slug}`);

  if (featured) {
    const [m1, m2] = item.heroMetrics;
    return (
      <article
        className="work-card work-card--featured"
        onClick={open}
        onMouseMove={onMove}
        onKeyDown={(e) => e.key === 'Enter' && open()}
        role="button"
        tabIndex={0}
      >
        <div>
          <div className="work-card__top">
            <span className="work-card__tag">{item.cardTag} · Главный кейс</span>
            <span className="work-card__index">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <h3 className="work-card__name">{item.name}</h3>
          <p className="work-card__desc">{item.cardDesc}</p>
          <div className="work-card__footer">
            <span className="work-card__btn">Читать кейс →</span>
          </div>
        </div>
        <div className="work-card__featured-stats">
          <div className="work-card__featured-stat">
            <strong>{m1.value}</strong>
            <span>{m1.label}</span>
          </div>
          <div className="work-card__featured-stat">
            <strong>{m2.value}</strong>
            <span>{m2.label}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="work-card"
      onClick={open}
      onMouseMove={onMove}
      onKeyDown={(e) => e.key === 'Enter' && open()}
      role="button"
      tabIndex={0}
    >
      <div className="work-card__top">
        <span className="work-card__tag">{item.cardTag}</span>
        <span className="work-card__index">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="work-card__name">{item.name}</h3>
      <p className="work-card__desc">{item.cardDesc}</p>
      <div className="work-card__metrics">
        <span className="work-card__metric">{getCardHighlight(item)}</span>
      </div>
      <div className="work-card__footer">
        <span className="work-card__btn">Читать кейс →</span>
      </div>
    </article>
  );
}

export default function WorkExplorer() {
  const [filter, setFilter] = useState('all');
  const [headRef, headVisible] = useInView();
  const [gridRef, gridVisible] = useInView();

  const filtered = cases.filter((c) => {
    if (filter === 'all') return true;
    return WORK_CATEGORIES[c.slug] === filter;
  });

  return (
    <section className="section" id="work">
      <div className="section__wrap">
        <div className={`reveal${headVisible ? ' reveal--visible' : ''}`} ref={headRef}>
          <div className="work__header">
            <div>
              <p className="section__eyebrow">Портфолио</p>
              <h2 className="section__title">Кейсы</h2>
              <p className="section__lead">
                Разборы проектов и примеры публикаций.
              </p>
            </div>
            <div className="work__filters">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={`filter-chip${filter === key ? ' filter-chip--active' : ''}`}
                  onClick={() => setFilter(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`work__grid reveal${gridVisible ? ' reveal--visible' : ''}`} ref={gridRef}>
          {filtered.map((item, i) => (
            <WorkCard key={item.slug} item={item} index={i} featured={item.featured && filter === 'all'} />
          ))}
        </div>
      </div>
    </section>
  );
}
