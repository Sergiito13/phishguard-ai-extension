import { InfoCircle } from 'iconoir-react';

import type { AnalysisResponse } from '../../../types/analysis';

// ==========================================
// PROPS
// ==========================================

interface AnalysisDetailsProps {
  result: AnalysisResponse;
  onBack: () => void;
}

// ==========================================
// HELPERS
// ==========================================

function formatScore(value: number): string {
  return value.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

// ==========================================
// COMPONENT
// ==========================================

export function AnalysisDetails({ result, onBack }: AnalysisDetailsProps) {
  const classification =
    result.prediction === 'potential_phishing' ? 'Posible phishing' : 'Sin indicios detectados';

  return (
    <section className="analysis-details" aria-labelledby="analysis-details-title">
      {/* BACK */}

      <button type="button" className="analysis-details__back" onClick={onBack}>
        <span aria-hidden="true">←</span>
        <span>Volver al resultado</span>
      </button>

      {/* HEADER */}

      <div className="analysis-details__header">
        <h2 id="analysis-details-title">Detalles del análisis</h2>

        <p>Información técnica del modelo experimental.</p>
      </div>

      {/* DATA */}

      <dl className="analysis-details__list">
        <div className="analysis-details__row">
          <dt>URL evaluada</dt>
          <dd className="analysis-details__url">{result.url}</dd>
        </div>

        <div className="analysis-details__row">
          <dt>Clasificación</dt>
          <dd>{classification}</dd>
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
          <dt>Versión del modelo</dt>
          <dd>{result.model_version}</dd>
        </div>

        <div className="analysis-details__row">
          <dt>Calibración</dt>
          <dd>{result.calibrated ? 'Calibrado' : 'No calibrado'}</dd>
        </div>
      </dl>

      {/* DISCLAIMER */}

      <div className="analysis-details__notice">
        <InfoCircle width={18} height={18} strokeWidth={1.8} />

        <div>
          <h3>Modelo experimental</h3>

          <p>
            La puntuación no garantiza la seguridad del sitio. Si no está calibrada, tampoco
            representa una probabilidad de phishing.
          </p>

          <p>Actualmente solo analizamos el origen de la URL, no el contenido de la página.</p>
        </div>
      </div>
    </section>
  );
}
