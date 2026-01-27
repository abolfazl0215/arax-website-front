"use client";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLanguageStore } from "@/stores/useLanguageStore";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fa", name: "فارسی", flag: "🇮🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ka", name: "ქართული", flag: "🇬🇪" },
  { code: "hy", name: "Հայերեն", flag: "🇦🇲" },
];

const LanguageSwitcherDesktop = () => {
  const { language, setLanguage } = useLanguageStore();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // جلوگیری از hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    router.replace(pathname, { locale: lang.code });
    setIsLangOpen(false);
  };

  // نمایش placeholder تا زمان mount شدن
  if (!mounted) {
    return (
      <div className="px-4 py-2 rounded-lg bg-slate-200 flex items-center gap-2 text-sm">
        <span className="mr-1">🇬🇧</span>
        <span className="w-8">en</span>
        <ChevronDown size={15} />
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsLangOpen(!isLangOpen)}
        className="px-4 py-2 rounded-lg bg-slate-200 flex items-center gap-2 text-sm hover:bg-slate-300 transition-colors cursor-pointer">
        <span className="mr-1">{language.flag}</span>
        <span className="w-8">{language.code}</span>
        <ChevronDown size={15} />
      </button>

      {isLangOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg border border-gray-200 overflow-hidden z-50 min-w-[150px] shadow-lg">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang)}
              className="w-full cursor-pointer px-4 py-2 text-left hover:bg-slate-100 transition-colors text-sm flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcherDesktop;
