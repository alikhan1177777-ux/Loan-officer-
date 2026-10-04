import React, { useEffect, useState } from 'react';
import { Language } from '../../types';
import { Clock } from 'lucide-react';

interface StepEligibilityLoadingProps {
  language: Language;
  onComplete: () => void;
}

export const StepEligibilityLoading: React.FC<StepEligibilityLoadingProps> = ({
  language,
  onComplete,
}) => {
  const [progress, setProgress] = useState<number>(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 20;
      });
    }, 250);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="max-w-xl mx-auto px-4 py-12 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-8 text-center space-y-6">
        <div className="text-left">
          <div className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
            GOVERNMENT OF PAKISTAN • MINISTRY OF FINANCE
          </div>
          <h2 className="text-xl font-black text-gray-900 mt-0.5">Searching...</h2>
        </div>

        <div className="w-20 h-20 bg-emerald-50 rounded-full mx-auto flex items-center justify-center text-emerald-700 border border-emerald-200 shadow-inner">
          <Clock className="w-10 h-10 animate-spin text-emerald-700" style={{ animationDuration: '3s' }} />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black text-gray-900">
            {language === 'en' ? 'Searching Bank Account & Loan Eligibility...' : 'بینک اکاؤنٹ اور قرض کی اہلیت کی جانچ...'}
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            {language === 'en'
              ? 'Checking bank account and monthly income threshold for youth loan'
              : 'بینک اکاؤنٹ اور نوجوانوں کے قرض کے لیے ماہانہ آمدنی کی جانچ کی جا رہی ہے'}
          </p>
          <p className="text-xs text-emerald-800 font-medium pt-2">
            بینک اکاؤنٹ اور نوجوانوں کے قرض کے لیے ماہانہ آمدنی کی جانچ کی جا رہی ہے
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#092217] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="text-[11px] text-gray-400 font-medium">
          Government of Pakistan Secure Gateway
        </div>
      </div>
    </div>
  );
};
