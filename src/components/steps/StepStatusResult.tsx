import React, { useState } from 'react';
import { Language, LoanApplication } from '../../types';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Download, ShieldCheck } from 'lucide-react';

interface StepStatusResultProps {
  language: Language;
  application: LoanApplication;
  onRestart: () => void;
}

export const StepStatusResult: React.FC<StepStatusResultProps> = ({
  language,
  application,
  onRestart,
}) => {
  // Let's allow toggling or default to Approved (or Rejected if specified in screenshot)
  const [status, setStatus] = useState<'Approved' | 'Rejected'>(application.status === 'Rejected' ? 'Rejected' : 'Approved');

  const formatPKR = (val: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(val).replace('PKR', 'Rs.');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 animate-in fade-in duration-300 space-y-6">
      <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-6 md:p-8 space-y-6 text-center">
        {/* Top Header */}
        <div className="flex justify-between items-center text-left">
          <div>
            <div className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
              GOVERNMENT OF PAKISTAN • MINISTRY OF FINANCE
            </div>
            <h2 className="text-xl font-black text-gray-900 mt-0.5">
              {status === 'Approved' ? 'Application Approved' : 'Application Rejected'}
            </h2>
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {status === 'Approved' ? 'منظور شدہ' : 'مسترد کر دی گئی'}
          </span>
        </div>

        {/* Status Icon */}
        <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-inner ${
          status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'
        }`}>
          {status === 'Approved' ? (
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          ) : (
            <XCircle className="w-10 h-10 text-rose-600" />
          )}
        </div>

        <div className="space-y-2">
          <div className="inline-block">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
              status === 'Approved'
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                : 'bg-rose-100 text-rose-900 border-rose-300'
            }`}>
              {status === 'Approved' ? 'APPLICATION APPROVED / منظور کر دی گئی' : 'APPLICATION REJECTED / مسترد کر دی گئی'}
            </span>
          </div>

          <h3 className="text-2xl font-black text-gray-900">
            {status === 'Approved' ? 'Loan Application Approved Successfully!' : 'Loan Application Rejected!'}
          </h3>
          <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
            {status === 'Approved'
              ? 'آپ کی قرض کی درخواست منظور کر لی گئی ہے۔ فنڈز آپ کے منتخب کردہ بینک اکاؤنٹ میں جلد منتقل کر دیے جائیں گے۔'
              : 'آپ کی قرض کی درخواست مسترد کر دی گئی ہے۔ براہ کرم درست تفصیلات درج کریں۔ Please enter correct details and try again.'}
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-left space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-gray-200 text-xs">
            <span className="text-gray-500 font-medium">APPLICATION ID</span>
            <span className="font-mono font-bold text-gray-900">{application.id}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-500 block mb-0.5">Applicant Name</span>
              <span className="font-bold text-gray-900">{application.personal.fullName || 'Mr Nasir'}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">CNIC Number</span>
              <span className="font-mono font-bold text-gray-900">{application.personal.cnic || '67777-7677666-7'}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">Requested Loan Amount</span>
              <span className="font-bold text-emerald-800 text-sm">{formatPKR(application.loan.amount || 83737)}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">Selected Bank</span>
              <span className="font-bold text-gray-900 truncate block">{application.loan.bankName || 'Raast Instant Transfer'}</span>
            </div>
          </div>
        </div>

        {/* Toggle Status Demo Button */}
        <div className="flex justify-center gap-2 pt-1">
          <button
            onClick={() => setStatus('Approved')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              status === 'Approved' ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Simulate Approved
          </button>
          <button
            onClick={() => setStatus('Rejected')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              status === 'Rejected' ? 'bg-rose-800 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Simulate Rejected
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={onRestart}
            className="w-full bg-[#092217] hover:bg-[#0D3825] text-white font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{language === 'en' ? 'Please Try Again / دوبارہ کوشش کریں' : 'دوبارہ کوشش کریں'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
