import React, { useState } from 'react';
import { Language, PaymentDetails } from '../../types';
import { ShieldCheck, ArrowRight, ArrowLeft, CreditCard, Sparkles, HelpCircle } from 'lucide-react';

interface Step5PaymentProps {
  language: Language;
  applicantName: string;
  initialData: PaymentDetails;
  onNext: (data: PaymentDetails) => void;
  onBack: () => void;
}

export const Step5Payment: React.FC<Step5PaymentProps> = ({
  language,
  applicantName,
  initialData,
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState<PaymentDetails>(initialData);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleChange = (field: keyof PaymentDetails, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isComplete =
    formData.cardNumber.replace(/\s/g, '').length >= 16 &&
    formData.expiry.trim() !== '' &&
    formData.cvv.trim().length >= 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete) {
      onNext(formData);
    }
  };

  const formatCardNum = (num: string) => {
    const clean = num.replace(/\D/g, '').slice(0, 16);
    const parts = clean.match(/.{1,4}/g);
    return parts ? parts.join(' ') : clean;
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 animate-in fade-in duration-300 space-y-6">
      {/* Header notice */}
      <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-6 md:p-8 space-y-6">
        <div>
          <div className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider mb-1">
            GOVERNMENT OF PAKISTAN • MINISTRY OF FINANCE
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center justify-between">
            <span>{language === 'en' ? 'Processing Tax' : 'پروسیسنگ ٹیکس'}</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Step 3 of 5
            </span>
          </h2>
        </div>

        {/* Tax Notification Banner */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-xs text-emerald-900">
              {language === 'en'
                ? 'Pay Rs. 75 processing tax to submit application'
                : 'محفوظ ادائیگی • درخواست جمع کرانے کے لیے 75 روپے ٹیکس ادا کریں۔'}
            </div>
            <p className="text-xs text-emerald-800/80">
              {language === 'en'
                ? 'Yeh fees tasdeeq ke liye hai.'
                : 'یہ فیس تصدیق کے لیے ہے۔'}
            </p>
          </div>
        </div>

        {/* Tip */}
        <div className="bg-emerald-100/60 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            {language === 'en'
              ? 'Tip: Click or focus CVV to flip card and view back side'
              : 'ٹپ: کارڈ کا پچھلا حصہ دیکھنے کے لیے سی وی وی پر کلک کریں'}
          </span>
        </div>

        {/* Interactive Debit Card Preview */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full h-56 rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-transform duration-500 bg-gradient-to-br from-[#072516] via-[#0D3825] to-[#04120b] text-white p-6 flex flex-col justify-between border border-emerald-800/40 select-none group"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Top row */}
          <div className="flex justify-between items-start relative z-10">
            <div className="space-y-0.5">
              <span className="text-[10px] tracking-widest text-emerald-300 font-bold uppercase">
                Premium Debit
              </span>
              <div className="text-[9px] text-emerald-400">Government Verified</div>
            </div>
            <div className="w-12 h-9 bg-gradient-to-tr from-amber-200 to-amber-400 rounded-md shadow-sm flex items-center justify-center">
              <div className="w-8 h-6 border border-amber-600/40 rounded-xs grid grid-cols-2 gap-0.5 p-0.5 opacity-80">
                <div className="bg-amber-700/30 rounded-xs"></div>
                <div className="bg-amber-700/30 rounded-xs"></div>
              </div>
            </div>
          </div>

          {!isFlipped ? (
            /* Front side */
            <div className="space-y-4 relative z-10">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-emerald-300 block">
                  ATM Card Number / اے ٹی ایم کارڈ نمبر
                </span>
                <span className="text-lg md:text-xl font-mono font-bold tracking-widest">
                  {formData.cardNumber
                    ? formatCardNum(formData.cardNumber)
                    : 'XXXX XXXX XXXX XXXX'}
                </span>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-emerald-300 block">
                    Card Holder
                  </span>
                  <span className="text-xs md:text-sm font-bold tracking-wider">
                    {applicantName ? applicantName.toUpperCase() : 'MR NASIR'}
                  </span>
                </div>
                <div className="flex gap-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-emerald-300 block">
                      Valid Thru
                    </span>
                    <span className="text-xs font-mono font-bold">
                      {formData.expiry || 'MM/YY'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-emerald-300 block">
                      CVC / CVV
                    </span>
                    <span className="text-xs font-mono font-bold">
                      {formData.cvv ? '•••' : '•••'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Back side */
            <div className="space-y-3 relative z-10">
              <div className="w-full h-10 bg-black/80 -mx-6 my-1"></div>
              <div className="flex items-center justify-between bg-white/10 p-2 rounded-lg backdrop-blur-xs">
                <span className="text-[10px] text-emerald-200">Authorized Signature</span>
                <span className="bg-white text-gray-900 font-mono font-bold px-3 py-1 rounded text-xs">
                  {formData.cvv || '123'}
                </span>
              </div>
              <p className="text-[9px] text-emerald-300 text-center">
                Government of Pakistan - State Bank of Pakistan Approved Gateway
              </p>
            </div>
          )}
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
              <label>Bank ATM Card Number *</label>
              <span className="text-gray-500 font-normal">بینک اے ٹی ایم کارڈ نمبر</span>
            </div>
            <input
              type="text"
              required
              maxLength={19}
              placeholder="0000 0000 0000 0000"
              value={formData.cardNumber}
              onChange={(e) =>
                handleChange('cardNumber', formatCardNum(e.target.value))
              }
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono tracking-widest"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                <label>Expiry *</label>
                <span className="text-gray-500 font-normal">میعاد</span>
              </div>
              <input
                type="text"
                required
                maxLength={5}
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={(e) => handleChange('expiry', e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                <label>CVV * (Back 3-Digit)</label>
                <span className="text-gray-500 font-normal">سی وی وی</span>
              </div>
              <input
                type="password"
                required
                maxLength={4}
                placeholder="3-Digit"
                value={formData.cvv}
                onFocus={() => setIsFlipped(true)}
                onBlur={() => setIsFlipped(false)}
                onChange={(e) => handleChange('cvv', e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Processing tax amount box */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">
              {language === 'en' ? 'Processing Tax:' : 'پروسیسنگ ٹیکس:'}
            </span>
            <span className="text-lg font-black text-emerald-900">Rs. 75</span>
          </div>

          {/* Status Indicator */}
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-semibold ${
              isComplete
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
          >
            <span>
              {isComplete
                ? 'Card details entered successfully'
                : 'Enter 16-digit Card Number, Expiry & 3-digit CVV'}
            </span>
            <span
              className={
                isComplete ? 'text-emerald-700 font-bold' : 'text-amber-700'
              }
            >
              {isComplete ? 'Ready' : 'Pending'}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition cursor-pointer"
            >
              {language === 'en' ? 'Back' : 'واپس'}
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
              <span>
                {language === 'en' ? 'Authorize Rs. 75 & Proceed' : 'تصدیق کریں'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
