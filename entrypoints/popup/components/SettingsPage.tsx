import { InfoCircle, OpenNewWindow, ShieldCheck, WarningTriangle } from 'iconoir-react';
import { useTranslation } from 'react-i18next';
import { browser } from 'wxt/browser';

import { API_BASE_URL } from '../../../lib/api/analysis';
import { useApiHealth } from '../hooks/useApiHealth';
import '../SettingsPage.css';

interface SettingsPageProps {
  onBack: () => void;
}

const API_ORIGIN = new URL(API_BASE_URL).origin;
const REPOSITORY_URL = 'https://github.com/Sergiito13/phishguard-ai-extension';

export function SettingsPage({ onBack }: SettingsPageProps) {
  const { t } = useTranslation();
  const { state, checkConnection } = useApiHealth();
  const extensionVersion = browser.runtime.getManifest().version;

  const isConnected = state.status === 'connected';
  const isChecking = state.status === 'checking';
  const StatusIcon = isConnected ? ShieldCheck : isChecking ? InfoCircle : WarningTriangle;

  return (
    <section className="settings-page" aria-labelledby="settings-page-title">
      <div className="settings-page__top">
        <button
          type="button"
          className="settings-page__back"
          onClick={onBack}
          aria-label={t('settings.back')}
          title={t('settings.back')}
        >
          <span aria-hidden="true">←</span>
        </button>
        <h1 id="settings-page-title">{t('settings.title')}</h1>
      </div>

      <section className="settings-page__section" aria-labelledby="settings-api-title">
        <h2 id="settings-api-title" className="settings-page__section-title">
          {t('settings.api.title')}
        </h2>
        <div className="settings-page__card">
          <div className={`settings-page__health settings-page__health--${state.status}`}>
            <span className="settings-page__health-icon" aria-hidden="true">
              <StatusIcon width={17} height={17} strokeWidth={1.8} />
            </span>
            <div className="settings-page__health-text" role="status" aria-live="polite">
              <strong>{t(`settings.api.${state.status}`)}</strong>
              {isConnected && state.version && (
                <span>{t('settings.api.version', { version: state.version })}</span>
              )}
            </div>
            <button
              type="button"
              className="settings-page__check-button"
              onClick={() => void checkConnection()}
              disabled={isChecking}
              aria-busy={isChecking}
            >
              <span className="settings-page__refresh-icon" aria-hidden="true">
                ↻
              </span>
              {t(isChecking ? 'settings.api.checkingButton' : 'settings.api.checkButton')}
            </button>
          </div>

          <div className="settings-page__endpoint">
            <span>{t('settings.api.address')}</span>
            <code title={API_ORIGIN}>{API_ORIGIN}</code>
          </div>

          <p className="settings-page__helper">{t('settings.api.healthNote')}</p>
        </div>
      </section>

      <section className="settings-page__section" aria-labelledby="settings-privacy-title">
        <h2 id="settings-privacy-title" className="settings-page__section-title">
          {t('settings.privacy.title')}
        </h2>
        <div className="settings-page__card settings-page__privacy">
          <ShieldCheck width={18} height={18} strokeWidth={1.8} aria-hidden="true" />
          <div>
            <strong>{t('settings.privacy.manualTitle')}</strong>
            <p>{t('settings.privacy.description')}</p>
            <p className="settings-page__muted">{t('settings.privacy.disclaimer')}</p>
          </div>
        </div>
      </section>

      <section className="settings-page__section" aria-labelledby="settings-about-title">
        <h2 id="settings-about-title" className="settings-page__section-title">
          {t('settings.about.title')}
        </h2>
        <div className="settings-page__card settings-page__about">
          <div className="settings-page__about-heading">
            <strong>PhishGuard AI Extension</strong>
            <span>v{extensionVersion}</span>
          </div>
          <p>{t('settings.about.description')}</p>
          <a
            href={REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="settings-page__link"
          >
            {t('settings.about.github')}
            <OpenNewWindow width={14} height={14} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </section>
    </section>
  );
}
