import {
  ShieldQuestion,
  ShieldLoading,
  ShieldCheck,
  WarningTriangle,
  InfoCircle,
} from 'iconoir-react';
import { useTranslation } from 'react-i18next';

export type ScanStatusType =
  'loading' | 'idle' | 'scanning' | 'safe' | 'suspicious' | 'error' | 'unavailable';

interface ScanStatusProps {
  status: ScanStatusType;
  description?: string;
}

const statusIcons = {
  loading: InfoCircle,
  idle: ShieldQuestion,
  scanning: ShieldLoading,
  safe: ShieldCheck,
  suspicious: WarningTriangle,
  error: InfoCircle,
  unavailable: InfoCircle,
};

export function ScanStatus({ status, description }: ScanStatusProps) {
  const { t } = useTranslation();
  const Icon = statusIcons[status];

  return (
    <section className={`scan-status scan-status--${status}`} role="status" aria-live="polite">
      <div className="scan-status__icon">
        <Icon width={38} height={38} strokeWidth={1.5} />
      </div>
      <div className="scan-status__badge">
        <span className="scan-status__indicator" />
        <span className="scan-status__title">{t(`status.${status}.title`)}</span>
      </div>
      <p className="scan-status__description">{description ?? t(`status.${status}.description`)}</p>
    </section>
  );
}
