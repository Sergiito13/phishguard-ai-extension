import { PopupHeader } from './components/PopupHeader';
import { CurrentWebsite } from './components/CurrentWebsite';
import { ScanStatus } from './components/ScanStatus';
import { ScanButton } from './components/ScanButton';

import { useActiveTab } from './hooks/useActiveTab';

import type { ScanStatusType } from './components/ScanStatus';

import './App.css';

function App() {
  const website = useActiveTab();

  const scanStatus: ScanStatusType =
    website.status === 'loading' ? 'loading' : website.status === 'ready' ? 'idle' : 'unavailable';

  const isWebsiteAvailable = website.status === 'ready';

  const unavailableDescription =
    website.status === 'unavailable' && website.reason !== 'unsupported'
      ? 'No hemos podido obtener la URL de esta pestaña. Comprueba que el navegador permite acceder a ella.'
      : undefined;

  const disabledReason =
    website.status === 'loading'
      ? 'Comprobando la pestaña activa'
      : website.status === 'unavailable'
        ? 'Esta página no se puede analizar'
        : undefined;

  return (
    <div className="popup">
      <PopupHeader />

      <main className="popup-content">
        <section className="popup-section">
          <h2 className="popup-section__title">Sitio web actual</h2>

          <CurrentWebsite website={website} />

          <ScanStatus status={scanStatus} description={unavailableDescription} />

          <ScanButton disabled={!isWebsiteAvailable} disabledReason={disabledReason} />
        </section>
      </main>

      <footer className="popup-footer">
        <span>Powered by PhishGuard AI</span>
        <span>v0.1.0</span>
      </footer>
    </div>
  );
}

export default App;
