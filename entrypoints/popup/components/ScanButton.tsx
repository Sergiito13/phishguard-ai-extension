import { Play, ShieldLoading } from 'iconoir-react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const isDisabled = disabled || isScanning || !onScan;
  const buttonTitle = disabled ? (disabledReason ?? t('scan.disabled')) : undefined;
  const buttonLabel = isScanning
    ? t('scan.scanning')
    : hasResult
      ? t('scan.again')
      : t('scan.analyze');

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
