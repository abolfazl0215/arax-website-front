"use client";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLanguageStore } from "@/stores/useLanguageStore";
import Image from "next/image";

const languages = [
  { code: "en", name: "English", flag: "/icons/usa.svg" },
  { code: "ru", name: "Русский", flag: "/icons/russia.svg" },
  { code: "fa", name: "فارسی", flag: "/icons/iran.svg" },
  { code: "ka", name: "ქართული", flag: "/icons/georgia.svg" },
  { code: "ar", name: "العربية", flag: "/icons/arab.svg" },
  { code: "hy", name: "Հայերեն", flag: "/icons/armenia.svg" },
  { code: "fr", name: "Français", flag: "/icons/france.svg" },
  { code: "de", name: "Deutsch", flag: "/icons/germany.svg" },
  { code: "zh", name: "中文", flag: "/icons/china.svg" },
  { code: "it", name: "Italiano", flag: "/icons/italy.svg" },
];

const LanguageSwitcherMobile = ({ setIsLangOpen }) => {
  const { setLanguage } = useLanguageStore();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (lang) => {
    setLanguage(lang);
    router.replace(pathname, { locale: lang.code });
    setIsLangOpen(false);
  };

  return (
    <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang)}
          className="w-full px-4 py-3 text-left hover:bg-slate-100 transition-colors text-sm flex items-center gap-2">
          <Image
            src={lang.flag}
            alt={lang.name}
            width={22}
            height={14}
          />
          <span>{lang.name}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcherMobile;
