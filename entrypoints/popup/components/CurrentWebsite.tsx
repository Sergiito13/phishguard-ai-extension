import { useEffect, useState } from 'react';
import { Globe } from 'iconoir-react';
import { browser } from 'wxt/browser';

type WebsiteState =
  | { status: 'loading' }
  | { status: 'ready'; hostname: string }
  | { status: 'unavailable'; message: string };

export function CurrentWebsite() {
  const [website, setWebsite] = useState<WebsiteState>({
    status: 'loading',
  });

  useEffect(() => {
    let cancelled = false;

    async function loadCurrentWebsite() {
      try {
        const [tab] = await browser.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (!tab?.url) {
          if (!cancelled) {
            setWebsite({
              status: 'unavailable',
              message: 'No se pudo obtener la URL',
            });
          }

          return;
        }

        const url = new URL(tab.url);

        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
          if (!cancelled) {
            setWebsite({
              status: 'unavailable',
              message: 'Página no compatible',
            });
          }

          return;
        }

        if (!cancelled) {
          setWebsite({
            status: 'ready',
            hostname: url.hostname,
          });
        }
      } catch {
        if (!cancelled) {
          setWebsite({
            status: 'unavailable',
            message: 'No se pudo leer la página',
          });
        }
      }
    }

    void loadCurrentWebsite();

    return () => {
      cancelled = true;
    };
  }, []);

  const hostname =
    website.status === 'ready'
      ? website.hostname
      : website.status === 'loading'
        ? 'Cargando sitio web...'
        : website.message;

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
