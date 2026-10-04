import React from 'react';
import { Language } from '../types';
import { Globe, User, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onApplyClick: () => void;
  onProfileClick: () => void;
  onHomeClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  onApplyClick,
  onProfileClick,
  onHomeClick,
}) => {
  return (
    <header className="w-full bg-white shadow-xs sticky top-0 z-50">
      {/* Top Ticker Bar */}
      <div className="bg-[#0D3825] text-white text-xs py-1.5 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2 truncate">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium">
            {language === 'en'
              ? 'Government of Pakistan · Ministry of Finance'
              : 'حکومت پاکستان • وزارت خزانہ (Government of Pakistan)'}
          </span>
        </div>
        <button
          onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
          className="flex items-center gap-1 bg-[#145332] hover:bg-[#1b6b3e] text-emerald-100 px-3 py-0.5 rounded-md text-xs font-semibold transition cursor-pointer border border-emerald-600/50"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Urdu / English (اردو / پورٹل)' : 'English / اردو'}</span>
        </button>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onHomeClick}>
          <div className="w-12 h-12 bg-white rounded-xl shadow-xs border border-emerald-100 flex items-center justify-center p-1">
            <div className="w-full h-full bg-[#0D3825] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-inner">
              <ShieldCheck className="w-7 h-7 text-emerald-300" />
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">
              {language === 'en' ? 'MINISTRY OF FINANCE' : 'وزارت خزانہ'}
            </div>
            <h1 className="text-lg md:text-xl font-black text-gray-900 tracking-tight leading-tight">
              {language === 'en' ? 'Pakistan Youth Loan Portal' : 'پاکستان یوتھ لون پورٹل'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={onProfileClick}
            className="p-2 text-gray-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-full transition cursor-pointer border border-gray-200"
            title="My Applications / Profile"
          >
            <User className="w-5 h-5" />
          </button>
          <button
            onClick={onApplyClick}
            className="bg-[#092217] hover:bg-[#0D3825] text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition cursor-pointer border border-emerald-900/20"
          >
            <span>{language === 'en' ? 'APPLY' : 'درخواست دیں'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
