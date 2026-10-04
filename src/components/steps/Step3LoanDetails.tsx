import React, { useState } from 'react';
import { Language, LoanDetails } from '../../types';
import { ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface Step3LoanDetailsProps {
  language: Language;
  initialData: LoanDetails;
  onNext: (data: LoanDetails) => void;
  onBack: () => void;
}

export const Step3LoanDetails: React.FC<Step3LoanDetailsProps> = ({
  language,
  initialData,
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState<LoanDetails>(initialData);

  const handleChange = (field: keyof LoanDetails, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isComplete =
    formData.amount >= 100000 &&
    formData.amount <= 300000000 &&
    formData.purpose !== '' &&
    formData.occupation !== '' &&
    formData.bankName !== '' &&
    formData.accountNumber.trim() !== '' &&
    formData.currentBalance >= 0 &&
    formData.monthlyIncome > 0 &&
    formData.salaryDate.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete) {
      onNext(formData);
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
            <span>{language === 'en' ? 'Loan Details' : 'قرض کی تفصیلات'}</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Step 2 of 5
            </span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Loan Amount */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
              <label>Loan Amount Required (PKR) *</label>
              <span className="text-gray-500 font-normal">مطلوبہ قرض کی رقم</span>
            </div>
            <input
              type="number"
              required
              min={100000}
              max={300000000}
              placeholder="e.g. 500000"
              value={formData.amount || ''}
              onChange={(e) => handleChange('amount', Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
            />
            <p className="text-[11px] text-gray-500">
              Range: PKR 1,00,000 (1 Lakh) - 3,00,00,000 (3 Crore)
            </p>
          </div>

          {/* Loan Purpose */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
              <label>Loan Purpose *</label>
              <span className="text-gray-500 font-normal">قرض کا مقصد</span>
            </div>
            <select
              required
              value={formData.purpose}
              onChange={(e) => handleChange('purpose', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            >
              <option value="">Select reason for loan / قرض کا مقصد منتخب کریں</option>
              <option value="Small Business Startup">Small Business Startup (چھوٹا کاروبار)</option>
              <option value="IT & Freelancing">IT & Freelancing (آئی ٹی اور فری لانسنگ)</option>
              <option value="Agriculture">Agriculture & Farming (زرعی قرض)</option>
              <option value="Higher Education">Higher Education (اعلیٰ تعلیم)</option>
              <option value="Electric Vehicle Transport">Electric Vehicle Transport (الیکٹرک وہیکل)</option>
              <option value="House Construction">House Construction (گھر کی تعمیر)</option>
            </select>
          </div>

          {/* Occupation */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
              <label>Occupation *</label>
              <span className="text-gray-500 font-normal">پیشہ</span>
            </div>
            <select
              required
              value={formData.occupation}
              onChange={(e) => handleChange('occupation', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            >
              <option value="">Select occupation / پیشہ منتخب کریں</option>
              <option value="Salaried Employee">Salaried Employee (تنخواہ دار ملازم)</option>
              <option value="Business Owner">Business Owner (کاروباری شخصیت)</option>
              <option value="Freelancer">Freelancer / IT Professional (فری لانسر)</option>
              <option value="Farmer">Farmer / Agriculturist (کسان)</option>
              <option value="Student">Student (طالب علم)</option>
              <option value="Other">Other (دیگر)</option>
            </select>
          </div>

          {/* Bank Name */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
              <label>Bank Name *</label>
              <span className="text-gray-500 font-normal">بینک کا نام</span>
            </div>
            <select
              required
              value={formData.bankName}
              onChange={(e) => handleChange('bankName', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            >
              <option value="">Select your bank or wallet / بینک یا والٹ منتخب کریں</option>
              <option value="HBL (Habib Bank Limited)">HBL (Habib Bank Limited)</option>
              <option value="Meezan Bank">Meezan Bank (Islamic)</option>
              <option value="Bank Alfalah">Bank Alfalah</option>
              <option value="National Bank of Pakistan (NBP)">National Bank of Pakistan (NBP)</option>
              <option value="EasyPaisa / Telenor Microfinance">EasyPaisa (Telenor Microfinance)</option>
              <option value="JazzCash / Mobilink Microfinance">JazzCash (Mobilink Microfinance)</option>
              <option value="Raast Instant Transfer">Raast Instant Transfer (State Bank of Pakistan)</option>
            </select>
          </div>

          {/* Account Number */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
              <label>Account Number *</label>
              <span className="text-gray-500 font-normal">اکاؤنٹ نمبر</span>
            </div>
            <input
              type="text"
              required
              placeholder="01234567890123"
              value={formData.accountNumber}
              onChange={(e) => handleChange('accountNumber', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
            />
          </div>

          {/* Balance & Income */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                <label>Current Bank Balance (PKR) *</label>
                <span className="text-gray-500 font-normal">موجودہ بیلنس</span>
              </div>
              <input
                type="number"
                required
                min={0}
                placeholder="e.g. 25000"
                value={formData.currentBalance || ''}
                onChange={(e) => handleChange('currentBalance', Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                <label>Monthly Income (PKR) *</label>
                <span className="text-gray-500 font-normal">ماہانہ آمدنی</span>
              </div>
              <input
                type="number"
                required
                min={1000}
                placeholder="e.g. 75000"
                value={formData.monthlyIncome || ''}
                onChange={(e) => handleChange('monthlyIncome', Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Salary Date */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
              <label>Monthly Income / Salary Credit Date *</label>
              <span className="text-gray-500 font-normal">آمدنی / تنخواہ کی تاریخ</span>
            </div>
            <input
              type="text"
              required
              placeholder="e.g. 21 Sep 2026"
              value={formData.salaryDate}
              onChange={(e) => handleChange('salaryDate', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            />
          </div>

          {/* Status Indicator */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-semibold ${
            isComplete ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            <span>
              {isComplete
                ? 'All loan and bank fields filled successfully'
                : 'All loan and bank fields must be filled to proceed'}
            </span>
            <span className={isComplete ? 'text-emerald-700 font-bold flex items-center gap-1' : 'text-amber-700'}>
              {isComplete ? <><CheckCircle2 className="w-4 h-4" /> Ready</> : 'Pending'}
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
              <span>{language === 'en' ? 'Enter All Loan Details to Continue' : 'آگے بڑھیں'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
