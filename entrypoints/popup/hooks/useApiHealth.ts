import { useCallback, useEffect, useRef, useState } from 'react';

import { API_BASE_URL } from '../../../lib/api/analysis';

const HEALTH_TIMEOUT_MS = 6000;

type ApiHealthResponse = {
  status?: string;
  service?: string;
  version?: string;
};

export type ApiHealthState =
  | { status: 'checking' }
  | { status: 'connected'; version: string | null }
  | { status: 'disconnected' };

export function useApiHealth() {
  const [state, setState] = useState<ApiHealthState>({ status: 'checking' });
  const controllerRef = useRef<AbortController | null>(null);

  const checkConnection = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setState({ status: 'checking' });

    const timeout = setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);

    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        cache: 'no-store',
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const body = (await response.json()) as ApiHealthResponse;
      if (body?.status !== 'healthy') throw new Error('Unhealthy API');

      if (controllerRef.current === controller && !controller.signal.aborted) {
        setState({
          status: 'connected',
          version: typeof body.version === 'string' ? body.version : null,
        });
      }
    } catch {
      if (controllerRef.current === controller) {
        setState({ status: 'disconnected' });
      }
    } finally {
      clearTimeout(timeout);
      if (controllerRef.current === controller) controllerRef.current = null;
    }
  }, []);

  useEffect(() => {
    void checkConnection();

    return () => {
      controllerRef.current?.abort();
      controllerRef.current = null;
    };
  }, [checkConnection]);

  return { state, checkConnection };
}
