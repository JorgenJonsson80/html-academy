import { errorTitle, explainError } from '../runner/friendlyErrors';
import CodeText from './CodeText';

// Det tekniska felmeddelandet, och under det en förklaring på svenska.
export default function ErrorBox({ error }) {
  return (
    <div className="error-box">
      <p className="error-title">
        <span aria-hidden="true">🧩</span> {errorTitle(error, error.isSyntax)}
      </p>
      <p className="error-explain">
        <CodeText text={explainError(error)} />
      </p>
      <pre className="error-raw">{error.message}</pre>
    </div>
  );
}
