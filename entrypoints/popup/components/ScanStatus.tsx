import {
  ShieldQuestion,
  ShieldLoading,
  ShieldCheck,
  WarningTriangle,
  InfoCircle,
} from 'iconoir-react';

export type ScanStatusType =
  'loading' | 'idle' | 'scanning' | 'safe' | 'suspicious' | 'error' | 'unavailable';

interface ScanStatusProps {
  status: ScanStatusType;
  description?: string;
}

const statusConfig = {
  loading: {
    icon: InfoCircle,
    title: 'Comprobando página',
    description: 'Estamos obteniendo la información de la pestaña activa.',
  },

  idle: {
    icon: ShieldQuestion,
    title: 'No analizado',
    description: 'Analiza esta URL para comprobar si presenta posibles señales de phishing.',
  },

  scanning: {
    icon: ShieldLoading,
    title: 'Analizando URL',
    description: 'Estamos comprobando las características de esta dirección web.',
  },

  safe: {
    icon: ShieldCheck,
    title: 'Sin indicios detectados',
    description:
      'El análisis experimental no ha detectado señales de phishing. Esto no garantiza que el sitio sea seguro.',
  },

  suspicious: {
    icon: WarningTriangle,
    title: 'Posible phishing',
    description:
      'Se han detectado señales compatibles con phishing. Evita introducir información sensible.',
  },

  error: {
    icon: InfoCircle,
    title: 'Error de análisis',
    description: 'No se ha podido completar el análisis de esta URL. Inténtalo nuevamente.',
  },

  unavailable: {
    icon: InfoCircle,
    title: 'No disponible',
    description:
      'Esta página no puede analizarse. PhishGuard AI solo admite direcciones HTTP y HTTPS.',
  },
};

export function ScanStatus({ status, description }: ScanStatusProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <section className={`scan-status scan-status--${status}`} role="status" aria-live="polite">
      <div className="scan-status__icon">
        <Icon width={38} height={38} strokeWidth={1.5} />
      </div>

      <div className="scan-status__badge">
        <span className="scan-status__indicator" />

        <span className="scan-status__title">{config.title}</span>
      </div>

      <p className="scan-status__description">{description ?? config.description}</p>
    </section>
  );
}
