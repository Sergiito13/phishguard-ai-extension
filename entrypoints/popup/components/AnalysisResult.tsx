import { Globe, ShieldCheck, WarningTriangle, InfoCircle } from 'iconoir-react';

import { ScoreIndicator } from './ScoreIndicator';

import type { AnalysisResponse } from '../../../types/analysis';

// ==========================================
// PROPS
// ==========================================

interface AnalysisResultProps {
  result: AnalysisResponse;
  hostname: string;
  onShowDetails: () => void;
}

// ==========================================
// COMPONENT
// ==========================================

export function AnalysisResult({ result, hostname, onShowDetails }: AnalysisResultProps) {
  // ==========================================
  // PREDICTION
  // ==========================================

  const isPhishing = result.prediction === 'potential_phishing';

  const status = isPhishing ? 'potential-phishing' : 'not-flagged';

  const title = isPhishing ? 'Posible phishing' : 'Sin indicios detectados';

  const description = isPhishing
    ? 'El modelo ha identificado patrones compatibles con phishing.'
    : 'El modelo no ha marcado este dominio. Esto no garantiza que sea seguro.';

  // ==========================================
  // SECURITY ADVICE
  // ==========================================

  const recommendation = isPhishing
    ? 'Evita introducir datos personales. Accede al sitio oficial escribiendo su dirección.'
    : 'Navega con precaución y comprueba el dominio antes de introducir información sensible.';

  const StatusIcon = isPhishing ? WarningTriangle : ShieldCheck;

  // ==========================================
  // FORMATTERS
  // ==========================================

  const formattedThreshold = result.threshold.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section
      className={`analysis-result analysis-result--${status}`}
      aria-label="Resultado del análisis"
    >
      {/* WEBSITE */}

      <div className="analysis-result__site">
        <Globe width={17} height={17} strokeWidth={1.8} />

        <span className="analysis-result__site-name" title={hostname}>
          {hostname}
        </span>

        <span className="analysis-result__site-tag">Analizado</span>
      </div>

      {/* RESULT */}

      <div className="analysis-result__banner" role="status" aria-live="polite">
        <div className="analysis-result__status-icon">
          <StatusIcon width={23} height={23} strokeWidth={1.8} />
        </div>

        <div className="analysis-result__banner-content">
          <h2 className="analysis-result__title">{title}</h2>

          <p className="analysis-result__description">{description}</p>

          <span className="analysis-result__classification">Clasificación experimental</span>
        </div>
      </div>

      {/* MODEL OVERVIEW */}

      <div className="analysis-result__overview" aria-label="Resumen del modelo">
        <ScoreIndicator score={result.phishing_score} />

        <dl className="analysis-result__facts">
          <div className="analysis-result__fact">
            <dt>Umbral de decisión</dt>
            <dd>{formattedThreshold}</dd>
          </div>

          <div className="analysis-result__fact">
            <dt>Características</dt>
            <dd>{result.features_analyzed} analizadas</dd>
          </div>

          <div className="analysis-result__fact">
            <dt>Calibración</dt>
            <dd>{result.calibrated ? 'Calibrado' : 'No calibrado'}</dd>
          </div>
        </dl>
      </div>

      {/* RECOMMENDATION */}

      <div className="analysis-result__advice">
        <InfoCircle
          width={18}
          height={18}
          strokeWidth={1.8}
          className="analysis-result__advice-icon"
        />

        <div className="analysis-result__advice-content">
          <h3>Recomendación</h3>

          <p>{recommendation}</p>
        </div>
      </div>

      {/* DETAILS NAVIGATION */}

      <button type="button" className="analysis-result__details-button" onClick={onShowDetails}>
        <span>Ver detalles del análisis</span>

        <span className="analysis-result__details-arrow" aria-hidden="true">
          ›
        </span>
      </button>
    </section>
  );
}
