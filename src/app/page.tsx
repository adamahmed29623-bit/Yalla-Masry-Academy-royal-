"use client";
import React, { createContext, useState, useContext } from 'react';
import { Crown, ArrowLeft, ArrowRight, Star, ShieldCheck, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation'; // أضفتُ هذا السطر للربط بين الصفحات

// --- 1. LANGUAGE CONTEXT (سياق اللغة) ---
const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('ar');
  
  const translations = {
    ar: {
      badge: "الأكاديمية الأولى للهجة المصرية الراقية",
      title: "تعلمي المصرية",
      subtitle: "بفخامة القصور",
      description: "حيث تلتقي عراقة 'المحروسة' برقي الاختيار. رحلة 'نوف' التعليمية تبدأ من هنا، لغةً وثقافةً وأسلوب حياة.",
      cta: "ابدئي الرحلة الآن",
      stats: [
        { label: "معلمة صفوة", value: "٥٠+" },
        { label: "طالبة ملكية", value: "١٠٠٠+" },
        { label: "ساعة تعليمية", value: "٥٠٠٠+" }
      ],
      dir: "rtl"
    },
    en: {
      badge: "The Premier Academy for Royal Egyptian Dialect",
      title: "Learn Egyptian",
      subtitle: "With Royal Elegance",
      description: "Where the heritage of 'Al-Mahrousa' meets elite refinement. Nouf's educational journey starts here—language, culture, and lifestyle.",
      cta: "Start Your Journey",
      stats: [
        { label: "Elite Teachers", value: "50+" },
        { label: "Royal Students", value: "1000+" },
        { label: "Learning Hours", value: "5000+" }
      ],
      dir: "ltr"
    }
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div dir={t.dir} className={lang === 'ar' ? 'font-sans' : 'font-serif'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

const useLang = () => useContext(LanguageContext);

// --- 2. HOME COMPONENT (مكون الصفحة الرئيسية) ---
const HomeContent = ({ onStart }) => {
  const { lang, setLang, t } = useLang();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-[#000814] text-white">
      {/* Language Switcher (Floating) */}
      <button 
        onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
        className="absolute top-10 right-10 z-50 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2 hover:bg-white/10 transition-all text-amber-500 font-bold"
      >
        <Globe size={18} />
        <span className="text-xs uppercase tracking-widest">{lang === 'ar' ? 'English' : 'العربية'}</span>
      </button>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl w-full text-center space-y-10 animate-in fade-in zoom-in duration-1000">
        
        {/* Excellence Badge */}
        <div className="inline-flex items-center gap-3 bg-white/5 border border-amber-500/20 px-6 py-3 rounded-full backdrop-blur-md">
          <Crown className="text-amber-500 animate-pulse" size={20} />
          <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-amber-500">
            {t.badge}
          </span>
        </div>

        {/* Hero Headlines */}
        <div className="space-y-2">
          <h1 className="text-6xl md:text-9xl font-black italic leading-none text-white tracking-tighter">
            {t.title}
          </h1>
          <h2 className="text-5xl md:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400 py-2">
            {t.subtitle}
          </h2>
        </div>

        {/* Description */}
        <p className="max-w-3xl mx-auto text-slate-400 text-lg md:text-2xl font-medium leading-relaxed italic opacity-80">
          {t.description}
        </p>

        {/* Action Button */}
        <div className="pt-6">
          <button 
            onClick={onStart}
            className="group relative bg-amber-500 text-[#000814] px-16 py-7 rounded-[2.5rem] font-black text-2xl md:text-3xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(245,158,11,0.3)] active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-4">
              {t.cta}
              {lang === 'ar' ? <ArrowLeft className="group-hover:-translate-x-2 transition-transform" /> : <ArrowRight className="group-hover:translate-x-2 transition-transform" />}
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 pt-16 border-t border-white/5 max-w-3xl mx-auto">
          {t.stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <p className="text-2xl md:text-4xl font-black text-white italic">{stat.value}</p>
              <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="absolute bottom-10 flex items-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all">
        <ShieldCheck size={24} />
        <Star size={24} />
        <div className="h-px w-20 bg-white/20"></div>
        <span className="text-[10px] font-black tracking-widest uppercase italic">Yalla Masry Academy</span>
      </div>
    </div>
  );
};

// --- 3. EXPORT APP (المكون النهائي) ---
export default function App() {
  const router = useRouter(); // محرك الانتقال الملكي

  const handleStart = () => {
    router.push('/teachers'); // يوجه الطالبة مباشرة لرواق المعلمات
  };

  return (
    <LanguageProvider>
      <HomeContent onStart={handleStart} />
    </LanguageProvider>
  );
}
