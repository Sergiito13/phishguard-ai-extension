import { Globe, ShieldCheck, WarningTriangle, InfoCircle } from 'iconoir-react';
import { useTranslation } from 'react-i18next';

import { ScoreIndicator } from './ScoreIndicator';
import type { AnalysisResponse } from '../../../types/analysis';

interface AnalysisResultProps {
  result: AnalysisResponse;
  hostname: string;
  onShowDetails: () => void;
}

export function AnalysisResult({ result, hostname, onShowDetails }: AnalysisResultProps) {
  const { t, i18n } = useTranslation();
  const isPhishing = result.prediction === 'potential_phishing';
  const status = isPhishing ? 'potential-phishing' : 'not-flagged';
  const StatusIcon = isPhishing ? WarningTriangle : ShieldCheck;
  const locale = i18n.resolvedLanguage === 'es' ? 'es-ES' : 'en-GB';
  const threshold = result.threshold.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <section
      className={`analysis-result analysis-result--${status}`}
      aria-label={t('result.section')}
    >
      <div className="analysis-result__site">
        <Globe width={17} height={17} strokeWidth={1.8} />
        <span className="analysis-result__site-name" title={hostname}>{hostname}</span>
        <span className="analysis-result__site-tag">{t('result.analyzed')}</span>
      </div>

      <div className="analysis-result__banner" role="status" aria-live="polite">
        <div className="analysis-result__status-icon">
          <StatusIcon width={23} height={23} strokeWidth={1.8} />
        </div>
        <div className="analysis-result__banner-content">
          <h2 className="analysis-result__title">
            {t(isPhishing ? 'result.phishingTitle' : 'result.safeTitle')}
          </h2>
          <p className="analysis-result__description">
            {t(isPhishing ? 'result.phishingDescription' : 'result.safeDescription')}
          </p>
          <span className="analysis-result__classification">{t('result.experimental')}</span>
        </div>
      </div>

      <div className="analysis-result__overview" aria-label={t('result.overview')}>
        <ScoreIndicator score={result.phishing_score} />
        <dl className="analysis-result__facts">
          <div className="analysis-result__fact">
            <dt>{t('result.threshold')}</dt>
            <dd>{threshold}</dd>
          </div>
          <div className="analysis-result__fact">
            <dt>{t('result.features')}</dt>
            <dd>{t('result.featuresCount', { count: result.features_analyzed })}</dd>
          </div>
          <div className="analysis-result__fact">
            <dt>{t('result.calibration')}</dt>
            <dd>{t(result.calibrated ? 'result.calibrated' : 'result.notCalibrated')}</dd>
          </div>
        </dl>
      </div>

      <div className="analysis-result__advice">
        <InfoCircle width={18} height={18} strokeWidth={1.8} className="analysis-result__advice-icon" />
        <div className="analysis-result__advice-content">
          <h3>{t('result.recommendation')}</h3>
          <p>{t(isPhishing ? 'result.phishingAdvice' : 'result.safeAdvice')}</p>
        </div>
      </div>

      <button type="button" className="analysis-result__details-button" onClick={onShowDetails}>
        <span>{t('result.detailsLink')}</span>
        <span className="analysis-result__details-arrow" aria-hidden="true">›</span>
      </button>
    </section>
  );
}
