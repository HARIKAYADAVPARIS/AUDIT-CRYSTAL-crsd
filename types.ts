export enum ReadinessStatus {
  READY = "Ready",
  PARTIALLY_READY = "Partially Ready",
  NOT_READY = "Not Ready"
}

export interface RoadmapStep {
  phase: string;
  action: string;
  details: string;
  impactOnScore: number;
  financialSavingEstimate: string;
}

export interface Evidence {
  quote: string;
  page?: number;
  context?: string;
}

export interface DisclosureStatus {
  code: string;
  description: string;
  status: 'Present' | 'Missing';
  fixRecommendation?: string;
  evidence?: Evidence;
}

export interface PeerBenchmark {
  name: string;
  score: number;
  insight: string;
}

export interface ScoreBreakdown {
  doubleMateriality: number;
  valueChain: number;
  dataGranularity: number;
  strategyGovernance: number;
  frameworkAlignment: number;
}

export interface ClimateScenario {
  temp: string;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Catastrophic';
  revenueImpactMultiplier: number;
  valuationImpactMultiplier: number;
  keyRiskDriver: string;
}

export interface TaxonomyData {
  aligned: number;
  eligible: number;
  nonEligible: number;
}

export interface FinancialImpact {
  estimatedRevenueAtRisk: string;
  totalRevenue?: number;
  revenueAtRiskPercentage?: number;
  currency?: string;
  compliancePenaltyExposure: string;
  marketValuationRisk: string;
  costOfCapitalImpactBps: number;
  scenarios: any[];
  climateScenarios?: ClimateScenario[];
  taxonomy?: TaxonomyData;
  carbonIntensityMetric?: string;
  scope1And2Tonnage?: number;
}

export interface MaterialityTopic {
  topic: string;
  financialScore: number;
  impactScore: number;
  category: string;
  reasoning: string;
}

export interface EsrsTopic {
  code: string;
  name: string;
  score: number;
  status: string;
}

export interface SubsidiaryData {
  name: string;
  region: string;
  readinessScore: number;
  status: 'Compliant' | 'In Progress' | 'At Risk';
  topGap: string;
}

export interface AuditResult {
  companyName: string;
  readinessScore: ReadinessStatus;
  scoreValue: number;
  sectorPeerAverage: number;
  scoreBreakdown: ScoreBreakdown;
  executiveSummary: string;
  timestamp: string;
  doubleMaterialityMatrix: MaterialityTopic[];
  financialImpact: FinancialImpact;
  mandatoryDisclosures: DisclosureStatus[];
  roadmap: RoadmapStep[];
  detailedFrameworks: any[];
  peerBenchmarks: PeerBenchmark[];
  esrsTopics: EsrsTopic[];
  subsidiaries: SubsidiaryData[];
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  links?: { uri: string; title: string; }[];
}

export interface AnalysisState {
  isLoading: boolean;
  isStreaming: boolean;
  streamText: string;
  error: string | null;
  result: AuditResult | null;
  pdfUrl?: string | null;
}