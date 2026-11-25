import { PopupHeader } from './components/PopupHeader';
import { CurrentWebsite } from './components/CurrentWebsite';
import { ScanStatus } from './components/ScanStatus';
import { ScanButton } from './components/ScanButton';
import { AnalysisResult } from './components/AnalysisResult';

import { useActiveTab } from './hooks/useActiveTab';
import { useUrlAnalysis } from './hooks/useUrlAnalysis';

import type { ScanStatusType } from './components/ScanStatus';

import './App.css';

function App() {
  // ==========================================
  // HOOKS
  // ==========================================

  const website = useActiveTab();

  const { state: analysis, analyze } = useUrlAnalysis();

  // ==========================================
  // WEBSITE STATE
  // ==========================================

  const isWebsiteAvailable = website.status === 'ready';

  const isScanning = analysis.status === 'scanning';

  const hasResult = website.status === 'ready' && analysis.status === 'success';

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
    if (website.status !== 'ready') {
      return;
    }

    void analyze(website.url);
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="popup">
      <PopupHeader />

      <main className="popup-content">
        <section className="popup-section">
          <h2 className="popup-section__title">Sitio web actual</h2>

          <CurrentWebsite website={website} />

          {website.status === 'ready' && analysis.status === 'success' ? (
            <AnalysisResult result={analysis.result} />
          ) : (
            <ScanStatus status={scanStatus} description={statusDescription} />
          )}

          <ScanButton
            onScan={handleScan}
            disabled={!isWebsiteAvailable}
            disabledReason={disabledReason}
            isScanning={isScanning}
            hasResult={hasResult}
          />
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
