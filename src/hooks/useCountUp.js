import { useEffect, useState } from 'react';

function parseMetric(value) {
  const match = value.match(/-?\d+(?:[.,]\d+)?/);
  if (!match) return null;
  const num = parseFloat(match[0].replace(',', '.'));
  const prefix = value.slice(0, match.index);
  const suffix = value.slice(match.index + match[0].length);
  return { num, prefix, suffix, decimals: (match[0].split(/[.,]/)[1] || '').length };
}

export function useCountUp(value, active, duration = 1400) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const parsed = parseMetric(value);
    if (!active || !parsed) {
      setDisplay(value);
      return;
    }

    let start = null;
    let frame;

    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = parsed.num * eased;
      const formatted = parsed.decimals
        ? current.toFixed(parsed.decimals).replace('.', ',')
        : Math.round(current).toString();
      setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);

      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, value, duration]);

  return display;
}
