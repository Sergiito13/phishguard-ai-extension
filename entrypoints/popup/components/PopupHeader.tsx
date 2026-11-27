import { Settings } from 'iconoir-react';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from './LanguageSwitcher';

export function PopupHeader() {
  const { t } = useTranslation();

  return (
    <header className="popup-header">
      <div className="popup-header__brand">
        <img
          src="/brand/phishguard-logo-dark.svg"
          alt="PhishGuard AI"
          className="popup-header__logo"
        />
        <p className="popup-header__subtitle">{t('header.subtitle')}</p>
      </div>

      <div className="popup-header__actions">
        <LanguageSwitcher />
        <button
          type="button"
          className="popup-header__settings"
          aria-label={t('header.settingsSoon')}
          title={t('header.settingsSoon')}
          disabled
        >
          <Settings width={20} height={20} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
