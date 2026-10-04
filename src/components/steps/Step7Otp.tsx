import React, { useState, useRef } from 'react';
import { Language } from '../../types';
import { ShieldCheck, ArrowRight, ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';

interface Step7OtpProps {
  language: Language;
  otpStep: number; // 1, 2, or 3
  onNext: () => void;
  onBack: () => void;
}

export const Step7Otp: React.FC<Step7OtpProps> = ({
  language,
  otpStep,
  onNext,
  onBack,
}) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const clean = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = clean;
    setOtp(newOtp);
    setErrorMsg(null);

    if (clean && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setErrorMsg(language === 'en' ? 'Please enter the complete 6-digit code.' : 'براہ کرم مکمل 6 ہندسوں کا کوڈ درج کریں۔');
      return;
    }

    // Simulate incorrect OTP error on first attempt if user entered generic 123456 or similar, or allow success
    if (code === '000000' || code === '111111') {
      setErrorMsg(language === 'en' ? 'Incorrect OTP code. Please enter the correct 6-digit code.' : 'غلط او ٹی پی کوڈ۔ براہ کرم درست کوڈ درج کریں۔');
    } else {
      onNext();
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider mb-1">
              GOVERNMENT OF PAKISTAN • MINISTRY OF FINANCE
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              {language === 'en' ? `OTP Verification - Step ${otpStep}` : `او ٹی پی تصدیق - مرحلہ ${otpStep}`}
            </h2>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Step {otpStep + 3} of 5
          </span>
        </div>

        {/* Code sent notice */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex justify-between items-center">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block">
              {language === 'en' ? 'CODE SENT TO' : 'کوڈ بھیجا گیا'}
            </span>
            <span className="text-sm font-mono font-bold text-gray-800">
              5454 — 55588
            </span>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
            SMS Verified
          </span>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-800 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center space-y-2">
            <label className="text-sm font-bold text-gray-800 block">
              {language === 'en' ? `VERIFY OTP (${otpStep})` : `(${otpStep}) او ٹی پی تصدیق کریں`}
            </label>
            
            {/* 6 OTP boxes */}
            <div className="flex justify-center gap-2 md:gap-3 py-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-14 md:w-12 md:h-16 text-center text-xl md:text-2xl font-black bg-gray-50 border-2 border-gray-300 rounded-2xl focus:border-emerald-700 focus:bg-white focus:outline-none shadow-xs font-mono"
                />
              ))}
            </div>
            <p className="text-[11px] text-gray-500">
              {language === 'en' ? 'Otp enter 6-digits click Continue' : '6 ہندسوں کا او ٹی پی درج کریں'}
            </p>
          </div>

          {/* Timer & Resend */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 flex justify-between items-center text-xs">
            <div className="flex items-center gap-2 text-gray-600">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{language === 'en' ? 'EXPIRES IN / وقت کا خاتمہ:' : 'وقت کا خاتمہ:'}</span>
              <span className="font-mono font-bold text-emerald-900">04:53</span>
            </div>
            <button
              type="button"
              onClick={() => setOtp(['7', '3', '2', '8', '9', '1'])}
              className="text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1 cursor-pointer underline"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Resend (دوبارہ بھیجیں)' : 'دوبارہ بھیجیں'}</span>
            </button>
          </div>

          {/* Security Tip Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-900 text-xs space-y-1">
            <p className="font-bold">
              {language === 'en'
                ? 'Never share your OTP with anyone. Government of Pakistan officials will never ask for your verification code.'
                : 'اپنا او ٹی پی کسی کے ساتھ شیئر نہ کریں۔ حکومت پاکستان کے اہلکار کبھی کوڈ نہیں پوچھیں گے۔'}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition cursor-pointer flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'en' ? 'Back' : 'واپس'}</span>
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 bg-[#092217] hover:bg-[#0D3825] text-white font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>{language === 'en' ? 'Verify & Continue' : 'تصدیق کریں'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
