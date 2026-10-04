import React from 'react';
import { Language } from '../types';
import { ArrowRight, Calculator, ShieldCheck, CheckCircle2, Award, Landmark, Building2 } from 'lucide-react';

interface HeroHomeProps {
  language: Language;
  onApplyClick: () => void;
  onCalculatorClick: () => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({
  language,
  onApplyClick,
  onCalculatorClick,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-300">
      {/* Prime Minister Portrait Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/20 bg-[#071b12] text-white">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05140e] via-[#09281a]/80 to-transparent z-10"></div>

        {/* Decorative background image / placeholder illustration */}
        <div className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-luminosity transform hover:scale-105 transition duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1000&auto=format&fit=crop')` }}></div>

        <div className="relative z-20 p-6 md:p-8 flex flex-col justify-end min-h-[380px] md:min-h-[420px]">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-emerald-800/90 text-emerald-200 border border-emerald-600/40 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              {language === 'en' ? 'GOVERNMENT OF PAKISTAN' : 'حکومت پاکستان'}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-1 drop-shadow-md">
            Muhammad Shehbaz Sharif
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-emerald-300 font-medium text-sm md:text-base">
            <span>{language === 'en' ? 'Prime Minister of Pakistan' : 'وزیر اعظم پاکستان'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-emerald-100/90">وزیر اعظم پاکستان</span>
          </div>

          <div className="mt-6 pt-6 border-t border-emerald-800/60 flex flex-wrap gap-4 items-center justify-between">
            <div>
              <span className="text-xs uppercase text-emerald-300 font-semibold tracking-wider block">
                {language === 'en' ? 'Youth Loan Allocation' : 'یوتھ لون اسکیم'}
              </span>
              <span className="text-2xl md:text-3xl font-black text-white">
                {language === 'en' ? 'Up to 3 Crore' : 'روپے تک 3 کروڑ'}
              </span>
            </div>
            <button
              onClick={onApplyClick}
              className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>{language === 'en' ? 'APPLY →' : 'درخواست دیں →'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chief Minister Punjab Portrait Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-emerald-900/20 bg-[#09281a] text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-[#05140e] via-[#09281a]/80 to-transparent z-10"></div>
        <div className="absolute inset-0 opacity-30 bg-cover bg-center mix-blend-luminosity" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1000&auto=format&fit=crop')` }}></div>

        <div className="relative z-20 p-6 md:p-8 flex flex-col justify-end min-h-[340px]">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-emerald-800/90 text-emerald-200 border border-emerald-600/40 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs backdrop-blur-xs">
              <Award className="w-3.5 h-3.5 text-emerald-300" />
              {language === 'en' ? 'OFFICIAL LEADERSHIP PORTRAIT' : 'سرکاری قیادت کا پورٹریٹ'}
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-1">
            Maryam Nawaz Sharif
          </h2>
          <div className="flex items-center gap-3 text-emerald-300 font-medium text-sm md:text-base">
            <span>{language === 'en' ? 'Chief Minister Punjab' : 'وزیر اعلیٰ پنجاب'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-emerald-100/90">وزیر اعلیٰ پنجاب</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={onApplyClick}
          className="bg-[#0D3825] hover:bg-[#145332] text-white font-bold p-5 rounded-2xl shadow-md flex items-center justify-between group transition cursor-pointer border border-emerald-800/50"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-900/60 rounded-xl text-emerald-300 group-hover:scale-110 transition">
              <Landmark className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="text-lg font-black">
                {language === 'en' ? 'APPLY FOR LOAN' : 'قرض کے لیے درخواست دیں'}
              </div>
              <div className="text-xs text-emerald-300 font-normal">
                {language === 'en' ? 'درخواست دیں (Instant CNIC Verification)' : 'فوری شناختی کارڈ کی تصدیق'}
              </div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition" />
        </button>

        <button
          onClick={onCalculatorClick}
          className="bg-white hover:bg-emerald-50 text-gray-900 font-bold p-5 rounded-2xl shadow-sm flex items-center justify-between group transition cursor-pointer border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 rounded-xl text-emerald-800 group-hover:scale-110 transition">
              <Calculator className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="text-lg font-black text-gray-900">
                {language === 'en' ? 'Calculate Installment' : 'قسط کیلکولیٹر'}
              </div>
              <div className="text-xs text-gray-500 font-normal">
                {language === 'en' ? 'قسط کیلکولیٹر (Check Monthly Plan)' : 'ماہانہ قسط چیک کریں'}
              </div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition" />
        </button>
      </div>

      {/* Government Trust Badges Box */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-900 rounded-2xl mx-auto flex items-center justify-center text-white shadow-md">
          <Building2 className="w-9 h-9 text-emerald-300" />
        </div>
        <div>
          <h3 className="font-black text-gray-900 text-lg">
            {language === 'en' ? 'GOVERNMENT OF PAKISTAN' : 'حکومت پاکستان'}
          </h3>
          <p className="text-xs text-emerald-800 font-medium tracking-wide">
            {language === 'en' ? 'Ministry of Finance • وزارت خزانہ' : 'وزارت خزانہ • Ministry of Finance'}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-full text-xs font-semibold border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>
            {language === 'en'
              ? 'Encrypted NADRA & 1Link Switch Integration'
              : 'نادرا اور ون لنک سوئچ انٹیگریشن کے ساتھ محفوظ'}
          </span>
        </div>
      </div>

      {/* Info Card Box */}
      <div className="bg-[#092217] rounded-3xl p-6 text-white space-y-3 shadow-lg border border-emerald-900/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-900/80 flex items-center justify-center text-emerald-300 font-bold border border-emerald-700/40">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base">
              {language === 'en' ? 'Pakistan Loan Portal' : 'پاکستان لون پورٹل'}
            </h4>
            <p className="text-xs text-emerald-300">MINISTRY OF FINANCE • حکومت پاکستان</p>
          </div>
        </div>
        <p className="text-xs text-emerald-100/90 leading-relaxed pt-2 border-t border-emerald-900/60">
          {language === 'en'
            ? 'Official portal for loan assistance programme. All 42 State Bank of Pakistan scheduled banks & digital wallets supported.'
            : 'قرض امدادی پروگرام کا سرکاری پورٹل۔ اسٹیٹ بینک آف پاکستان کے تمام 42 شیڈولڈ بینک اور ڈیجیٹل والٹس سپورٹڈ ہیں۔'}
        </p>
      </div>
    </div>
  );
};
