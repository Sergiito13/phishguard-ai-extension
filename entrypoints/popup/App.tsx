import { PopupHeader } from './components/PopupHeader';
import { CurrentWebsite } from './components/CurrentWebsite';

import './App.css';

function App() {
  return (
    <div className="popup">
      <PopupHeader />

      <main className="popup-content">
        <section className="popup-section">
          <h2 className="popup-section__title">Sitio web actual</h2>

          <CurrentWebsite />

          <div className="popup-placeholder">
            <p className="popup-placeholder__title">Pendiente de análisis</p>

            <p className="popup-placeholder__description">
              Esta página todavía no ha sido analizada. Próximamente podrás comprobar si presenta
              señales de phishing.
            </p>
          </div>
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
