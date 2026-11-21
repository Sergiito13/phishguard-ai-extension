import { useEffect, useState } from 'react';
import { browser } from 'wxt/browser';

export type ActiveTabState =
  | {
      status: 'loading';
    }
  | {
      status: 'ready';
      hostname: string;
      url: string;
    }
  | {
      status: 'unavailable';
      reason: 'unsupported' | 'no-access' | 'error';
      message: string;
    };

export function useActiveTab(): ActiveTabState {
  const [website, setWebsite] = useState<ActiveTabState>({
    status: 'loading',
  });

  useEffect(() => {
    let cancelled = false;

    async function loadActiveTab() {
      try {
        const [tab] = await browser.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (!tab?.url) {
          if (!cancelled) {
            setWebsite({
              status: 'unavailable',
              reason: 'no-access',
              message: 'URL no disponible',
            });
          }

          return;
        }

        const url = new URL(tab.url);

        const isSupported = url.protocol === 'http:' || url.protocol === 'https:';

        if (!isSupported) {
          if (!cancelled) {
            setWebsite({
              status: 'unavailable',
              reason: 'unsupported',
              message: 'Página no compatible',
            });
          }

          return;
        }

        if (!cancelled) {
          setWebsite({
            status: 'ready',
            hostname: url.hostname,
            url: url.href,
          });
        }
      } catch {
        if (!cancelled) {
          setWebsite({
            status: 'unavailable',
            reason: 'error',
            message: 'No se pudo leer la página',
          });
        }
      }
    }

    void loadActiveTab();

    return () => {
      cancelled = true;
    };
  }, []);

  return website;
}
