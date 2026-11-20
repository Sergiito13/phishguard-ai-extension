import { PopupHeader } from './components/PopupHeader';
import { CurrentWebsite } from './components/CurrentWebsite';
import { ScanStatus } from './components/ScanStatus';
import { ScanButton } from './components/ScanButton';

import './App.css';

function App() {
  return (
    <div className="popup">
      <PopupHeader />

      <main className="popup-content">
        <section className="popup-section">
          <h2 className="popup-section__title">Sitio web actual</h2>

          <CurrentWebsite />

          <ScanStatus status="idle" />

          <ScanButton />
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
