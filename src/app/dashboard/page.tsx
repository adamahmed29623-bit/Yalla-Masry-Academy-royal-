"use client";
import React, { useState, createContext, useContext } from 'react';
import { 
  Home as HomeIcon, 
  Users, 
  BookOpen, 
  MessageCircle, 
  LayoutDashboard, 
  Globe, 
  ShieldCheck, 
  Crown,
  Menu,
  X,
  ArrowRight,
  Star,
  PlayCircle,
  Clock,
  Award,
  Calendar,
  CheckCircle2,
  CreditCard,
  Send,
  MapPin,
  Mail,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Palace // استخدام أيقونة القصر للمتحف
} from 'lucide-react';

/**
 * 👑 المحرك الإمبراطوري الشامل - أكاديمية يلا مصري
 * تحديث: تم إضافة بوابة المتحف الملكي الرسمية.
 */

// --- 1. LANGUAGE CONTEXT ---
const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('ar');
  const translations = {
    ar: {
      nav_home: "الرئيسية",
      nav_teachers: "رواق المعلمات",
      nav_museum: "المتحف الملكي",
      nav_lessons: "قاعة الدروس",
      nav_contact: "ديوان التواصل",
      nav_dashboard: "لوحة التحكم",
      hero_title: "أكاديمية يلا مصري",
      hero_subtitle: "إتقان اللهجة المصرية برقي ملكي.. لأنكِ تستحقين الأفضل.",
      start_btn: "ابدئي رحلتكِ الآن",
      dir: "rtl"
    },
    en: {
      nav_home: "Home",
      nav_teachers: "Teachers",
      nav_museum: "Royal Museum",
      nav_lessons: "Lessons",
      nav_contact: "Contact",
      nav_dashboard: "Dashboard",
      hero_title: "Yalla Masry Academy",
      hero_subtitle: "Master the Egyptian dialect with royal elegance.. Because you deserve the best.",
      start_btn: "Start Your Journey",
      dir: "ltr"
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      <div dir={translations[lang].dir} className={`min-h-screen bg-[#000814] text-white ${lang === 'ar' ? 'font-sans' : 'font-serif'}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

const useLang = () => useContext(LanguageContext);

// --- 2. SUB-COMPONENTS (Views) ---

const HomeView = ({ onStart }) => {
  const { t } = useLang();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-8 animate-in fade-in duration-1000">
      <div className="relative">
        <div className="absolute inset-0 bg-amber-500 blur-[100px] opacity-20"></div>
        <Crown size={80} className="text-amber-500 relative z-10 mb-6" />
      </div>
      <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase">{t.hero_title}</h1>
      <p className="text-xl md:text-2xl text-slate-400 font-bold italic max-w-2xl">{t.hero_subtitle}</p>
      <button 
        onClick={onStart}
        className="group bg-amber-500 text-[#000814] px-12 py-6 rounded-full font-black text-xl flex items-center gap-4 hover:scale-110 transition-all shadow-2xl shadow-amber-500/20"
      >
        {t.start_btn}
        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
  );
};

const TeachersView = ({ onBook }) => {
  return (
    <div className="p-8 lg:p-20 space-y-12 animate-in slide-in-from-bottom-10">
      <h2 className="text-5xl font-black italic">رواق <span className="text-amber-500">المعلمات</span></h2>
      <div className="bg-[#001d3d] rounded-[3rem] p-8 flex flex-col lg:flex-row items-center gap-10 border border-white/5">
        <div className="w-full lg:w-80 h-64 bg-[#000814] rounded-[2.5rem] overflow-hidden relative">
          <img src="https://images.unsplash.com/photo-1544717297-fa95b3ee51f3?w=800" className="w-full h-full object-cover opacity-50" alt="Teacher" />
          <PlayCircle className="absolute inset-0 m-auto text-amber-500" size={50} />
        </div>
        <div className="flex-1 space-y-4 text-center lg:text-right">
          <h3 className="text-3xl font-black italic">أ. مريم الفارس <ShieldCheck className="inline text-sky-400" /></h3>
          <p className="text-amber-500 font-bold uppercase tracking-widest text-sm">خبيرة اللهجة الملكية</p>
          <p className="text-slate-400 text-lg italic">"نحن لا نتعلم الكلمات فقط، بل نتعلم ثقافة، رقي، وأسلوب حياة مصري أصيل يليق بكِ."</p>
        </div>
        <div className="w-full lg:w-48 text-center space-y-4">
          <p className="text-4xl font-black">$45</p>
          <button onClick={onBook} className="w-full bg-amber-500 text-[#000814] py-4 rounded-2xl font-black hover:scale-105 transition-all">احجزي الآن</button>
        </div>
      </div>
    </div>
  );
};

const BookingView = ({ onBack }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="p-8 lg:p-20 max-w-4xl mx-auto space-y-10 animate-in zoom-in-95">
       <button onClick={onBack} className="text-slate-500 font-bold flex items-center gap-2 hover:text-amber-500 transition-colors"><X size={18}/> إلغاء</button>
       <div className="bg-amber-500 p-12 rounded-[3.5rem] text-[#000814]">
          <h2 className="text-5xl font-black italic mb-4 text-center">تأكيد الموعد</h2>
          <p className="text-center font-bold opacity-80">اختاري الوقت الأنسب لجدولكِ الملكي</p>
       </div>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["09:00 AM", "11:00 AM", "02:00 PM", "05:00 PM"].map(time => (
            <button key={time} onClick={() => setSelected(time)} className={`p-6 rounded-[2rem] font-black border-2 transition-all ${selected === time ? 'bg-amber-500 border-amber-500 text-[#000814]' : 'bg-[#001d3d] border-white/5 text-slate-400'}`}>
              {time}
            </button>
          ))}
       </div>
       <button disabled={!selected} className="w-full py-6 bg-amber-500 text-[#000814] rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-4 disabled:opacity-20 transition-all">
          <CreditCard /> دفع وتأكيد الموعد
       </button>
    </div>
  );
};

const ContactView = () => {
  return (
    <div className="p-8 lg:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in">
      <div className="space-y-8">
        <h2 className="text-6xl font-black italic">ديوان <span className="text-amber-500">التواصل</span></h2>
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-slate-400 font-bold italic"><MapPin className="text-amber-500"/> القاهرة، جمهورية مصر العربية</div>
          <div className="flex items-center gap-4 text-slate-400 font-bold italic"><Mail className="text-amber-500"/> contact@yallamasry.com</div>
        </div>
      </div>
      <div className="bg-[#001d3d] p-10 rounded-[3rem] border border-white/5 space-y-4 shadow-2xl">
        <input placeholder="الاسم الكريم" className="w-full bg-[#000814] p-5 rounded-2xl border-none ring-1 ring-white/10" />
        <input placeholder="البريد الإلكتروني" className="w-full bg-[#000814] p-5 rounded-2xl border-none ring-1 ring-white/10" />
        <textarea placeholder="رسالتكِ الملكية..." rows="4" className="w-full bg-[#000814] p-5 rounded-2xl border-none ring-1 ring-white/10 resize-none"></textarea>
        <button className="w-full bg-amber-500 text-[#000814] py-5 rounded-2xl font-black flex items-center justify-center gap-2 transition-all hover:bg-amber-400"><Send size={18}/> إرسال الديوان</button>
      </div>
    </div>
  );
};

// --- 3. SIDEBAR ---
const Sidebar = ({ activeTab, setActiveTab }) => {
  const { lang, setLang, t } = useLang();
  
  const menuItems = [
    { id: 'home', icon: HomeIcon, label: t.nav_home },
    { id: 'teachers', icon: Users, label: t.nav_teachers },
    { 
      id: 'museum', 
      icon: BookOpen, 
      label: t.nav_museum, 
      isExternal: true, 
      url: "https://royal-academy-yalla-masry.vercel.app/" 
    },
    { id: 'contact', icon: MessageCircle, label: t.nav_contact },
  ];

  const handleNavClick = (item) => {
    if (item.isExternal) {
      window.open(item.url, '_blank');
    } else {
      setActiveTab(item.id);
    }
  };

  return (
    <aside className={`fixed inset-y-0 z-40 w-72 bg-[#001d3d] border-white/5 flex flex-col shadow-2xl ${lang === 'ar' ? 'right-0 border-l' : 'left-0 border-r'} hidden lg:flex`}>
      <div className="p-8 flex items-center gap-4 border-b border-white/5">
        <div className="bg-amber-500 p-3 rounded-2xl shadow-lg shadow-amber-500/20"><ShieldCheck size={28} className="text-[#000814]" /></div>
        <div>
          <h1 className="text-2xl font-black italic tracking-tighter">يلا مصري</h1>
          <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Academy</p>
        </div>
      </div>
      <nav className="flex-1 mt-8 px-6 space-y-2">
        {menuItems.map(item => (
          <button 
            key={item.id} 
            onClick={() => handleNavClick(item)} 
            className={`w-full flex items-center gap-4 p-5 rounded-[1.8rem] transition-all duration-300 group ${activeTab === item.id && !item.isExternal ? 'bg-amber-500 text-[#000814] shadow-xl' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <item.icon size={22} className={activeTab === item.id && !item.isExternal ? '' : 'group-hover:scale-110 transition-transform'} />
            <span className="font-black text-sm italic">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-6">
        <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="w-full flex items-center justify-between p-4 bg-[#000814] rounded-2xl border border-white/5 text-amber-500 font-black text-xs hover:border-amber-500/50 transition-all">
          <Globe size={16} /> <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
        </button>
      </div>
    </aside>
  );
};

// --- 4. APP ---
export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <LanguageProvider>
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 transition-all duration-500 min-h-screen lg:pr-72 lg:pl-0">
          <div className="relative z-0">
            {activeTab === 'home' && <HomeView onStart={() => setActiveTab('teachers')} />}
            {activeTab === 'teachers' && <TeachersView onBook={() => setActiveTab('booking')} />}
            {activeTab === 'booking' && <BookingView onBack={() => setActiveTab('teachers')} />}
            {activeTab === 'contact' && <ContactView />}
          </div>
        </main>
      </div>
    </LanguageProvider>
  );
}
