import { useTranslation } from 'react-i18next';

interface ScoreIndicatorProps {
  score: number;
}

export function ScoreIndicator({ score }: ScoreIndicatorProps) {
  const { t, i18n } = useTranslation();
  const normalizedScore = Math.min(1, Math.max(0, score));
  const progress = normalizedScore * 100;
  const locale = i18n.resolvedLanguage === 'es' ? 'es-ES' : 'en-GB';
  const formattedScore = normalizedScore.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="score-indicator">
      <div
        className="score-indicator__ring"
        style={{
          background: `conic-gradient(var(--result-accent) ${progress}%, rgba(255,255,255,0.08) ${progress}%)`,
        }}
        role="img"
        aria-label={t('score.accessible', { score: formattedScore })}
      >
        <div className="score-indicator__inner">
          <span className="score-indicator__value">{formattedScore}</span>
          <span className="score-indicator__label">
            {t('score.labelFirst')}
            <br />
            {t('score.labelSecond')}
          </span>
        </div>
      </div>
    </div>
  );
}
