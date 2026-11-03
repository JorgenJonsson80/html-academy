import { useEffect, useState } from 'react';

const DELAY_MS = 300;

// Länkar i rutan. En sida i srcdoc har appens adress, så href="#recept"
// skulle ladda appen i rutan – vi rullar dit själva i stället. Andra sidor
// vägrar ofta visas i en ram, så de öppnas i en ny flik.
const LINKS = `<script>
document.addEventListener('click', event => {
  const link = event.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href');
  event.preventDefault();
  if (href.startsWith('#')) {
    const id = decodeURIComponent(href.slice(1));
    const target = id ? document.getElementById(id) : document.body;
    target?.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.open(link.href, '_blank', 'noopener');
  }
});
</script>`;

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
      <iframe
        title="Din sida"
        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
        srcDoc={shown + LINKS}
      />
    </figure>
  );
}
