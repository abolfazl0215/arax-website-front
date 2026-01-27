"use client";
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
          <span>{lang.flag}</span>
          <span>{lang.name}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcherMobile;
