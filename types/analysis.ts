// ==========================================
// PHISHGUARD AI — ANALYSIS TYPES
// ==========================================

// Model predictions
export type AnalysisPrediction = 'potential_phishing' | 'not_flagged';

// Request sent to FastAPI
export interface AnalysisRequest {
  url: string;
}

// Response returned by FastAPI
export interface AnalysisResponse {
  url: string;
  prediction: AnalysisPrediction;
  phishing_score: number;
  threshold: number;
  calibrated: boolean;
  model_version: string;
  features_analyzed: number;
}
