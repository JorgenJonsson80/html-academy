import { useEffect, useState } from 'react';

const DELAY_MS = 300;

// Länkar och formulär i rutan. En sida i srcdoc har appens adress, så
// href="#recept" skulle ladda appen i rutan – vi rullar dit själva i
// stället. Andra sidor vägrar ofta visas i en ram, så de öppnas i en ny
// flik. Formulär skickas ingenstans: en ruta visar vad som skulle ha
// skickats, så att eleven ser vad name gör.
const PREVIEW_SCRIPT = `<script>
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
document.addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('skickat-ruta')?.remove();
  const sent = [...new FormData(event.target)];
  const box = document.createElement('div');
  box.id = 'skickat-ruta';
  box.style.cssText = 'position:fixed;left:8px;right:8px;bottom:8px;padding:10px 14px;border-radius:8px;background:#1e1b4b;color:#fff;font:14px/1.5 system-ui,sans-serif;box-shadow:0 4px 16px rgba(0,0,0,.3);z-index:2147483647';
  const title = document.createElement('strong');
  title.textContent = sent.length > 0 ? '📨 Det här skulle ha skickats:' : '📨 Ingenting skulle skickas – fälten behöver ett name.';
  box.append(title);
  for (const [name, value] of sent) {
    const row = document.createElement('div');
    row.textContent = name + ' = ' + (value === '' ? '(tomt)' : value);
    box.append(row);
  }
  const close = document.createElement('button');
  close.type = 'button';
  close.textContent = 'Stäng';
  close.style.cssText = 'margin-top:6px;font:inherit';
  close.addEventListener('click', () => box.remove());
  box.append(close);
  document.body.append(box);
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
        sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        srcDoc={shown + PREVIEW_SCRIPT}
      />
    </figure>
  );
}
