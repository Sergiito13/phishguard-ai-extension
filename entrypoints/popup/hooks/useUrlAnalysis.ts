// ==========================================
// PHISHGUARD AI — URL ANALYSIS HOOK
// ==========================================

import { useCallback, useEffect, useRef, useState } from 'react';

import { analyzeUrl } from '../../../lib/api/analysis';

import type { AnalysisResponse } from '../../../types/analysis';

// ==========================================
// ANALYSIS STATES
// ==========================================

export type UrlAnalysisState =
  | {
      status: 'idle';
    }
  | {
      status: 'scanning';
    }
  | {
      status: 'success';
      result: AnalysisResponse;
    }
  | {
      status: 'error';
      message: string;
    };

// ==========================================
// HOOK
// ==========================================

export function useUrlAnalysis() {
  const [state, setState] = useState<UrlAnalysisState>({
    status: 'idle',
  });

  const controllerRef = useRef<AbortController | null>(null);

  // ==========================================
  // EXECUTE ANALYSIS
  // ==========================================

  const analyze = useCallback(async (url: string) => {
    // Cancel any previous request
    controllerRef.current?.abort();

    const controller = new AbortController();

    controllerRef.current = controller;

    // Update loading state
    setState({
      status: 'scanning',
    });

    try {
      // Request model prediction
      const result = await analyzeUrl(url, controller.signal);

      // Ignore cancelled requests
      if (controller.signal.aborted) {
        return;
      }

      // Store successful result
      setState({
        status: 'success',
        result,
      });
    } catch (error) {
      // Ignore cancelled requests
      if (controller.signal.aborted) {
        return;
      }

      const message =
        error instanceof Error ? error.message : 'Se ha producido un error inesperado.';

      // Store error
      setState({
        status: 'error',
        message,
      });
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
      }
    }
  }, []);

  // ==========================================
  // CLEANUP
  // ==========================================

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  // ==========================================
  // RETURN HOOK API
  // ==========================================

  return {
    state,
    analyze,
  };
}
