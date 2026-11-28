import { InfoCircle } from 'iconoir-react';
import { useTranslation } from 'react-i18next';

import type { AnalysisResponse } from '../../../types/analysis';

interface AnalysisDetailsProps {
  result: AnalysisResponse;
  onBack: () => void;
}

export function AnalysisDetails({ result, onBack }: AnalysisDetailsProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage === 'es' ? 'es-ES' : 'en-GB';

  function formatScore(value: number): string {
    return value.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });
  }

  return (
    <section className="analysis-details" aria-labelledby="analysis-details-title">
      <button type="button" className="analysis-details__back" onClick={onBack}>
        <span aria-hidden="true">←</span>
        <span>{t('details.back')}</span>
      </button>

      <div className="analysis-details__header">
        <h2 id="analysis-details-title">{t('details.title')}</h2>
        <p>{t('details.subtitle')}</p>
      </div>

      <dl className="analysis-details__list">
        <div className="analysis-details__row">
          <dt>{t('details.evaluatedUrl')}</dt>
          <dd className="analysis-details__url">{result.url}</dd>
        </div>
        <div className="analysis-details__row">
          <dt>{t('details.classification')}</dt>
          <dd>
            {t(
              result.prediction === 'potential_phishing'
                ? 'result.phishingTitle'
                : 'result.safeTitle',
            )}
          </dd>
        </div>
        <div className="analysis-details__row">
          <dt>{t('details.score')}</dt>
          <dd>{formatScore(result.phishing_score)}</dd>
        </div>
        <div className="analysis-details__row">
          <dt>{t('details.threshold')}</dt>
          <dd>{formatScore(result.threshold)}</dd>
        </div>
        <div className="analysis-details__row">
          <dt>{t('details.features')}</dt>
          <dd>{result.features_analyzed}</dd>
        </div>
        <div className="analysis-details__row">
          <dt>{t('details.model')}</dt>
          <dd>{result.model_version}</dd>
        </div>
        <div className="analysis-details__row">
          <dt>{t('details.calibration')}</dt>
          <dd>{t(result.calibrated ? 'result.calibrated' : 'result.notCalibrated')}</dd>
        </div>
      </dl>

      <div className="analysis-details__notice">
        <InfoCircle width={18} height={18} strokeWidth={1.8} />
        <div>
          <h3>{t('details.noticeTitle')}</h3>
          <p>{t('details.noticeText')}</p>
          <p>{t('details.privacyText')}</p>
        </div>
      </div>
    </section>
  );
}
