"use client";
import React, { createContext, useState, useContext } from 'react';
import { 
  Star, 
  ShieldCheck, 
  PlayCircle, 
  Clock, 
  Award, 
  ChevronLeft, 
  ChevronRight,
  Globe,
  Heart
} from 'lucide-react';

/**
 * 🏛️ رواق المعلمات - أكاديمية يلا مصري
 * ------------------------------------------------------------------
 * هذا الملف يدير عرض ملفات المعلمات مع دعم اللغتين العربية والإنجليزية.
 */

// --- 1. LANGUAGE CONTEXT (سياق اللغة لضمان استقرار المعاينة) ---
const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('ar');
  
  const translations = {
    ar: {
      title: "رواق الملكات",
      subtitle: "اختاري رفيقتك في رحلة إتقان 'المحروسة'",
      bookBtn: "احجزي مكانكِ",
      hours: "ساعة تدريس",
      specialty: "التخصص",
      rating: "تقييم ملكي",
      price: "للجلسة",
      currency: "$",
      dir: "rtl"
    },
    en: {
      title: "Queens' Gallery",
      subtitle: "Choose your companion in the journey of mastering 'Al-Mahrousa'",
      bookBtn: "Book Your Spot",
      hours: "Teaching Hours",
      specialty: "Specialty",
      rating: "Royal Rating",
      price: "per session",
      currency: "$",
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

// --- 2. TEACHER CARD COMPONENT (مكون بطاقة المعلمة) ---
const TeacherCard = ({ teacher, onBook }) => {
  const { lang, t } = useLang();

  return (
    <div className="bg-[#001d3d] rounded-[3rem] p-8 flex flex-col lg:flex-row items-center gap-10 border border-white/5 hover:border-amber-500/30 transition-all group relative overflow-hidden">
      {/* Decorative Aura */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full -translate-x-16 -translate-y-16 group-hover:bg-amber-500/10 transition-colors"></div>
      
      {/* Video/Profile Section */}
      <div className="w-full lg:w-80 h-64 bg-[#000814] rounded-[2.5rem] overflow-hidden relative border-2 border-white/5">
        <img 
          src={teacher.image} 
          className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
          alt={teacher.name[lang]} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000814] to-transparent opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer group/play">
          <div className="bg-amber-500/20 p-4 rounded-full backdrop-blur-md group-hover/play:scale-110 transition-transform">
            <PlayCircle className="text-amber-500" size={48} />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-3xl font-black italic flex items-center gap-2">
              {teacher.name[lang]} 
              <ShieldCheck className="text-sky-400" size={24} />
            </h3>
            <p className="text-amber-500/80 font-bold text-sm mt-1 uppercase tracking-widest">
              {teacher.title[lang]}
            </p>
          </div>
          <div className="bg-[#000814] px-4 py-2 rounded-2xl border border-white/5 text-amber-500 font-black flex items-center gap-2 italic">
            <Star size={18} fill="currentColor" /> {teacher.rating}
          </div>
        </div>

        <p className="text-slate-400 text-lg leading-relaxed italic max-w-xl">
          "{teacher.bio[lang]}"
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <div className="bg-white/5 px-4 py-2 rounded-xl text-[10px] font-black text-slate-500 tracking-widest flex items-center gap-2">
            <Clock size={12} /> {teacher.hours}+ {t.hours}
          </div>
          <div className="bg-white/5 px-4 py-2 rounded-xl text-[10px] font-black text-slate-500 tracking-widest flex items-center gap-2">
            <Award size={12} /> {teacher.specialty[lang]}
          </div>
        </div>
      </div>

      {/* Pricing & CTA Section */}
      <div className={`w-full lg:w-64 text-center ${lang === 'ar' ? 'lg:border-r' : 'lg:border-l'} border-white/10 lg:px-10 space-y-6`}>
        <div className="space-y-1">
          <p className="text-5xl font-black text-white italic">{t.currency}{teacher.price}</p>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{t.price}</p>
        </div>
        <button 
          onClick={() => onBook(teacher)}
          className="w-full bg-amber-500 text-[#000814] py-5 rounded-3xl font-black text-lg shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          {t.bookBtn}
        </button>
      </div>
    </div>
  );
};

// --- 3. MAIN TEACHERS PAGE ---
const TeachersContent = () => {
  const { lang, setLang, t } = useLang();

  // Mock Data للمعلمات
  const teachers = [
    {
      id: 1,
      name: { ar: "أ. مريم الفارس", en: "Ms. Maryam Al-Faris" },
      title: { ar: "خبيرة اللهجة الملكية", en: "Royal Dialect Expert" },
      bio: { 
        ar: "نحن لا نتعلم الكلمات فقط، بل نتعلم ثقافة، رقي، وأسلوب حياة مصري أصيل يليق بكِ.",
        en: "We don't just learn words; we learn the culture, elegance, and authentic Egyptian lifestyle you deserve."
      },
      image: "https://images.unsplash.com/photo-1544717297-fa95b3ee51f3?w=800",
      rating: "5.0",
      hours: "1200",
      specialty: { ar: "ملكات وبراعم", en: "Queens & Buds" },
      price: "45"
    }
  ];

  return (
    <div className="p-6 md:p-12 lg:p-20 space-y-16">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-12">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl font-black italic">
            {t.title.split(' ')[0]} <span className="text-amber-500">{t.title.split(' ')[1]}</span>
          </h2>
          <p className="text-slate-500 text-xl font-bold italic">{t.subtitle}</p>
        </div>
        
        <button 
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3 text-amber-500 font-bold hover:bg-white/10 transition-all"
        >
          <Globe size={20} />
          <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
        </button>
      </header>

      {/* Teachers List */}
      <div className="space-y-10">
        {teachers.map(teacher => (
          <TeacherCard key={teacher.id} teacher={teacher} onBook={(t) => console.log("Booking:", t.name[lang])} />
        ))}
      </div>

      {/* Footer Navigation placeholder */}
      <div className="flex justify-center pt-10">
        <div className="flex items-center gap-4 bg-[#001d3d] p-2 rounded-full border border-white/5">
          <button className="p-3 hover:bg-white/5 rounded-full transition-colors"><ChevronRight /></button>
          <span className="px-4 font-black text-amber-500 italic">01 / 05</span>
          <button className="p-3 hover:bg-white/5 rounded-full transition-colors"><ChevronLeft /></button>
        </div>
      </div>
    </div>
  );
};

// --- 4. EXPORT APP ---
export default function App() {
  return (
    <LanguageProvider>
      <TeachersContent />
    </LanguageProvider>
  );
}
