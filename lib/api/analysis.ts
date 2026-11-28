import type { AnalysisRequest, AnalysisResponse } from '../../types/analysis';

export const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

/** A stable error key allows UI messages to be translated after the request fails. */
export class AnalysisApiError extends Error {
  constructor(
    public readonly translationKey: string,
    public readonly interpolation?: Record<string, string | number>,
    options?: ErrorOptions,
  ) {
    super(translationKey, options);
    this.name = 'AnalysisApiError';
  }
}

export async function analyzeUrl(url: string, signal?: AbortSignal): Promise<AnalysisResponse> {
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(url);
  } catch {
    throw new AnalysisApiError('errors.invalidUrl');
  }

  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    throw new AnalysisApiError('errors.unsupportedUrl');
  }

  // Privacy: send only scheme, hostname and port. Never send paths/queries/fragments.
  const request: AnalysisRequest = { url: `${parsedUrl.origin}/` };
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal,
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new AnalysisApiError('errors.connection', undefined, { cause: error });
  }

  if (!response.ok) {
    if (response.status === 422) throw new AnalysisApiError('errors.invalidUrl');
    if (response.status === 503) throw new AnalysisApiError('errors.modelUnavailable');
    throw new AnalysisApiError('errors.http', { status: response.status });
  }

  let result: AnalysisResponse;
  try {
    result = (await response.json()) as AnalysisResponse;
  } catch {
    throw new AnalysisApiError('errors.invalidResponse');
  }

  if (result?.prediction !== 'not_flagged' && result?.prediction !== 'potential_phishing') {
    throw new AnalysisApiError('errors.unknownPrediction');
  }

  if (
    typeof result.phishing_score !== 'number' ||
    !Number.isFinite(result.phishing_score) ||
    result.phishing_score < 0 ||
    result.phishing_score > 1
  ) {
    throw new AnalysisApiError('errors.invalidScore');
  }

  return result;
}
