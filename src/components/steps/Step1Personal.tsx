import React, { useState } from 'react';
import { Language, PersonalInfo } from '../../types';
import { ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface Step1PersonalProps {
  language: Language;
  initialData: PersonalInfo;
  onNext: (data: PersonalInfo) => void;
  onBack: () => void;
}

export const Step1Personal: React.FC<Step1PersonalProps> = ({
  language,
  initialData,
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState<PersonalInfo>(initialData);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isComplete =
    formData.fullName.trim() !== '' &&
    formData.cnic.trim() !== '' &&
    formData.mobile.trim() !== '' &&
    formData.gender !== '' &&
    formData.dob !== '' &&
    formData.province !== '' &&
    formData.address.trim() !== '';

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
            {language === 'en'
              ? 'GOVERNMENT OF PAKISTAN • MINISTRY OF FINANCE'
              : 'حکومت پاکستان • وزارت خزانہ'}
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center justify-between">
            <span>{language === 'en' ? 'Personal Information' : 'ذاتی معلومات'}</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Step 1 of 5
            </span>
          </h2>
        </div>

        {/* Notice badge */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-xs text-emerald-900">
              {language === 'en' ? 'Apni zaati maloomat darj karein' : 'اپنی ذاتی معلومات درج کریں'}
            </div>
            <p className="text-xs text-emerald-800/80 mt-0.5">
              {language === 'en'
                ? 'Barah-e-karam apni durust zaati maloomat darj karein ta keh tasdeeq mein dushwari na ho.'
                : 'براہ کرم اپنی درست ذاتی معلومات درج کریں تاکہ تصدیق میں دشواری نہ ہو۔'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
              <label>Full Name *</label>
              <span className="text-gray-500 font-normal">پورا نام</span>
            </div>
            <input
              type="text"
              required
              placeholder="e.g. Muhammad Nasir"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            />
          </div>

          {/* CNIC */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
              <label>CNIC *</label>
              <span className="text-gray-500 font-normal">شناختی کارڈ</span>
            </div>
            <input
              type="text"
              required
              placeholder="XXXXX-XXXXXXX-X"
              value={formData.cnic}
              onChange={(e) => handleChange('cnic', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
            />
          </div>

          {/* Mobile No */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
              <label>Mobile No *</label>
              <span className="text-gray-500 font-normal">موبائل نمبر</span>
            </div>
            <input
              type="tel"
              required
              placeholder="03XXXXXXXXX"
              value={formData.mobile}
              onChange={(e) => handleChange('mobile', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
            />
          </div>

          {/* Gender & DOB */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                <label>Gender *</label>
                <span className="text-gray-500 font-normal">جنس</span>
              </div>
              <select
                required
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              >
                <option value="">Select Gender / جنس منتخب کریں</option>
                <option value="Male">Male (مرد)</option>
                <option value="Female">Female (عورت)</option>
                <option value="Other">Other (دیگر)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                <label>Date of Birth *</label>
                <span className="text-gray-500 font-normal">تاریخ پیدائش</span>
              </div>
              <input
                type="date"
                required
                value={formData.dob}
                onChange={(e) => handleChange('dob', e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Province */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
              <label>Province *</label>
              <span className="text-gray-500 font-normal">صوبہ</span>
            </div>
            <select
              required
              value={formData.province}
              onChange={(e) => handleChange('province', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            >
              <option value="">Select Province / صوبہ منتخب کریں</option>
              <option value="Punjab">Punjab (پنجاب)</option>
              <option value="Sindh">Sindh (سندھ)</option>
              <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa (خیبر پختونخوا)</option>
              <option value="Balochistan">Balochistan (بلوچستان)</option>
              <option value="Islamabad Capital Territory">Islamabad (وفاقی دارالحکومت)</option>
              <option value="Gilgit-Baltistan">Gilgit-Baltistan (گلگت بلتستان)</option>
              <option value="Azad Kashmir">Azad Kashmir (آزاد کشمیر)</option>
            </select>
          </div>

          {/* Address */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
              <label>Address *</label>
              <span className="text-gray-500 font-normal">پتہ</span>
            </div>
            <textarea
              required
              rows={2}
              placeholder="House #, Street, City / مکان نمبر، گلی، شہر"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none resize-none"
            />
          </div>

          {/* Status Indicator */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-semibold ${
            isComplete ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            <span>
              {isComplete
                ? 'All personal fields filled successfully'
                : 'All personal fields must be filled to proceed'}
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
              <span>{language === 'en' ? 'Enter All Details to Continue' : 'اگلے مرحلے پر جائیں'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
