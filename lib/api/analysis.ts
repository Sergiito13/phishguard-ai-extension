// ==========================================
// PHISHGUARD AI — ANALYSIS API
// ==========================================

import type { AnalysisRequest, AnalysisResponse } from '../../types/analysis';

// ==========================================
// API CONFIGURATION
// ==========================================

// Local development API
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

// ==========================================
// URL ANALYSIS
// ==========================================

/**
 * Analyze a website using the PhishGuard AI backend.
 *
 * For privacy, only the URL origin is transmitted.
 * Paths, query parameters, fragments and credentials
 * are excluded from the request.
 *
 * @param url URL to analyze
 * @param signal Optional AbortSignal
 * @returns Analysis response from FastAPI
 */
export async function analyzeUrl(url: string, signal?: AbortSignal): Promise<AnalysisResponse> {
  // ==========================================
  // 1. VALIDATE URL
  // ==========================================

  const parsedUrl = new URL(url);

  const isSupportedProtocol = parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';

  if (!isSupportedProtocol) {
    throw new Error('Solo se pueden analizar direcciones HTTP y HTTPS.');
  }

  // ==========================================
  // 2. SANITIZE URL
  // ==========================================

  // Only send the website origin.
  // Exclude paths, query parameters, fragments
  // and credentials to protect sensitive data.

  const sanitizedUrl = `${parsedUrl.origin}/`;

  // ==========================================
  // 3. BUILD REQUEST
  // ==========================================

  const request: AnalysisRequest = {
    url: sanitizedUrl,
  };

  // ==========================================
  // 4. EXECUTE HTTP REQUEST
  // ==========================================

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(request),

      signal,
    });
  } catch (error) {
    // Preserve cancellation errors
    if (signal?.aborted) {
      throw error;
    }

    // Preserve the original error cause
    throw new Error(
      'No se puede conectar con FastAPI. Comprueba que el servidor está funcionando.',
      {
        cause: error,
      },
    );
  }

  // ==========================================
  // 5. HANDLE HTTP ERRORS
  // ==========================================

  if (!response.ok) {
    switch (response.status) {
      case 422:
        throw new Error('La dirección proporcionada no es válida.');

      case 503:
        throw new Error('El modelo de análisis no está disponible.');

      default:
        throw new Error(`No se pudo completar el análisis. Error HTTP ${response.status}.`);
    }
  }

  // ==========================================
  // 6. PARSE API RESPONSE
  // ==========================================

  const result: AnalysisResponse = await response.json();

  // ==========================================
  // 7. VALIDATE PREDICTION
  // ==========================================

  const isValidPrediction =
    result.prediction === 'not_flagged' || result.prediction === 'potential_phishing';

  if (!isValidPrediction) {
    throw new Error('El servidor ha devuelto una predicción no reconocida.');
  }

  // ==========================================
  // 8. RETURN RESULT
  // ==========================================

  return result;
}
