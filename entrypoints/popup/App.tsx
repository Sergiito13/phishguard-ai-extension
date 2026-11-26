import { useState } from 'react';

import { PopupHeader } from './components/PopupHeader';
import { CurrentWebsite } from './components/CurrentWebsite';
import { ScanStatus } from './components/ScanStatus';
import { ScanButton } from './components/ScanButton';
import { AnalysisResult } from './components/AnalysisResult';
import { AnalysisDetails } from './components/AnalysisDetails';

import { useActiveTab } from './hooks/useActiveTab';
import { useUrlAnalysis } from './hooks/useUrlAnalysis';

import type { ScanStatusType } from './components/ScanStatus';

import './App.css';
import './AnalysisResult.css';

type ResultView = 'summary' | 'details';

function App() {
  // ==========================================
  // HOOKS
  // ==========================================

  const website = useActiveTab();

  const { state: analysis, analyze } = useUrlAnalysis();

  const [resultView, setResultView] = useState<ResultView>('summary');

  // ==========================================
  // WEBSITE STATE
  // ==========================================

  const isWebsiteAvailable = website.status === 'ready';

  const isScanning = analysis.status === 'scanning';

  const result =
    website.status === 'ready' && analysis.status === 'success' ? analysis.result : null;

  const hasResult = result !== null;

  const isDetailsView = hasResult && resultView === 'details';

  // ==========================================
  // SCAN STATUS
  // ==========================================

  let scanStatus: ScanStatusType = 'idle';

  if (website.status === 'loading') {
    scanStatus = 'loading';
  } else if (website.status === 'unavailable') {
    scanStatus = 'unavailable';
  } else if (analysis.status === 'scanning') {
    scanStatus = 'scanning';
  } else if (analysis.status === 'error') {
    scanStatus = 'error';
  }

  // ==========================================
  // STATUS DESCRIPTION
  // ==========================================

  let statusDescription: string | undefined;

  if (website.status === 'unavailable') {
    if (website.reason !== 'unsupported') {
      statusDescription =
        'No hemos podido obtener la URL de esta pestaña. Comprueba que el navegador permite acceder a ella.';
    }
  } else if (analysis.status === 'error') {
    statusDescription = analysis.message;
  }

  // ==========================================
  // DISABLED REASON
  // ==========================================

  const disabledReason =
    website.status === 'loading'
      ? 'Comprobando la pestaña activa'
      : website.status === 'unavailable'
        ? 'Esta página no se puede analizar'
        : undefined;

  // ==========================================
  // SCAN HANDLER
  // ==========================================

  function handleScan() {
    if (website.status !== 'ready' || isScanning) {
      return;
    }

    setResultView('summary');

    void analyze(website.url);
  }

  // ==========================================
  // RESULT NAVIGATION
  // ==========================================

  function handleShowDetails() {
    setResultView('details');
  }

  function handleBackToResult() {
    setResultView('summary');
  }

  // ==========================================
  // POPUP CLASS
  // ==========================================

  const popupClassName = isDetailsView
    ? 'popup popup--details'
    : hasResult
      ? 'popup popup--result'
      : 'popup';

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className={popupClassName}>
      <PopupHeader />

      <main className="popup-content">
        <section className="popup-section">
          {result && website.status === 'ready' ? (
            isDetailsView ? (
              <AnalysisDetails result={result} onBack={handleBackToResult} />
            ) : (
              <AnalysisResult
                result={result}
                hostname={website.hostname}
                onShowDetails={handleShowDetails}
              />
            )
          ) : (
            <>
              <h2 className="popup-section__title">Sitio web actual</h2>

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
      </main>

      <footer className="popup-footer">
        <span>Powered by PhishGuard AI</span>
        <span>v0.1.0</span>
      </footer>
    </div>
  );
}

export default App;
