import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PopupHeader } from './components/PopupHeader';
import { CurrentWebsite } from './components/CurrentWebsite';
import { ScanStatus } from './components/ScanStatus';
import { ScanButton } from './components/ScanButton';
import { AnalysisResult } from './components/AnalysisResult';
import { AnalysisDetails } from './components/AnalysisDetails';
import { SettingsPage } from './components/SettingsPage';

import { useActiveTab } from './hooks/useActiveTab';
import { useUrlAnalysis } from './hooks/useUrlAnalysis';
import type { ScanStatusType } from './components/ScanStatus';

import './App.css';
import './AnalysisResult.css';

type ResultView = 'summary' | 'details';
type PopupView = 'analysis' | 'settings';

function App() {
  const { t } = useTranslation();
  const website = useActiveTab();
  const { state: analysis, analyze } = useUrlAnalysis();

  const [resultView, setResultView] = useState<ResultView>('summary');
  const [popupView, setPopupView] = useState<PopupView>('analysis');

  const isWebsiteAvailable = website.status === 'ready';
  const isScanning = analysis.status === 'scanning';
  const result =
    website.status === 'ready' && analysis.status === 'success' ? analysis.result : null;
  const hasResult = result !== null;
  const isDetailsView = hasResult && resultView === 'details';
  const isSettingsView = popupView === 'settings';

  let scanStatus: ScanStatusType = 'idle';
  if (website.status === 'loading') scanStatus = 'loading';
  else if (website.status === 'unavailable') scanStatus = 'unavailable';
  else if (analysis.status === 'scanning') scanStatus = 'scanning';
  else if (analysis.status === 'error') scanStatus = 'error';

  let statusDescription: string | undefined;
  if (website.status === 'unavailable' && website.reason !== 'unsupported') {
    statusDescription = t('website.noAccessDescription');
  } else if (analysis.status === 'error') {
    statusDescription = analysis.interpolation
      ? t(analysis.translationKey, analysis.interpolation)
      : t(analysis.translationKey);
  }

  const disabledReason =
    website.status === 'loading'
      ? t('website.loadingReason')
      : website.status === 'unavailable'
        ? t('website.unavailableReason')
        : undefined;

  function handleScan() {
    if (website.status !== 'ready' || isScanning) return;
    setResultView('summary');
    void analyze(website.url);
  }

  function toggleSettings() {
    setPopupView((current) => (current === 'settings' ? 'analysis' : 'settings'));
  }

  const popupClassName = isSettingsView
    ? 'popup popup--settings'
    : isDetailsView
      ? 'popup popup--details'
      : hasResult
        ? 'popup popup--result'
        : 'popup';

  return (
    <div className={popupClassName}>
      <PopupHeader isSettingsOpen={isSettingsView} onSettingsClick={toggleSettings} />

      <main className="popup-content">
        {isSettingsView ? (
          <SettingsPage onBack={() => setPopupView('analysis')} />
        ) : (
          <section className="popup-section">
            {result && website.status === 'ready' ? (
              isDetailsView ? (
                <AnalysisDetails result={result} onBack={() => setResultView('summary')} />
              ) : (
                <AnalysisResult
                  result={result}
                  hostname={website.hostname}
                  onShowDetails={() => setResultView('details')}
                />
              )
            ) : (
              <>
                <h2 className="popup-section__title">{t('website.title')}</h2>
                <CurrentWebsite website={website} />
                <ScanStatus status={scanStatus} description={statusDescription} />
              </>
            )}

            {!isDetailsView && (
              <ScanButton
                onScan={handleScan}
                disabled={!isWebsiteAvailable}
                disabledReason={disabledReason}
                isScanning={isScanning}
                hasResult={hasResult}
              />
            )}
          </section>
        )}
      </main>

      <footer className="popup-footer">
        <span>{t('footer.poweredBy')}</span>
        <span>v0.1.0</span>
      </footer>
    </div>
  );
}

export default App;
