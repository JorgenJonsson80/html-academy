import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from '@codemirror/autocomplete';
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands';
import { html } from '@codemirror/lang-html';
import {
  bracketMatching,
  HighlightStyle,
  indentOnInput,
  indentUnit,
  syntaxHighlighting,
} from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import {
  drawSelection,
  EditorView,
  highlightActiveLine,
  keymap,
  lineNumbers,
} from '@codemirror/view';
import { tags } from '@lezer/highlight';
import { useEffect, useRef } from 'react';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const RUN_KEYS = isMac ? 'Cmd+Enter' : 'Ctrl+Enter';
const COMMENT_KEYS = isMac ? 'Cmd+/' : 'Ctrl+/';

const highlightStyle = HighlightStyle.define([
  {
    tag: [tags.keyword, tags.operatorKeyword, tags.controlKeyword],
    color: '#c4b5fd',
  },
  { tag: [tags.string, tags.special(tags.string)], color: '#86efac' },
  { tag: [tags.number, tags.bool, tags.null], color: '#fdba74' },
  { tag: tags.comment, color: '#64748b', fontStyle: 'italic' },
  {
    tag: [tags.function(tags.variableName), tags.function(tags.propertyName)],
    color: '#7dd3fc',
  },
  { tag: tags.definition(tags.variableName), color: '#fde68a' },
  { tag: tags.propertyName, color: '#f9a8d4' },
  { tag: [tags.className, tags.typeName], color: '#5eead4' },
  { tag: [tags.tagName, tags.angleBracket], color: '#7dd3fc' },
  { tag: tags.attributeName, color: '#fde68a' },
  { tag: tags.attributeValue, color: '#86efac' },
]);

const editorTheme = EditorView.theme(
  {
    '&': {
      margin: '8px 0 12px',
      border: '1px solid var(--border-strong)',
      borderRadius: '10px',
      background: 'var(--surface-sunken)',
      color: 'var(--text)',
      fontSize: '15px',
    },
    '&.cm-focused': {
      outline: '2px solid var(--accent)',
      outlineOffset: '2px',
    },
    '.cm-scroller': {
      minHeight: '220px',
      maxHeight: '560px',
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontVariantLigatures: 'none',
      lineHeight: '1.6',
    },
    '.cm-content': { padding: '16px 0', caretColor: 'var(--accent)' },
    '.cm-gutters': {
      background: 'transparent',
      border: 'none',
      color: 'var(--border-strong)',
      borderRadius: '10px 0 0 10px',
    },
    '.cm-activeLine': { background: 'rgba(148, 163, 184, 0.06)' },
    '.cm-cursor': { borderLeftColor: 'var(--accent)' },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
      background: 'var(--accent-soft) !important',
    },
    '.cm-matchingBracket': { background: 'rgba(167, 139, 250, 0.25)' },
    '.cm-tooltip': {
      border: '1px solid var(--border-strong)',
      borderRadius: '8px',
      background: 'var(--surface)',
      color: 'var(--text)',
    },
    '.cm-completionDetail': { color: 'var(--muted)', fontStyle: 'normal' },
    '.cm-tooltip-autocomplete ul li[aria-selected]': {
      background: 'var(--accent-soft)',
      color: 'var(--text)',
    },
  },
  { dark: true },
);

export default function CodeEditor({ code, onCodeChange, onRun }) {
  const hostRef = useRef(null);
  const viewRef = useRef(null);
  const callbacks = useRef({ onCodeChange, onRun });

  useEffect(() => {
    callbacks.current = { onCodeChange, onRun };
  });

  useEffect(() => {
    const view = new EditorView({
      parent: hostRef.current,
      state: EditorState.create({
        doc: code,
        extensions: [
          lineNumbers(),
          history(),
          drawSelection(),
          highlightActiveLine(),
          indentOnInput(),
          bracketMatching(),
          closeBrackets(),
          // Två mellanslag per nivå, som de flesta skriver HTML och CSS.
          // html() stänger taggar av sig själv och föreslår taggar och
          // attribut, och CSS inne i <style>.
          indentUnit.of('  '),
          EditorState.tabSize.of(2),
          html(),
          autocompletion(),
          syntaxHighlighting(highlightStyle),
          editorTheme,
          EditorView.contentAttributes.of({ 'aria-labelledby': 'code-label' }),
          keymap.of([
            {
              key: 'Mod-Enter',
              run: () => {
                callbacks.current.onRun?.();
                return true;
              },
              preventDefault: true,
            },
            ...closeBracketsKeymap,
            ...completionKeymap,
            ...historyKeymap,
            ...defaultKeymap,
            indentWithTab,
          ]),
          EditorView.updateListener.of(update => {
            if (update.docChanged) {
              callbacks.current.onCodeChange(update.state.doc.toString());
            }
          }),
        ],
      }),
    });
    viewRef.current = view;
    return () => view.destroy();
    // Editorn skapas en gång; ny kod utifrån hanteras i effekten nedan.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // När koden ändras utifrån (ny övning, återställ) byts innehållet ut.
  useEffect(() => {
    const view = viewRef.current;
    if (view && code !== view.state.doc.toString()) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: code },
      });
    }
  }, [code]);

  return (
    <>
      <label id="code-label" onClick={() => viewRef.current?.focus()}>
        Din kod
      </label>
      <div ref={hostRef} />
      <p className="editor-tips muted">
        <kbd>{RUN_KEYS}</kbd> kollar lösningen · <kbd>Tab</kbd> drar in två
        mellanslag · <kbd>{COMMENT_KEYS}</kbd> kommenterar bort en rad · skriv{' '}
        <code>&lt;</code> så föreslås taggar
      </p>
    </>
  );
}
