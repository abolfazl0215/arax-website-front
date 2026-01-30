"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLanguageStore } from "@/stores/useLanguageStore";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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

const dropdownVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -8,
    filter: "blur(4px)",
    transition: { duration: 0.18 }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.25,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -6,
    transition: { duration: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0 }
};

const LanguageSwitcherDesktop = () => {
  const { language, setLanguage } = useLanguageStore();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const wrapperRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // بستن با کلیک بیرون
  useEffect(() => {
    const handler = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
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
    <div ref={wrapperRef} className="relative select-none">
      {/* Button */}
      <button
        onClick={() => setIsLangOpen((p) => !p)}
        className="px-[1vw] py-[.6vw] rounded-lg bg-slate-200 flex items-center gap-[.5vw] hover:bg-slate-300 transition-colors cursor-pointer">

        <Image src={language.flag} alt="flag" width={50} height={50}
          className="h-[1.5vw] w-[1.8vw]" />

        <span className="w-[2vw] text-[1vw]">
          {language.code.toUpperCase()}
        </span>

        <motion.div
          animate={{ rotate: isLangOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}>
          <ChevronDown size={15} />
        </motion.div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isLangOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full mt-2 right-0 bg-white rounded-xl border border-gray-200 overflow-hidden z-50 min-w-[170px] shadow-xl backdrop-blur-sm">

            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                variants={itemVariants}
                onClick={() => changeLanguage(lang)}
                whileHover={{ x: 4 }}
                className="w-full px-4 py-2 text-left hover:bg-slate-100 transition-colors text-sm flex items-center gap-2 cursor-pointer">

                <Image src={lang.flag} alt="flag" width={20} height={20} />
                <span>{lang.name}</span>

              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcherDesktop;
