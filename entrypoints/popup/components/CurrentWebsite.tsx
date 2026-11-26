import { Globe } from 'iconoir-react';
import { useTranslation } from 'react-i18next';

import type { ActiveTabState } from '../hooks/useActiveTab';

interface CurrentWebsiteProps {
  website: ActiveTabState;
}

export function CurrentWebsite({ website }: CurrentWebsiteProps) {
  const { t } = useTranslation();

  const hostname =
    website.status === 'ready'
      ? website.hostname
      : website.status === 'loading'
        ? t('website.loading')
        : t(`website.${website.reason === 'no-access' ? 'noAccess' : website.reason}`);

  return (
    <div className="current-website">
      <div className="current-website__icon">
        <Globe width={22} height={22} strokeWidth={1.8} />
      </div>
      <div className="current-website__details" aria-live="polite">
        <span
          className="current-website__hostname"
          title={website.status === 'ready' ? hostname : undefined}
        >
          {hostname}
        </span>
      </div>
    </div>
  );
}
