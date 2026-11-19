import { PopupHeader } from './components/PopupHeader';

import './App.css';

function App() {
  return (
    <div className="popup">
      <PopupHeader />

      <main className="popup-content">
        <section className="popup-section">
          <h2 className="popup-section__title">Sitio web actual</h2>

          <div className="popup-placeholder">
            <p className="popup-placeholder__title">Tu navegación, más protegida.</p>

            <p className="popup-placeholder__description">
              Aquí podrás analizar la URL de la pestaña actual y comprobar si presenta señales de
              phishing.
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
