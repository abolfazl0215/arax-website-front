"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcherDesktop from "./LanguageSwitcherDesktop";
import LanguageSwitcherMobile from "./LanguageSwitcherMobile";
import ChooseCurrencyDesktop from "./ChooseCurrencyDesktop";
import ChooseCurrencyMobile from "./ChooseCurrencyMobile";
import LanguageSelectionModal from "./LanguageSelectionModal";
import { useLanguageStore } from "@/stores/useLanguageStore";

const Navbar = () => {
  const nav = useTranslations("Navigation");
  const { language, setLanguage, _hasHydrated } = useLanguageStore();
  const router = useRouter();
  const pathname = usePathname();

  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // ✅ فقط بعد از hydration، بررسی کن که آیا زبان خالی است
  useEffect(() => {
    if (_hasHydrated) {
      console.log("✅ Hydration completed. Language:", language);
      if (!language.code) {
        console.log("⚠️ Language is empty, showing modal");
        setShowLanguageModal(true);
      }
    }
  }, [_hasHydrated, language.code]);

  const handleLanguageSelection = (selectedLang) => {
    setLanguage(selectedLang);
    setShowLanguageModal(false);

    // ریدایرکت به مسیر با زبان انتخاب شده
    const currentPath = pathname.split("/").slice(2).join("/") || "";
    router.push(`/${selectedLang.code}/${currentPath}`);
  };

  const isActive = (path) =>
    pathname === path
      ? "font-semibold text-teal-600"
      : "hover:text-teal-600 transition-colors";

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      if (isLangOpen || isCurrencyOpen) {
        setIsLangOpen(false);
        setIsCurrencyOpen(false);
      } else {
        setIsMobileMenuOpen(false);
      }
    }
  };

  // ✅ در حین hydration، نمایش لودینگ یا چیزی نمایش نده
  if (!_hasHydrated) {
    return null; // یا می‌تونید یک skeleton/loader نمایش بدید
  }

  return (
    <>
      {/* مودال انتخاب زبان */}
      {showLanguageModal && (
        <LanguageSelectionModal
          onSelectLanguage={handleLanguageSelection}
        />
      )}

      <nav
        className={`
        fixed top-0 left-0 w-full z-40
        flex justify-between items-center
        px-[4vw] md:px-[8vw] pb-[3vw] md:pb-[1vw]
        transition-all duration-500 ease-in-out
        bg-[#f1f5f9]/90 backdrop-blur-sm border-b 
        ${scrolled ? "pt-[4vw] md:pt-[1vw]  border-slate-200" : "pt-[4vw] border-transparent"}
      `}>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden hover:bg-gray-100 rounded-lg transition-colors">
          <Menu size={24} className="text-gray-700" />
        </button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <Image
              src="/arax-logo.svg"
              className="md:w-13 w-8"
              alt="logo"
              width={200}
              height={200}
            />

            <div>
              <h1
                className="text-xl md:text-3xl font-semibold bg-clip-text text-transparent bg-[linear-gradient(135deg,#B48900_0%,#FFC100_30%,#FFD966_50%,#FFC100_70%,#B48900_100%)]"
                style={{
                  WebkitTextStroke: "0.5px #FFC100",
                }}>
                Araks
                <span
                  className="hidden md:block md:ml-0 ml-[1.5vw] text-xs md:text-sm font-normal bg-clip-text text-transparent bg-[linear-gradient(135deg,#B48900_0%,#FFC100_35%,#FFD966_50%,#FFC100_65%,#B48900_100%)]"
                  style={{
                    WebkitTextStroke: "0.5px #FFC100",
                  }}>
                  group
                </span>
              </h1>
            </div>
          </div>
        </div>

        <div className="hidden md:flex gap-11 text-[#4B4B4B] transition-all">
          <Link
            href={`/${language.code || "en"}`}
            className={`${isActive(`/${language.code || "en"}`)} cursor-pointer hover:text-teal-600 transition-colors`}>
            {nav("home")}
          </Link>
          <Link
            href={`/${language.code || "en"}/stays`}
            className={`${isActive(`/${language.code || "en"}/stays`)} cursor-pointer hover:text-teal-600 transition-colors`}>
            {nav("stays")}
          </Link>
          <Link
            href={`/${language.code || "en"}/tours`}
            className={`${isActive(`/${language.code || "en"}/tours`)} cursor-pointer hover:text-teal-600 transition-colors`}>
            {nav("tours")}
          </Link>
          <Link
            href={`/${language.code || "en"}/transfers`}
            className={`${isActive(`/${language.code || "en"}/transfers`)} cursor-pointer hover:text-teal-600 transition-colors`}>
            {nav("transfers")}
          </Link>
          <Link
            href={`/${language.code || "en"}/about`}
            className={`${isActive(`/${language.code || "en"}/about`)} cursor-pointer hover:text-teal-600 transition-colors`}>
            {nav("aboutUs")}
          </Link>
        </div>

        <div className="hidden md:flex gap-2">
          <LanguageSwitcherDesktop />
          <ChooseCurrencyDesktop
            setIsCurrencyOpen={setIsCurrencyOpen}
            setIsLangOpen={setIsLangOpen}
            isCurrencyOpen={isCurrencyOpen}
          />
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={handleBackdropClick}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Menu
            </h2>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsLangOpen(false);
                setIsCurrencyOpen(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={24} className="text-gray-700" />
            </button>
          </div>

          <div className="flex flex-col p-4 gap-4">
            <Link
              href={`/${language.code || "en"}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${isActive(`/${language.code || "en"}`)} cursor-pointer hover:text-teal-600 transition-colors text-lg py-2 border-b border-gray-100`}>
              {nav("home")}
            </Link>
            <Link
              href={`/${language.code || "en"}/stays`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${isActive(`/${language.code || "en"}/stays`)} cursor-pointer hover:text-teal-600 transition-colors text-lg py-2 border-b border-gray-100`}>
              {nav("stays")}
            </Link>
            <Link
              href={`/${language.code || "en"}/tours`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${isActive(`/${language.code || "en"}/tours`)} cursor-pointer hover:text-teal-600 transition-colors text-lg py-2 border-b border-gray-100`}>
              {nav("tours")}
            </Link>
            <Link
              href={`/${language.code || "en"}/transfers`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${isActive(`/${language.code || "en"}/transfers`)} cursor-pointer hover:text-teal-600 transition-colors text-lg py-2 border-b border-gray-100`}>
              {nav("transfers")}
            </Link>
            <Link
              href={`/${language.code || "en"}/about`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${isActive(`/${language.code || "en"}/about`)} cursor-pointer hover:text-teal-600 transition-colors text-lg py-2 border-b border-gray-100`}>
              {nav("aboutUs")}
            </Link>
          </div>

          <div className="p-4 mt-auto border-t border-gray-200">
            <div className="space-y-3">
              <div className="relative">
                <button
                  onClick={() => {
                    setIsLangOpen(!isLangOpen);
                    setIsCurrencyOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-slate-200 flex items-center justify-between text-sm hover:bg-slate-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <Image
                      src={language.flag}
                      className="h-5 w-5"
                      alt="flag"
                      width={50}
                      height={50}
                    />
                    <span>
                      {language.code} - {language.name}
                    </span>
                  </div>
                  <ChevronDown
                    size={15}
                    className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isLangOpen && (
                  <LanguageSwitcherMobile
                    setSelectedLang={setLanguage}
                    setIsLangOpen={setIsLangOpen}
                  />
                )}
              </div>

              <ChooseCurrencyMobile
                setIsCurrencyOpen={setIsCurrencyOpen}
                setIsLangOpen={setIsLangOpen}
                isCurrencyOpen={isCurrencyOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
