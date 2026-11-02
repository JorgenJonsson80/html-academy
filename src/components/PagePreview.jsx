import { useEffect, useState } from 'react';

const DELAY_MS = 300;

// Elevens sida, som uppdateras en stund efter att man slutat skriva. Utan
// allow-same-origin kommer sidan inte åt något utanför rutan.
export default function PagePreview({ code }) {
  const [shown, setShown] = useState(code);

  useEffect(() => {
    const timer = setTimeout(() => setShown(code), DELAY_MS);
    return () => clearTimeout(timer);
  }, [code]);

  return (
    <figure className="page-preview">
      <figcaption>👀 Din sida</figcaption>
      <iframe title="Din sida" sandbox="allow-scripts" srcDoc={shown} />
    </figure>
  );
}
