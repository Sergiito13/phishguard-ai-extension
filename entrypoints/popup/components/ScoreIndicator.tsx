// ==========================================
// PHISHGUARD AI — SCORE INDICATOR
// ==========================================

interface ScoreIndicatorProps {
  score: number;
}

export function ScoreIndicator({ score }: ScoreIndicatorProps) {
  // Ensure the score stays between 0 and 1
  const normalizedScore = Math.min(1, Math.max(0, score));

  // Used only to draw the progress ring
  const progress = normalizedScore * 100;

  // Display the raw model score, not a risk percentage
  const formattedScore = normalizedScore.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="score-indicator">
      <div
        className="score-indicator__ring"
        style={{
          background: `conic-gradient(
            var(--result-accent) ${progress}%,
            rgba(255, 255, 255, 0.08) ${progress}%
          )`,
        }}
        role="img"
        aria-label={`Puntuación experimental ${formattedScore} sobre 1. No es una probabilidad de phishing.`}
      >
        <div className="score-indicator__inner">
          <span className="score-indicator__value">{formattedScore}</span>

          <span className="score-indicator__label">
            Puntuación
            <br />
            experimental
          </span>
        </div>
      </div>
    </div>
  );
}
