import { useCallback, useEffect, useRef, useState } from 'react';

import { analyzeUrl, AnalysisApiError } from '../../../lib/api/analysis';
import type { AnalysisResponse } from '../../../types/analysis';

export type UrlAnalysisState =
  | { status: 'idle' }
  | { status: 'scanning' }
  | { status: 'success'; result: AnalysisResponse }
  | {
      status: 'error';
      translationKey: string;
      interpolation?: Record<string, string | number>;
    };

export function useUrlAnalysis() {
  const [state, setState] = useState<UrlAnalysisState>({ status: 'idle' });
  const controllerRef = useRef<AbortController | null>(null);

  const analyze = useCallback(async (url: string) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setState({ status: 'scanning' });

    try {
      const result = await analyzeUrl(url, controller.signal);
      if (!controller.signal.aborted) setState({ status: 'success', result });
    } catch (error) {
      if (controller.signal.aborted) return;

      if (error instanceof AnalysisApiError) {
        setState({
          status: 'error',
          translationKey: error.translationKey,
          interpolation: error.interpolation,
        });
      } else {
        console.error('Unexpected URL analysis error', error);
        setState({ status: 'error', translationKey: 'errors.unexpected' });
      }
    } finally {
      if (controllerRef.current === controller) controllerRef.current = null;
    }
  }, []);

  useEffect(() => () => controllerRef.current?.abort(), []);

  return { state, analyze };
}
