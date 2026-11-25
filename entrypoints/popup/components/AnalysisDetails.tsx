// ==========================================
// PHISHGUARD AI — ANALYSIS DETAILS
// ==========================================

import type { AnalysisResponse } from '../../../types/analysis';

interface AnalysisDetailsProps {
  result: AnalysisResponse;
}

function formatScore(value: number): string {
  return value.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

export function AnalysisDetails({ result }: AnalysisDetailsProps) {
  return (
    <details className="analysis-details">
      <summary className="analysis-details__toggle">
        <span>Ver detalles del análisis</span>

        <span className="analysis-details__arrow" aria-hidden="true">
          ⌄
        </span>
      </summary>

      <div className="analysis-details__content">
        <dl className="analysis-details__list">
          <div className="analysis-details__row">
            <dt>URL evaluada</dt>
            <dd className="analysis-details__url">{result.url}</dd>
          </div>

          <div className="analysis-details__row">
            <dt>Puntuación experimental</dt>
            <dd>{formatScore(result.phishing_score)}</dd>
          </div>

          <div className="analysis-details__row">
            <dt>Umbral de decisión</dt>
            <dd>{formatScore(result.threshold)}</dd>
          </div>

          <div className="analysis-details__row">
            <dt>Características analizadas</dt>
            <dd>{result.features_analyzed}</dd>
          </div>

          <div className="analysis-details__row">
            <dt>Modelo</dt>
            <dd>{result.model_version}</dd>
          </div>

          <div className="analysis-details__row">
            <dt>Calibración</dt>
            <dd>{result.calibrated ? 'Calibrado' : 'No calibrado'}</dd>
          </div>
        </dl>

        <p className="analysis-details__notice">
          El análisis es experimental. La puntuación no debe interpretarse como una probabilidad de
          phishing ni como una garantía de seguridad.
        </p>

        <p className="analysis-details__notice">
          Actualmente se analiza únicamente el origen de la URL, no el contenido de la página.
        </p>
      </div>
    </details>
  );
}
