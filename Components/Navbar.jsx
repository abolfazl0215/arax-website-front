"use client";

import { Menu, X, ChevronDown } from "lucide-react";
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
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (_hasHydrated && !language.code) {
      setShowLanguageModal(true);
    }
  }, [_hasHydrated, language.code]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageSelection = (selectedLang) => {
    setLanguage(selectedLang);
    setShowLanguageModal(false);

    const currentPath = pathname.split("/").slice(2).join("/") || "";
    router.push(`/${selectedLang.code}/${currentPath}`);
  };

  const isActive = (path) =>
    pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";

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

  if (!_hasHydrated) {
    return null;
  }

  const navLinks = [
    { href: "", label: nav("home") },
    { href: "stays", label: nav("stays") },
    { href: "tours", label: nav("tours") },
    { href: "transfers", label: nav("transfers") },
    { href: "about", label: nav("aboutUs") },
  ];

  return (
    <>
      {/* Language Selection Modal */}
      {showLanguageModal && (
        <LanguageSelectionModal onSelectLanguage={handleLanguageSelection} />
      )}

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
            : "bg-white/90 backdrop-blur-sm py-4"
        }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Open menu">
            <Menu size={24} className="text-gray-700" />
          </button>

          {/* Logo */}
          <Link href={`/${language.code || "en"}`} className="flex items-center gap-3">
            <Image
              src="/arax-logo.svg"
              className="w-8 md:w-12 h-8 md:h-12"
              alt="Araks Group"
              width={48}
              height={48}
              priority
            />
            <h1 className="text-lg md:text-2xl font-bold text-gray-900">
              Araks <span className="text-blue-600">Group</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${language.code || "en"}${link.href ? `/${link.href}` : ""}`}
                className={`${isActive(
                  `/${language.code || "en"}${link.href ? `/${link.href}` : ""}`
                )} transition-colors`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Language & Currency */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcherDesktop />
            <ChooseCurrencyDesktop
              setIsCurrencyOpen={setIsCurrencyOpen}
              setIsLangOpen={setIsLangOpen}
              isCurrencyOpen={isCurrencyOpen}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={handleBackdropClick}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85%] bg-white z-50 transform transition-transform duration-300 ease-out md:hidden shadow-2xl ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}>
        
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-5 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Menu</h2>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsLangOpen(false);
                setIsCurrencyOpen(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu">
              <X size={24} className="text-gray-700" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-1 overflow-y-auto p-5">
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${language.code || "en"}${link.href ? `/${link.href}` : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${isActive(
                    `/${language.code || "en"}${link.href ? `/${link.href}` : ""}`
                  )} block px-4 py-3 rounded-lg transition-colors font-medium`}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Language & Currency Footer */}
          <div className="p-5 border-t border-gray-200 space-y-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLangOpen(!isLangOpen);
                  setIsCurrencyOpen(false);
                }}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3">
                  <Image
                    src={language.flag || "/icons/usa.svg"}
                    className="w-5 h-5 rounded"
                    alt={language.name}
                    width={20}
                    height={20}
                  />
                  <span className="font-medium text-gray-900">
                    {language.name}
                  </span>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-gray-600 transition-transform ${
                    isLangOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLangOpen && (
                <LanguageSwitcherMobile
                  setIsLangOpen={setIsLangOpen}
                  isLangOpen={isLangOpen}
                />
              )}
            </div>

            {/* Currency Selector */}
            <ChooseCurrencyMobile
              setIsCurrencyOpen={setIsCurrencyOpen}
              setIsLangOpen={setIsLangOpen}
              isCurrencyOpen={isCurrencyOpen}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;