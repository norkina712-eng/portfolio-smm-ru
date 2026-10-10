import { SKILLS } from '../data/siteMeta';
import { useInView } from '../hooks/useInView';

export default function SkillsSection() {
  const [headRef, headVisible] = useInView();
  const [gridRef, gridVisible] = useInView();

  return (
    <section className="section" id="skills">
      <div className="section__wrap">
        <div className={`reveal${headVisible ? ' reveal--visible' : ''}`} ref={headRef}>
          <p className="section__eyebrow">Навыки</p>
          <h2 className="section__title">Чем занимаюсь</h2>
          <p className="section__lead">Контент, оформление, общение с аудиторией и отчёты.</p>
        </div>

        <div className={`skills__grid reveal${gridVisible ? ' reveal--visible' : ''}`} ref={gridRef}>
          {SKILLS.map((skill, i) => (
            <div className="skill-tile" key={skill.title}>
              <div className="skill-tile__num">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="skill-tile__title">{skill.title}</h3>
              <div className="skill-tile__tags">
                {skill.tags.map((tag) => (
                  <span className="skill-tile__tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
