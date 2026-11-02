import { useEffect, useState } from 'react';
import { ideaStarterCode } from '../data/ideas';
import {
  loadPlaygroundCodes,
  PLAYGROUND_COPY as COPY,
  PLAYGROUND_FREE as FREE,
  savePlaygroundCodes,
} from '../lib/playground';
import CodeEditor from './CodeEditor';
import CodeText from './CodeText';
import PagePreview from './PagePreview';

// En fri editor utan tester. Sidan syns medan man skriver, och man
// bestämmer själv när den är klar. Koden sparas per idé.
// ideas: alla idéer, med unlocked och trackTitle. ideaId kan också vara
// COPY för kod som kopierats från en övning.
export default function Playground({ ideas, ideaId, onSelectIdea, onBack }) {
  const [codes, setCodes] = useState(loadPlaygroundCodes);
  const idea = ideas.find(item => item.id === ideaId && item.unlocked) ?? null;
  const hasCopy = codes[COPY] !== undefined;
  const key = idea?.id ?? (ideaId === COPY && hasCopy ? COPY : FREE);
  const code = codes[key] ?? ideaStarterCode(idea);

  useEffect(() => {
    savePlaygroundCodes(codes);
  }, [codes]);

  function handleCodeChange(newCode) {
    setCodes(previous => ({ ...previous, [key]: newCode }));
  }

  function handleSelect(event) {
    onSelectIdea(event.target.value === FREE ? null : event.target.value);
  }

  function handleReset() {
    setCodes(previous => {
      const rest = { ...previous };
      delete rest[key];
      return rest;
    });
  }

  const tracksWithIdeas = [...new Set(ideas.map(item => item.trackTitle))];

  return (
    <section
      className="lesson-panel playground"
      aria-labelledby="playground-title"
    >
      <button type="button" className="playground-back" onClick={onBack}>
        ← Tillbaka till övningarna
      </button>
      <h2 id="playground-title">🧪 Lekplatsen</h2>
      <p>
        Här finns inga tester och inget facit. Skriv vad du vill, och se sidan
        växa fram under editorn. Du bestämmer själv när det är klart.
      </p>

      <label className="playground-pick">
        Bygg
        <select value={key} onChange={handleSelect}>
          <option value={FREE}>Fritt – ingen idé</option>
          {hasCopy && <option value={COPY}>📋 Kopia från övningen</option>}
          {tracksWithIdeas.map(trackTitle => (
            <optgroup key={`group-${trackTitle}`} label={trackTitle}>
              {ideas
                .filter(item => item.trackTitle === trackTitle)
                .map(item => (
                  <option
                    key={item.id}
                    value={item.id}
                    disabled={!item.unlocked}
                  >
                    {item.emoji} {item.title}
                    {item.unlocked ? '' : ' 🔒'}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </label>
      <p className="muted playground-locked-note">
        🔒 Idéerna på en bana låses upp när du byggt ett av banans projekt.
      </p>

      {idea && (
        <aside className="idea-card">
          <h3>
            {idea.emoji} {idea.title}
          </h3>
          <p>{idea.summary}</p>
          <ol>
            {idea.goals.map(goal => (
              <li key={goal}>
                <CodeText text={goal} />
              </li>
            ))}
          </ol>
          <p>
            <strong>Extra:</strong> <CodeText text={idea.extra} />
          </p>
        </aside>
      )}

      <CodeEditor code={code} onCodeChange={handleCodeChange} />
      <div className="editor-actions">
        <button type="button" onClick={handleReset}>
          Börja om
        </button>
      </div>
      <PagePreview code={code} />
    </section>
  );
}
