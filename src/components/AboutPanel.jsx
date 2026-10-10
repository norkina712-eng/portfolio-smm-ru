import { TIMELINE } from '../data/siteMeta';
import { useInView } from '../hooks/useInView';

export default function AboutPanel() {
  const [headRef, headVisible] = useInView();
  const [bodyRef, bodyVisible] = useInView();

  return (
    <section className="section" id="about">
      <div className="section__wrap">
        <div className={`reveal${headVisible ? ' reveal--visible' : ''}`} ref={headRef}>
          <p className="section__eyebrow">Обо мне</p>
          <h2 className="section__title">Как я работаю</h2>
        </div>

        <div className={`about__grid reveal${bodyVisible ? ' reveal--visible' : ''}`} ref={bodyRef}>
          <div className="about__panel">
            <p className="about__text">
              Около пяти лет занимаюсь продвижением в соцсетях. Веду аккаунты целиком: придумываю рубрики,
              пишу тексты, отвечаю за оформление, снимаю Reels и общаюсь с подписчиками в комментариях.
              Слежу за охватами, сохранениями и записями и усиливаю форматы, которые дают результат.
            </p>
            <p className="about__text">
              Работала с компаниями из IT, промышленности и подбора персонала, а также с салонами красоты,
              клиниками и магазинами. Для меня важно, чтобы соцсети приносили заявки и записи,
              а бизнес видел результат в цифрах.
            </p>
            <div className="about__highlights">
              <div className="about__highlight">
                <strong>5 лет</strong>
                <span>в SMM</span>
              </div>
              <div className="about__highlight">
                <strong>+50 тыс.</strong>
                <span>подписчиков, ANNA KEY</span>
              </div>
              <div className="about__highlight">
                <strong>7</strong>
                <span>проектов в портфолио</span>
              </div>
              <div className="about__highlight">
                <strong>Удалённо</strong>
                <span>или в гибридном формате</span>
              </div>
            </div>
          </div>

          <div className="about__timeline">
            {TIMELINE.map((item) => (
              <div className="timeline-item" key={item.year}>
                <div className="timeline-item__year">{item.year}</div>
                <div className="timeline-item__body">
                  <div className="timeline-item__title">{item.title}</div>
                  <p className="timeline-item__text">{item.text}</p>
                  {item.tags && (
                    <div className="timeline-item__tags">
                      {item.tags.map((tag) => (
                        <span className="timeline-item__tag" key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
