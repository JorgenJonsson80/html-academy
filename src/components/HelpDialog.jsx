import { useEffect, useRef } from 'react';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const MOD = isMac ? 'Cmd' : 'Ctrl';

// Instruktioner och tips. Öppnas automatiskt första gången man besöker
// sidan, och sedan från knappen Hjälp i sidhuvudet. Håll den uppdaterad
// när funktioner läggs till.
export default function HelpDialog({ onClose }) {
  const dialogRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    // Fokus på Nu kör vi!, så att Enter stänger. Texten ska ändå läsas
    // från början.
    startRef.current?.focus();
    if (dialog) dialog.scrollTop = 0;
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="quiz help-dialog"
      aria-labelledby="help-title"
      onClose={onClose}
    >
      <h2 id="help-title">👋 Välkommen!</h2>
      <p>
        Här lär du dig HTML och CSS genom att bygga riktiga webbsidor, direkt i
        webbläsaren. Du behöver inte kunna något innan och inte installera
        något.
      </p>

      <ol className="help-steps">
        <li>
          <strong>Läs uppgiften.</strong> Ny på det? Öppna{' '}
          <em>📖 Ny på det här?</em> för en förklaring och ett exempel.
        </li>
        <li>
          <strong>Skriv din kod</strong> i den mörka rutan.
        </li>
        <li>
          <strong>Tryck på Kolla lösning</strong> (eller <kbd>{MOD}+Enter</kbd>
          ). Du ser direkt vilka tester som gick igenom. Din sida syns hela
          tiden under editorn, medan du skriver.
        </li>
      </ol>
      <p className="muted">
        Fel är helt okej – du får ledtrådar på vägen och kan se lösningen till
        slut.
      </p>

      <details className="help-more">
        <summary>Fler tips: banor, editorn och knep</summary>
        <h3>Banor och figuren</h3>
        <ul>
          <li>
            Varje bana låses upp när den förra är klar. Din figur växer en ålder
            för varje klar bana och du får en pryl.
          </li>
          <li>
            Framstegen och koden du skrivit sparas i webbläsaren, så du kan
            fortsätta där du slutade. Loggar du in följer de med till andra
            enheter.
          </li>
          <li>
            👑 Varje bana slutar med en <strong>boss</strong>, en större uppgift
            utan ledtrådar. Besegra den så är banan klar.
          </li>
          <li>
            ⚡ Kan du redan en bana? <strong>Testa dig förbi</strong> med fyra
            snabba frågor, så låses nästa bana upp. Klara bossen så får du
            prylen. Har du kodat förut kan du göra <strong>nivåtestet</strong>{' '}
            och hoppa fram flera banor på en gång.
          </li>
          <li>
            🏆 <strong>Samlingen</strong> visar prylarna från banorna och
            priserna från projekten du byggt.
          </li>
          <li>
            🛠️ När en bana är klar låses tre <strong>projekt</strong> upp under
            den. Välj ett och bygg det i steg – koden följer med till nästa
            steg. Bygger du utan ledtrådar får du 50 % extra XP.
          </li>
          <li>
            🧪 På <strong>Lekplatsen</strong> bygger du fritt utan tester.
            Klarar du ett projekt låses tre idéer upp att bygga helt själv.
          </li>
        </ul>

        <h3>Editorn</h3>
        <ul>
          <li>
            <kbd>Tab</kbd> drar in raden två mellanslag. Webbläsaren bryr sig
            inte om indrag, men det gör koden lättare att läsa: du ser vilka
            taggar som ligger inuti vilka.
          </li>
          <li>
            <kbd>{MOD}+/</kbd> gör raden till en kommentar,{' '}
            <code>&lt;!-- så här --&gt;</code>, så att den inte syns på sidan.
          </li>
          <li>
            Skriv <code>&lt;</code> så dyker taggar upp som förslag, och när du
            skriver <code>&lt;/</code> stängs taggen åt dig. Välj med{' '}
            <kbd>Enter</kbd>.
          </li>
        </ul>

        <h3>Tips och trix</h3>
        <ul>
          <li>
            <strong>Titta på sidan.</strong> Syns inte det du skrev? Då är det
            ofta en tagg som inte är stängd, eller ett stavfel i taggens namn.
          </li>
          <li>
            <strong>🔍 Visa skillnaden.</strong> Under ett test som inte gick
            igenom kan du se exakt vilka tecken som skiljer, till exempel ett
            mellanslag som saknas.
          </li>
          <li>
            <strong>🆘 Fastnat?</strong> Längst ner finns fler sätt att förstå:
            bryt ner koden på Lekplatsen, kopiera en färdig fråga till en AI som
            hjälper utan att ge svaret, eller hitta en förklaring och en video
            om ämnet.
          </li>
          <li>
            <strong>Färga för att se.</strong> Ge ett element en tillfällig{' '}
            <code>outline: 2px solid red</code> för att se exakt var det ligger
            och hur stort det är. Det gör proffs också.
          </li>
          <li>
            <strong>Små steg.</strong> Skriv lite, kör, och skriv lite till. Det
            är lättare att hitta felet i tre nya rader än i trettio.
          </li>
          <li>
            <strong>Kolla facit efteråt.</strong> Är din lösning mycket längre
            än facit visas facit när du klarat uppgiften. Det finns ofta flera
            bra lösningar.
          </li>
        </ul>
      </details>

      <form method="dialog">
        <button type="submit" className="primary-button" ref={startRef}>
          Nu kör vi!
        </button>
      </form>
    </dialog>
  );
}
