"use client";
import React, { createContext, useState, useContext } from 'react';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Globe, 
  CheckCircle2, 
  CreditCard,
  Crown
} from 'lucide-react';

/**
 * 📅 ديوان الحجز الملكي - أكاديمية يلا مصري
 * ------------------------------------------------------------------
 * المسار: src/pages/Booking.jsx
 */

// --- 1. LANGUAGE CONTEXT (لضمان استقرار المعاينة) ---
const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('ar');
  const translations = {
    ar: {
      title: "تأكيد الجلسة الملكية",
      subtitle: "اختاري الموعد الذي يناسب جدولكِ المزدحم",
      back: "العودة للرواق",
      confirm: "إتمام الحجز والدفع",
      selected: "الموعد المختار",
      available: "المواعيد المتاحة",
      dir: "rtl"
    },
    en: {
      title: "Confirm Royal Session",
      subtitle: "Choose the time that suits your busy schedule",
      back: "Back to Gallery",
      confirm: "Complete Booking & Payment",
      selected: "Selected Time",
      available: "Available Slots",
      dir: "ltr"
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      <div dir={translations[lang].dir} className="min-h-screen bg-[#000814] text-white">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

const useLang = () => useContext(LanguageContext);

// --- 2. BOOKING COMPONENT ---
const BookingContent = ({ onBack }) => {
  const { lang, setLang, t } = useLang();
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    "09:00 AM", "10:30 AM", "12:00 PM", 
    "02:00 PM", "04:30 PM", "07:00 PM", 
    "08:30 PM", "10:00 PM"
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-10 animate-in slide-in-from-left-10 duration-700">
      
      {/* Navigation & Lang Switcher */}
      <div className="flex justify-between items-center">
        <button 
          onClick={onBack} 
          className="text-slate-500 hover:text-amber-500 flex items-center gap-2 font-bold transition-all group"
        >
          {lang === 'ar' ? <ChevronRight className="group-hover:translate-x-1 transition-transform" /> : <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />}
          {t.back}
        </button>
        <button 
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-amber-500 font-bold text-xs"
        >
          <Globe className="inline-block ml-2" size={14} />
          {lang === 'ar' ? 'English' : 'العربية'}
        </button>
      </div>

      {/* Hero Header Card */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-700 p-10 md:p-16 rounded-[3.5rem] text-[#000814] relative overflow-hidden shadow-2xl shadow-amber-500/20">
        <div className="relative z-10 space-y-4">
          <div className="bg-[#000814]/10 w-fit px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#000814]/10">
            <Crown className="inline-block mr-1" size={12} /> Step 2: Scheduling
          </div>
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter">{t.title}</h2>
          <p className="text-lg md:text-xl font-bold opacity-90 italic max-w-md">{t.subtitle}</p>
        </div>
        <Calendar className="absolute -left-10 -bottom-10 w-64 h-64 opacity-10 rotate-12" />
      </div>

      {/* Slots Selection */}
      <div className="bg-[#001d3d] p-8 md:p-12 rounded-[3.5rem] border border-white/5 space-y-8">
        <div className="flex items-center gap-3 border-b border-white/5 pb-6">
          <Clock className="text-amber-500" />
          <h3 className="text-xl font-black italic">{t.available}</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {timeSlots.map((time) => (
            <button 
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`p-6 rounded-3xl font-black text-sm transition-all flex flex-col items-center gap-2 border-2 ${
                selectedTime === time 
                ? 'bg-amber-500 border-amber-500 text-[#000814] scale-105 shadow-xl shadow-amber-500/20' 
                : 'bg-[#000814] border-white/5 text-slate-400 hover:border-amber-500/50'
              }`}
            >
              <span className="text-xs opacity-50 uppercase tracking-tighter">Session</span>
              {time}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-10 space-y-6">
          {selectedTime && (
            <div className="flex items-center justify-center gap-3 text-amber-500 animate-bounce">
              <CheckCircle2 size={20} />
              <span className="font-black italic">{t.selected}: {selectedTime}</span>
            </div>
          )}
          
          <button 
            disabled={!selectedTime}
            className={`w-full py-6 rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-4 transition-all ${
              selectedTime 
              ? 'bg-amber-500 text-[#000814] shadow-2xl shadow-amber-500/30 hover:scale-[1.02]' 
              : 'bg-white/5 text-slate-600 cursor-not-allowed'
            }`}
          >
            <CreditCard size={24} />
            {t.confirm}
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex justify-center gap-8 opacity-20 grayscale">
         <div className="flex items-center gap-2 font-black text-[10px] tracking-widest italic"><Crown size={14}/> ROYAL SECURE</div>
         <div className="flex items-center gap-2 font-black text-[10px] tracking-widest italic"><CheckCircle2 size={14}/> VERIFIED TEACHER</div>
      </div>
    </div>
  );
};

// --- 3. EXPORT APP ---
export default function App() {
  return (
    <LanguageProvider>
      <BookingContent onBack={() => console.log("Back clicked")} />
    </LanguageProvider>
  );
}
