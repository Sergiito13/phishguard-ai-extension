// ==========================================
// PHISHGUARD AI — ANALYSIS RESULT
// ==========================================

import { ShieldCheck, WarningTriangle, InfoCircle } from 'iconoir-react';

import { ScoreIndicator } from './ScoreIndicator';
import { AnalysisDetails } from './AnalysisDetails';

import type { AnalysisResponse } from '../../../types/analysis';

import '../AnalysisResult.css';

interface AnalysisResultProps {
  result: AnalysisResponse;
}

export function AnalysisResult({ result }: AnalysisResultProps) {
  // ==========================================
  // PREDICTION
  // ==========================================

  const isPhishing = result.prediction === 'potential_phishing';

  const status = isPhishing ? 'potential-phishing' : 'not-flagged';

  const title = isPhishing ? 'Posible phishing' : 'Sin indicios detectados';

  const description = isPhishing
    ? 'El modelo ha identificado características compatibles con phishing en este dominio.'
    : 'El modelo no ha marcado este dominio como phishing. Esto no garantiza que la página sea segura.';

  // ==========================================
  // SECURITY RECOMMENDATION
  // ==========================================

  const recommendation = isPhishing
    ? 'Evita introducir contraseñas o información personal. Accede al sitio oficial escribiendo su dirección directamente.'
    : 'Puedes continuar navegando con precaución. Comprueba siempre el dominio antes de introducir información sensible.';

  // ==========================================
  // RESULT ICON
  // ==========================================

  const StatusIcon = isPhishing ? WarningTriangle : ShieldCheck;

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className={`analysis-result analysis-result--${status}`}>
      {/* RESULT BANNER */}

      <section className="analysis-result__banner" role="status" aria-live="polite">
        <div className="analysis-result__status-icon">
          <StatusIcon width={28} height={28} strokeWidth={1.8} />
        </div>

        <div className="analysis-result__banner-content">
          <h3 className="analysis-result__title">{title}</h3>

          <p className="analysis-result__description">{description}</p>

          <span className="analysis-result__classification">Clasificación experimental</span>
        </div>
      </section>

      {/* MODEL SCORE */}

      <section className="analysis-result__overview" aria-label="Información del modelo">
        <ScoreIndicator score={result.phishing_score} />

        <dl className="analysis-result__facts">
          <div className="analysis-result__fact">
            <dt>Umbral de decisión</dt>

            <dd>
              {result.threshold.toLocaleString('es-ES', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </dd>
          </div>

          <div className="analysis-result__fact">
            <dt>Características analizadas</dt>

            <dd>{result.features_analyzed}</dd>
          </div>

          <div className="analysis-result__fact">
            <dt>Modelo</dt>

            <dd>{result.model_version}</dd>
          </div>
        </dl>
      </section>

      {/* SECURITY ADVICE */}

      <section className="analysis-result__advice">
        <div className="analysis-result__advice-icon">
          <InfoCircle width={20} height={20} strokeWidth={1.8} />
        </div>

        <div>
          <h3>Recomendación</h3>

          <p>{recommendation}</p>
        </div>
      </section>

      {/* EXPANDABLE DETAILS */}

      <AnalysisDetails result={result} />
    </div>
  );
}
