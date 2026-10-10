import { useEffect, useState } from 'react';

export default function PostsCarousel({ posts }) {
  const [index, setIndex] = useState(0);
  const total = posts.length;
  const post = posts[index];

  useEffect(() => {
    setIndex(0);
  }, [posts]);

  if (!total) return null;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  return (
    <div className="posts-carousel" tabIndex={0} onKeyDown={onKey} aria-roledescription="carousel">
      <figure className="posts-carousel__frame">
        <div className="posts-carousel__stage">
          <img
            src={`${import.meta.env.BASE_URL}${post.src}`}
            alt={post.caption}
          />
          {total > 1 && (
            <>
              <button type="button" className="posts-carousel__nav posts-carousel__nav--prev" onClick={prev} aria-label="Предыдущая публикация">
                ‹
              </button>
              <button type="button" className="posts-carousel__nav posts-carousel__nav--next" onClick={next} aria-label="Следующая публикация">
                ›
              </button>
            </>
          )}
        </div>
        <figcaption className="posts-carousel__caption">
          <span>{post.caption}</span>
          <em>{index + 1} / {total}</em>
        </figcaption>
      </figure>
      {total > 1 && (
        <div className="posts-carousel__dots" role="tablist" aria-label="Слайды">
          {posts.map((item, i) => (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`posts-carousel__dot${i === index ? ' posts-carousel__dot--active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
