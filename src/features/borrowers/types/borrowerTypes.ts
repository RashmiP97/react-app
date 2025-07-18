export interface Borrower {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    loan_type?: string;
    loan_amount?: number;
    status?: string;
    employment?: string;
    income?: number;
    existing_loan?: number;
    credit_score?: number;
    source_of_funds?: string;
    risk_signal?: string;
    ai_flags?: string[];
  }
  
  export interface BorrowerPipeline {
    new: Borrower[];
    in_review: Borrower[];
    approved: Borrower[];
  }
  

  export interface OnboardingWorkflow {
    steps: string[];
  }