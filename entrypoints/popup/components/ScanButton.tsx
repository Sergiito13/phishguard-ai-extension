import { Play, ShieldLoading } from 'iconoir-react';

interface ScanButtonProps {
  onScan?: () => void;
  disabled?: boolean;
  disabledReason?: string;
  isScanning?: boolean;
  hasResult?: boolean;
}

export function ScanButton({
  onScan,
  disabled = false,
  disabledReason,
  isScanning = false,
  hasResult = false,
}: ScanButtonProps) {
  const isDisabled = disabled || isScanning || !onScan;

  const buttonTitle = disabled
    ? (disabledReason ?? 'Esta página no se puede analizar')
    : !onScan
      ? 'Disponible cuando conectemos el motor de análisis'
      : undefined;

  const buttonLabel = isScanning
    ? 'Analizando...'
    : hasResult
      ? 'Analizar de nuevo'
      : 'Analizar URL';

  return (
    <button
      type="button"
      className="scan-button"
      onClick={onScan}
      disabled={isDisabled}
      aria-busy={isScanning}
      title={buttonTitle}
    >
      {isScanning ? (
        <ShieldLoading
          width={20}
          height={20}
          strokeWidth={1.8}
          className="scan-button__loading-icon"
        />
      ) : (
        <Play width={20} height={20} strokeWidth={1.8} />
      )}

      <span>{buttonLabel}</span>
    </button>
  );
}
