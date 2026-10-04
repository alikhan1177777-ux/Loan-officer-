import React from 'react';
import { Language, LoanApplication } from '../types';
import { X, FileText, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

interface MyApplicationsModalProps {
  language: Language;
  applications: LoanApplication[];
  onClose: () => void;
  onSelectApplication: (app: LoanApplication) => void;
}

export const MyApplicationsModal: React.FC<MyApplicationsModalProps> = ({
  language,
  applications,
  onClose,
  onSelectApplication,
}) => {
  const formatPKR = (val: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(val).replace('PKR', 'Rs.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0D3825] text-white p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-800/60 rounded-xl border border-emerald-600/40 text-emerald-300">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {language === 'en' ? 'My Loan Applications' : 'میری درخواستیں'}
              </h3>
              <p className="text-xs text-emerald-200">
                Ministry of Finance • Government of Pakistan
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

        {/* List */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {applications.length === 0 ? (
            <div className="text-center py-10 space-y-3 text-gray-500">
              <ShieldCheck className="w-12 h-12 text-emerald-300 mx-auto" />
              <p className="text-sm">
                {language === 'en'
                  ? 'No loan applications found. Start a new application today!'
                  : 'کوئی درخواست نہیں ملی۔ نئی درخواست شروع کریں!'}
              </p>
            </div>
          ) : (
            applications.map((app) => (
              <div
                key={app.id}
                onClick={() => {
                  onSelectApplication(app);
                  onClose();
                }}
                className="bg-gray-50 hover:bg-emerald-50/50 border border-gray-200 rounded-2xl p-4 transition cursor-pointer space-y-2 group"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-xs text-emerald-900 group-hover:underline">
                    {app.id}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                    {app.status}
                  </span>
                </div>
                <div className="flex justify-between items-end text-xs text-gray-600">
                  <div>
                    <span className="font-semibold text-gray-800 block">
                      {app.personal.fullName || 'Applicant'}
                    </span>
                    <span>{app.date}</span>
                  </div>
                  <span className="font-bold text-emerald-900 text-sm">
                    {formatPKR(app.loan.amount || 100000)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
