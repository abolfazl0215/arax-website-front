"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
  { code: "fr", name: "Français", flag: "/icons/france.svg" },
  { code: "de", name: "Deutsch", flag: "/icons/germany.svg" },
  { code: "zh", name: "中文", flag: "/icons/china.svg" },
  { code: "it", name: "Italiano", flag: "/icons/italy.svg" },
];

const LanguageSwitcherDesktop = () => {
  const { language, setLanguage } = useLanguageStore();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const wrapperRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    router.replace(pathname, { locale: lang.code });
    setIsLangOpen(false);
  };

  if (!mounted) return null;

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>

      <div ref={wrapperRef} className="relative">
        <button
          onClick={() => setIsLangOpen((p) => !p)}
          className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center gap-2 transition-colors"
        >
          <Image
            src={language.flag}
            alt={language.name}
            width={20}
            height={20}
            className="w-5 h-5 rounded"
          />

          <span className="text-sm font-medium text-gray-900">
            {language.code.toUpperCase()}
          </span>

          <ChevronDown
            size={16}
            className={`text-gray-600 transition-transform duration-200 ${
              isLangOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isLangOpen && (
          <div className="absolute top-full mt-2 right-0 bg-white rounded-lg border border-gray-200 shadow-lg z-50 min-w-[180px] py-1 animate-fadeIn">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang)}
                className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors text-sm flex items-center gap-3 ${
                  language.code === lang.code
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                <Image
                  src={lang.flag}
                  alt={lang.name}
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded"
                />
                <span className="font-medium">{lang.name}</span>

                {language.code === lang.code && (
                  <span className="ml-auto text-blue-600">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LanguageSwitcherDesktop;
