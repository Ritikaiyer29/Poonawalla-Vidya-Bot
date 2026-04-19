export interface OnboardingState {
  transcript: string;
  ageEstimate: number | null;
  riskFlags: string[];
  locationVerified: boolean;
  consentCaptured: boolean;
  loanOffer?: {
    amount: number;
    interestRate: number;
    emi: number;
    tenure: number;
  };
}