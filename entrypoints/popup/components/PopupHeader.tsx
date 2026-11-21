import { Settings } from 'iconoir-react';

export function PopupHeader() {
  return (
    <header className="popup-header">
      <div className="popup-header__brand">
        <img
          src="/brand/phishguard-logo-dark.svg"
          alt="PhishGuard AI"
          className="popup-header__logo"
        />

        <p className="popup-header__subtitle">Protección inteligente contra el phishing</p>
      </div>

      <button
        type="button"
        className="popup-header__settings"
        aria-label="Configuración (próximamente)"
        title="Configuración próximamente"
        disabled
      >
        <Settings width={20} height={20} strokeWidth={1.8} />
      </button>
    </header>
  );
}
