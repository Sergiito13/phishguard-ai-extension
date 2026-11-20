import { Play, ShieldLoading } from 'iconoir-react';

interface ScanButtonProps {
  onScan?: () => void;
  disabled?: boolean;
  isScanning?: boolean;
}

export function ScanButton({ onScan, disabled = false, isScanning = false }: ScanButtonProps) {
  const isDisabled = disabled || isScanning || !onScan;

  return (
    <button
      type="button"
      className="scan-button"
      onClick={onScan}
      disabled={isDisabled}
      aria-busy={isScanning}
      title={!onScan ? 'Disponible cuando conectemos el motor de análisis' : undefined}
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

      <span>{isScanning ? 'Analizando...' : 'Analizar URL'}</span>
    </button>
  );
}
