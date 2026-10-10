import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { cases } from '../data/cases';
import { useScrollProgress } from '../hooks/useScrollProgress';
import PostsCarousel from '../components/PostsCarousel';

const SECTIONS = [
  { id: 'intro', label: 'О проекте' },
  { id: 'posts', label: 'Публикации' },
  { id: 'challenge', label: 'Задача' },
  { id: 'strategy', label: 'Подход' },
  { id: 'execution', label: 'Что делала' },
  { id: 'results', label: 'Результаты' },
  { id: 'role', label: 'Роль' },
];

const STORY_IDS = ['challenge', 'strategy', 'execution', 'results', 'role'];

function StoryBlock({ id, title, open, onToggle, children }) {
  return (
    <div className={`story-block${open ? ' story-block--open' : ''}`} id={id}>
      <button type="button" className="story-block__head" onClick={onToggle}>
        {title}
        <span className="story-block__icon">+</span>
      </button>
      <div className="story-block__body">
        <div className="story-block__content">{children}</div>
      </div>
    </div>
  );
}

export default function WorkPage() {
  const { slug } = useParams();
  const item = cases.find((c) => c.slug === slug);
  const progress = useScrollProgress();
  const [openBlocks, setOpenBlocks] = useState(() => new Set(['challenge']));
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    document.title = item?.title ?? 'Норкина Валерия — SMM-портфолио';
  }, [item]);

  useEffect(() => {
    const ids = SECTIONS.filter((s) => s.id !== 'posts' || item?.posts?.length).map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [item]);

  if (!item) return <Navigate to="/" replace />;

  const toggleBlock = (id) => {
    setOpenBlocks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (STORY_IDS.includes(id)) {
      setOpenBlocks((prev) => new Set(prev).add(id));
    }
  };

  return (
    <>
      <div className="work-page__progress" style={{ width: `${progress * 100}%` }} />

      <header className="work-page__hero">
        <div className="section__wrap">
          <Link to="/#work" className="work-page__back">← Все кейсы</Link>
          <p className="work-page__tag">{item.tag}</p>
          <h1 className="work-page__title">{item.name}</h1>
          <p className="work-page__meta">{item.meta}</p>
          <div className="work-page__metrics">
            {item.heroMetrics.map((m) => (
              <div className="work-page__metric" key={m.label}>
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="work-page__layout">
        <nav className="work-page__nav" aria-label="Разделы кейса">
          {SECTIONS.filter((s) => s.id !== 'posts' || item.posts?.length).map((s) => (
            <button
              key={s.id}
              type="button"
              className={`work-page__nav-link${activeSection === s.id ? ' work-page__nav-link--active' : ''}`}
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div>
          <div className="work-page__intro" id="intro">{item.intro}</div>

          {item.posts?.length > 0 && (
            <section className="posts-gallery" id="posts">
              <div className="posts-gallery__head">
                <p className="posts-gallery__eyebrow">Примеры публикаций</p>
                <h2 className="posts-gallery__title">Что выходило в соцсетях</h2>
                <p className="posts-gallery__lead">
                  Публикации из этого проекта.
                </p>
              </div>
              <PostsCarousel posts={item.posts} />
            </section>
          )}

          <StoryBlock
            id="challenge"
            title="Какая была задача"
            open={openBlocks.has('challenge')}
            onToggle={() => toggleBlock('challenge')}
          >
            {item.challenge.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
          </StoryBlock>

          <StoryBlock
            id="strategy"
            title="Что предложила"
            open={openBlocks.has('strategy')}
            onToggle={() => toggleBlock('strategy')}
          >
            {item.strategy.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
          </StoryBlock>

          <StoryBlock
            id="execution"
            title="Что делала"
            open={openBlocks.has('execution')}
            onToggle={() => toggleBlock('execution')}
          >
            {item.execution.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
          </StoryBlock>

          <StoryBlock
            id="results"
            title="Что получилось"
            open={openBlocks.has('results')}
            onToggle={() => toggleBlock('results')}
          >
            <div className="results-showcase">
              {item.results.map((r) => (
                <div className="result-pill" key={r.label}>
                  <div className="result-pill__value">{r.value}</div>
                  <div className="result-pill__label">{r.label}</div>
                </div>
              ))}
            </div>
          </StoryBlock>

          <StoryBlock
            id="role"
            title="За что отвечала"
            open={openBlocks.has('role')}
            onToggle={() => toggleBlock('role')}
          >
            <ul className="role-list">
              {item.role.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </StoryBlock>
        </div>
      </div>
    </>
  );
}
