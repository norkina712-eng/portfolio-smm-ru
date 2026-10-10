import { HERO_FLOATS } from '../data/siteMeta';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';

function Stat({ value, label, accent }) {
  const [ref, visible] = useInView();
  const display = useCountUp(value, visible);

  return (
    <div className="stat-card" ref={ref}>
      <div className={`stat-card__value${accent ? ' stat-card__value--accent' : ''}`}>{display}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  );
}

export default function HeroScene() {
  const [ref, visible] = useInView();

  return (
    <section className="hero" id="top">
      <div className="hero__grid">
        <div className={`reveal${visible ? ' reveal--visible' : ''}`} ref={ref}>
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Открыта к предложениям
          </div>
          <h1 className="hero__title">
            SMM-<br />
            <em>специалист</em>
          </h1>
          <p className="hero__desc">
            Веду Instagram, Telegram и VK: пишу тексты, снимаю контент и слежу, какие публикации приносят охваты и записи.
            Работаю с B2C и B2B: салоны красоты, клиники, IT, магазины.
          </p>
          <div className="hero__actions">
            <a href="#work" className="btn btn--primary">Смотреть кейсы ↓</a>
            <a href="mailto:norkina05@icloud.com" className="btn btn--ghost">Написать мне</a>
          </div>
          <div className="hero__stats">
            <Stat value="5 лет" label="в SMM" accent />
            <Stat value="+50 тыс." label="подписчиков на одном проекте" />
            <Stat value="7" label="проектов в портфолио" />
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__photo-wrap">
            <div className="hero__photo">
              <img
                src={`${import.meta.env.BASE_URL}assets/photo.png`}
                alt="Норкина Валерия"
                width="340"
                height="425"
              />
            </div>
          </div>
          {HERO_FLOATS.map((item) => (
            <div
              className={`hero__float ${item.position}${item.accent ? ' hero__float--accent' : ''}`}
              key={item.text}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
