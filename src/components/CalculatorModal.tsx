import React, { useState } from 'react';
import { Language } from '../types';
import { X, Calculator, ArrowRight, ShieldCheck, Banknote } from 'lucide-react';

interface CalculatorModalProps {
  language: Language;
  onClose: () => void;
  onStartApplyWithAmount: (amount: number) => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({
  language,
  onClose,
  onStartApplyWithAmount,
}) => {
  const [amount, setAmount] = useState<number>(1000000); // 10 Lakhs default
  const [years, setYears] = useState<number>(3);
  const [purpose, setPurpose] = useState<string>('Small Business Startup');

  // Calculation logic (Government youth loan subsidized markup ~ 4% per annum)
  const annualRate = 0.04;
  const totalMonths = years * 12;
  const monthlyInterestRate = annualRate / 12;
  const monthlyPayment =
    (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
  const totalPayment = isNaN(monthlyPayment) ? amount : monthlyPayment * totalMonths;

  const formatPKR = (val: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(val).replace('PKR', 'Rs.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0D3825] text-white p-5 flex justify-between items-center relative">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-800/60 rounded-xl border border-emerald-600/40 text-emerald-300">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {language === 'en' ? 'Loan Installment Calculator' : 'قسط کیلکولیٹر'}
              </h3>
              <p className="text-xs text-emerald-200">
                {language === 'en'
                  ? 'Government Subsidized Youth Loan Program (4% Markup)'
                  : 'حکومت پاکستان یوتھ لون پروگرام (4% مارک اپ)'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white bg-emerald-900/50 hover:bg-emerald-900 p-2 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Loan Amount Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="font-semibold text-gray-700">
                {language === 'en' ? 'Required Loan Amount' : 'مطلوبہ قرض کی رقم'}
              </label>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                {formatPKR(amount)}
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={30000000}
              step={50000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-[#0D3825] cursor-pointer h-2 bg-gray-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-gray-500 font-medium">
              <span>Rs. 1 Lakh</span>
              <span>Rs. 1.5 Crore</span>
              <span>Rs. 3 Crore</span>
            </div>
          </div>

          {/* Tenure Years */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="font-semibold text-gray-700">
                {language === 'en' ? 'Repayment Tenure' : 'واپسی کی مدت'}
              </label>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                {years} {years === 1 ? (language === 'en' ? 'Year' : 'سال') : (language === 'en' ? 'Years' : 'سال')} ({totalMonths} {language === 'en' ? 'Months' : 'ماہ'})
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 5, 7].map((y) => (
                <button
                  key={y}
                  onClick={() => setYears(y)}
                  className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    years === y
                      ? 'bg-[#0D3825] text-white border-[#0D3825] shadow-xs'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-emerald-50'
                  }`}
                >
                  {y} {language === 'en' ? 'Yr' : 'سال'}
                </button>
              ))}
            </div>
          </div>

          {/* Loan Purpose */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700">
              {language === 'en' ? 'Loan Purpose' : 'قرض کا مقصد'}
            </label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full text-sm bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            >
              <option value="Small Business Startup">Small Business Startup (چھوٹا کاروبار)</option>
              <option value="IT & Freelancing">IT & Freelancing (آئی ٹی اور فری لانسنگ)</option>
              <option value="Agriculture & Tractor">Agriculture & Farming (زرعی قرض)</option>
              <option value="Higher Education">Higher Education (اعلیٰ تعلیم)</option>
              <option value="Electric Vehicle Transport">Electric Vehicle Transport (الیکٹرک وہیکل ٹرانسپورٹ)</option>
            </select>
          </div>

          {/* Summary Card */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-emerald-200/60">
              <span className="text-xs text-gray-600 font-medium">
                {language === 'en' ? 'Estimated Monthly Installment' : 'تخمینہ ماہانہ قسط'}
              </span>
              <span className="text-xl font-black text-emerald-900">
                {formatPKR(Math.round(monthlyPayment))} <span className="text-xs font-normal text-gray-600">/mo</span>
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-600">
              <span>{language === 'en' ? 'Subsidized Markup Rate:' : 'سبسڈی شدہ مارک اپ:'}</span>
              <span className="font-semibold text-emerald-800">4% Fixed p.a.</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-600">
              <span>{language === 'en' ? 'Total Payable Amount:' : 'کل قابل ادائیگی رقم:'}</span>
              <span className="font-semibold text-emerald-900">{formatPKR(Math.round(totalPayment))}</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => {
              onStartApplyWithAmount(amount);
            }}
            className="w-full bg-[#092217] hover:bg-[#0D3825] text-white font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Banknote className="w-5 h-5 text-emerald-400" />
            <span>
              {language === 'en' ? 'Apply With This Amount' : 'اس رقم کے ساتھ درخواست دیں'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
