export type Language = 'en' | 'ur';

export type AppStep =
  | 'home'
  | 'personal'
  | 'nadra_loading'
  | 'loan_details'
  | 'eligibility_loading'
  | 'payment'
  | 'onelink_loading'
  | 'otp'
  | 'pin'
  | 'result';

export interface PersonalInfo {
  fullName: string;
  cnic: string;
  mobile: string;
  gender: string;
  dob: string;
  province: string;
  address: string;
}

export interface LoanDetails {
  amount: number;
  purpose: string;
  occupation: string;
  bankName: string;
  accountNumber: string;
  currentBalance: number;
  monthlyIncome: number;
  salaryDate: string;
}

export interface PaymentDetails {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface LoanApplication {
  id: string;
  date: string;
  personal: PersonalInfo;
  loan: LoanDetails;
  payment: PaymentDetails;
  status: 'Approved' | 'Rejected' | 'Pending';
  statusReason?: string;
  otpStep: number;
}
