import { MARQUEE_ITEMS } from '../data/siteMeta';

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            <span className="marquee__dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
