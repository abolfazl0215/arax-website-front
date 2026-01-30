"use client";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLanguageStore } from "@/stores/useLanguageStore";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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

const LanguageSwitcherMobile = ({ setIsLangOpen, isLangOpen }) => {
  const { setLanguage } = useLanguageStore();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (lang) => {
    setLanguage(lang);
    router.replace(pathname, { locale: lang.code });
    setIsLangOpen(false);
  };

  return (
    <AnimatePresence>
      {isLangOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg"
        >
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: {
                transition: {
                  staggerChildren: 0.03,
                  delayChildren: 0.05,
                },
              },
              closed: {
                transition: {
                  staggerChildren: 0.02,
                  staggerDirection: -1,
                },
              },
            }}
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => changeLanguage(lang)}
                variants={{
                  open: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    },
                  },
                  closed: {
                    opacity: 0,
                    x: -20,
                    transition: {
                      duration: 0.15,
                    },
                  },
                }}
                whileHover={{
                  backgroundColor: "rgb(241, 245, 249)",
                  x: 4,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 text-left transition-colors text-sm flex items-center gap-2"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image
                    src={lang.flag}
                    alt={lang.name}
                    width={22}
                    height={14}
                  />
                </motion.div>
                <span>{lang.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageSwitcherMobile;