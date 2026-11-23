// ==========================================
// PHISHGUARD AI — ANALYSIS API
// ==========================================

import type { AnalysisRequest, AnalysisResponse } from '../../types/analysis';

// Local FastAPI server
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

/**
 * Analyze a URL using the PhishGuard AI backend.
 *
 * The backend extracts URL features and performs
 * a prediction using the experimental ML model.
 *
 * @param url URL to analyze
 * @param signal Optional AbortSignal
 * @returns Analysis response from FastAPI
 */
export async function analyzeUrl(url: string, signal?: AbortSignal): Promise<AnalysisResponse> {
  // Validate the URL
  const parsedUrl = new URL(url);

  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    throw new Error('Solo se pueden analizar direcciones HTTP y HTTPS.');
  }

  // Build request
  const request: AnalysisRequest = {
    url,
  };

  // Send request to FastAPI
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(request),

    signal,
  });

  // Handle HTTP errors
  if (!response.ok) {
    if (response.status === 422) {
      throw new Error('La URL proporcionada no es válida.');
    }

    if (response.status === 503) {
      throw new Error('El modelo de análisis no está disponible.');
    }

    throw new Error(`No se pudo completar el análisis. HTTP ${response.status}`);
  }

  // Parse response
  const result: AnalysisResponse = await response.json();

  return result;
}
