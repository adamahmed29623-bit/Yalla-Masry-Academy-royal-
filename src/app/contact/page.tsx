"use client";
import React, { createContext, useState, useContext } from 'react';
import { 
  Send, 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  Globe, 
  MessageCircle, 
  MapPin, 
  Mail,
  Crown
} from 'lucide-react';

/**
 * 🏛️ ديوان التواصل الملكي - أكاديمية يلا مصري
 * ------------------------------------------------------------------
 * المسار: src/pages/Contact.jsx
 */

// --- 1. LANGUAGE CONTEXT (لضمان استقرار المعاينة) ---
const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('ar');
  const translations = {
    ar: {
      title: "ديوان التواصل",
      subtitle: "لأننا نهتم بكل تفاصيل تجربتكِ، نحن هنا دائماً.",
      formTitle: "أرسلي استفساركِ الملكي",
      namePlaceholder: "الاسم الكريم",
      emailPlaceholder: "البريد الإلكتروني",
      msgPlaceholder: "كيف يمكننا مساعدتكِ اليوم؟",
      sendBtn: "إرسال الرسالة",
      socialTitle: "مجالسنا الرقمية",
      location: "القاهرة، جمهورية مصر العربية",
      dir: "rtl"
    },
    en: {
      title: "Contact Divan",
      subtitle: "Because we care about every detail of your experience, we are always here.",
      formTitle: "Send Your Royal Inquiry",
      namePlaceholder: "Your Full Name",
      emailPlaceholder: "Email Address",
      msgPlaceholder: "How can we assist you today?",
      sendBtn: "Send Message",
      socialTitle: "Digital Councils",
      location: "Cairo, Egypt",
      dir: "ltr"
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      <div dir={translations[lang].dir} className="min-h-screen bg-[#000814] text-white font-sans">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

const useLang = () => useContext(LanguageContext);

// --- 2. CONTACT CONTENT ---
const ContactContent = () => {
  const { lang, setLang, t } = useLang();

  const socialLinks = [
    { icon: Instagram, label: "Instagram", color: "hover:text-pink-500", url: "#" },
    { icon: Twitter, label: "Twitter (X)", color: "hover:text-sky-400", url: "#" },
    { icon: Facebook, label: "Facebook", color: "hover:text-blue-600", url: "#" },
    { icon: Youtube, label: "YouTube", color: "hover:text-red-500", url: "#" }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-16 space-y-20 animate-in fade-in duration-1000">
      
      {/* Header Section */}
      <div className="text-center space-y-6">
        <div className="flex justify-center mb-4">
            <button 
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className="bg-white/5 border border-white/10 px-6 py-2 rounded-full text-amber-500 font-bold text-xs flex items-center gap-2 hover:bg-white/10 transition-all"
            >
                <Globe size={16} />
                {lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            </button>
        </div>
        <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter">
          {t.title.split(' ')[0]} <span className="text-amber-500">{t.title.split(' ')[1]}</span>
        </h2>
        <p className="text-slate-400 text-xl font-bold italic max-w-2xl mx-auto tracking-wide">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Form Card */}
        <div className="bg-[#001d3d] p-10 md:p-14 rounded-[4rem] border border-white/5 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-all"></div>
          
          <h3 className="text-3xl font-black italic mb-8 flex items-center gap-4">
            <MessageCircle className="text-amber-500" size={32} />
            {t.formTitle}
          </h3>

          <form className="space-y-6 relative z-10">
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder={t.namePlaceholder}
                className="w-full bg-[#000814] p-6 rounded-[2rem] border-none outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-amber-500 transition-all font-bold text-white placeholder:text-slate-600"
              />
              <input 
                type="email" 
                placeholder={t.emailPlaceholder}
                className="w-full bg-[#000814] p-6 rounded-[2rem] border-none outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-amber-500 transition-all font-bold text-white placeholder:text-slate-600"
              />
              <textarea 
                placeholder={t.msgPlaceholder}
                rows="5"
                className="w-full bg-[#000814] p-6 rounded-[2rem] border-none outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-amber-500 transition-all font-bold text-white placeholder:text-slate-600 resize-none"
              ></textarea>
            </div>
            
            <button 
              type="button"
              className="w-full bg-amber-500 text-[#000814] py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Send size={24} />
              {t.sendBtn}
            </button>
          </form>
        </div>

        {/* Info & Social Section */}
        <div className="space-y-10 flex flex-col justify-center">
          
          {/* Quick Contact Info */}
          <div className="bg-white/5 p-10 rounded-[3.5rem] border border-white/5 space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="bg-amber-500/10 p-4 rounded-2xl group-hover:bg-amber-500 group-hover:text-[#000814] transition-all">
                <MapPin size={28} />
              </div>
              <p className="text-lg font-bold italic text-slate-300">{t.location}</p>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="bg-amber-500/10 p-4 rounded-2xl group-hover:bg-amber-500 group-hover:text-[#000814] transition-all">
                <Mail size={28} />
              </div>
              <p className="text-lg font-bold italic text-slate-300">contact@yallamasry.com</p>
            </div>
          </div>

          {/* Social Links Grid */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black italic px-4 border-r-4 border-amber-500">{t.socialTitle}</h3>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((soc, idx) => (
                <a 
                  key={idx} 
                  href={soc.url}
                  className={`flex items-center gap-4 p-6 bg-[#001d3d] rounded-[2.5rem] border border-white/5 text-slate-400 font-black text-sm transition-all hover:border-amber-500/30 group ${soc.color}`}
                >
                  <soc.icon size={28} className="group-hover:scale-125 transition-transform duration-500" />
                  <span className="opacity-80 group-hover:opacity-100">{soc.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Closing Badge */}
          <div className="flex items-center gap-4 opacity-20 hover:opacity-100 transition-opacity">
            <Crown className="text-amber-500" size={40} />
            <div>
              <p className="text-[10px] font-black tracking-[0.3em] uppercase">The First Academy</p>
              <p className="text-xs font-black italic">Yalla Masry Academy © 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. EXPORT APP ---
export default function App() {
  return (
    <LanguageProvider>
      <ContactContent />
    </LanguageProvider>
  );
}
