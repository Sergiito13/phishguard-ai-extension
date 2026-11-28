import { Settings } from 'iconoir-react';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from './LanguageSwitcher';

interface PopupHeaderProps {
  isSettingsOpen: boolean;
  onSettingsClick: () => void;
}

export function PopupHeader({ isSettingsOpen, onSettingsClick }: PopupHeaderProps) {
  const { t } = useTranslation();
  const settingsLabel = isSettingsOpen ? t('settings.back') : t('header.settings');

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
          aria-label={settingsLabel}
          title={settingsLabel}
          aria-pressed={isSettingsOpen}
          onClick={onSettingsClick}
        >
          <Settings width={20} height={20} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
