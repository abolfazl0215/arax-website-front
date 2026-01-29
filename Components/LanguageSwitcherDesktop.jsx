"use client";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLanguageStore } from "@/stores/useLanguageStore";
import Image from "next/image";

const languages = [
  { code: "en", name: "English", flag: "/icons/usa.svg" },
  { code: "fa", name: "فارسی", flag: "/icons/iran.svg" },
  { code: "ar", name: "العربية", flag: "/icons/arab.svg" },
  { code: "ru", name: "Русский", flag: "/icons/russia.svg" },
  { code: "ka", name: "ქართული", flag: "/icons/georgia.svg" },
  { code: "hy", name: "Հայերեն", flag: "/icons/armenia.svg" },
  { code: "fr", name: "Français", flag: "/icons/france.svg" }, // French
  { code: "de", name: "Deutsch", flag: "/icons/germany.svg" }, // German
  { code: "zh", name: "中文", flag: "/icons/china.svg" }, // Chinese (Simplified)
  { code: "it", name: "Italiano", flag: "/icons/italy.svg" },
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
        <span className="w-8">EN</span>
        <ChevronDown size={15} />
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsLangOpen(!isLangOpen)}
        className="px-4 py-2 rounded-lg bg-slate-200 flex items-center gap-2 text-sm hover:bg-slate-300 transition-colors cursor-pointer">
        <Image
          src={language.flag}
          className="h-5 w-5"
          alt="flag"
          width={50}
          height={50}
        />
        <span className="w-8">{language.code.toUpperCase()}</span>
        <ChevronDown size={15} />
      </button>

      {isLangOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg border border-gray-200 overflow-hidden z-50 min-w-[150px] shadow-lg">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang)}
              className="w-full cursor-pointer px-4 py-2 text-left hover:bg-slate-100 transition-colors text-sm flex items-center gap-2">
              <Image
                src={lang.flag}
                className="h-5 w-5"
                alt="flag"
                width={50}
                height={50}
              />
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcherDesktop;
