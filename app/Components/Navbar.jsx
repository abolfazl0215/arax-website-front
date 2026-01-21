import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Navbar = () => {
  const languages = [
    { code: "ENG", name: "English", flag: "🇬🇧" },
    { code: "HY", name: "Հայերեն", flag: "🇦🇲" },
    { code: "FA", name: "فارسی", flag: "🇮🇷" },
    { code: "KA", name: "ქართული", flag: "🇬🇪" },
    { code: "RU", name: "Русский", flag: "🇷🇺" },
  ];

  const currencies = [
    { code: "AMD", name: "Armenian Dram" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "GEL", name: "Georgian Lari" },
    { code: "USD", name: "US Dollar" },
  ];

  const [selectedLang, setSelectedLang] = useState({
    code: "ENG",
    name: "English",
    flag: "🇬🇧",
  });
  const [selectedCurrency, setSelectedCurrency] = useState("AMD");
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

  return (
    <>
      <nav
        className={`
        fixed top-0 left-0 w-full z-50
        flex justify-between items-center
        px-[4vw] md:px-[8vw] pb-[3vw] md:pb-[1vw]
        transition-all duration-500 ease-in-out
        bg-[#f1f5f9]/90 backdrop-blur-sm border-b 
        ${scrolled ? "pt-[4vw] md:pt-[1vw]  border-slate-200" : "pt-[4vw] border-transparent"}
      `}>
        {/* Mobile Menu Button - Only visible on mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden  hover:bg-gray-100 rounded-lg transition-colors">
          <Menu size={24} className="text-gray-700" />
        </button>

        {/* Logo - Always visible */}
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
                  className="hidden md:block  md:ml-0 ml-[1.5vw]  text-xs md:text-sm font-normal bg-clip-text text-transparent bg-[linear-gradient(135deg,#B48900_0%,#FFC100_35%,#FFD966_50%,#FFC100_65%,#B48900_100%)]"
                  style={{
                    WebkitTextStroke: "0.5px #FFC100",
                  }}>
                  group
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <ul className="hidden md:flex gap-11 text-[#4B4B4B]">
          <li className="cursor-pointer hover:text-teal-600 transition-colors">
            Home
          </li>
          <li className="cursor-pointer hover:text-teal-600 transition-colors">
            Stays
          </li>
          <li className="cursor-pointer hover:text-teal-600 transition-colors">
            Tours
          </li>
          <li className="cursor-pointer hover:text-teal-600 transition-colors">
            Transfers
          </li>
          <li className="cursor-pointer hover:text-teal-600 transition-colors">
            About Us
          </li>
        </ul>

        {/* Language & Currency Selectors - Hidden on mobile */}
        <div className="hidden md:flex gap-2">
          <div className="relative">
            <button
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsCurrencyOpen(false);
              }}
              className="px-4 py-2 rounded-lg bg-slate-200 flex items-center gap-2 text-sm hover:bg-slate-300 transition-colors cursor-pointer">
              <span className="mr-1">{selectedLang.flag}</span>
              <span className="w-8">{selectedLang.code}</span>
              <ChevronDown size={15} />
            </button>

            {isLangOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-lg border border-gray-200 overflow-hidden z-50 min-w-[150px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang);
                      setIsLangOpen(false);
                    }}
                    className="w-full cursor-pointer px-4 py-2 text-left hover:bg-slate-100 transition-colors text-sm">
                    {lang.code} - {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setIsCurrencyOpen(!isCurrencyOpen);
                setIsLangOpen(false);
              }}
              className="px-4 py-2 cursor-pointer text-sm rounded-lg border border-slate-300 hover:border-slate-500 transition-all flex items-center gap-2 hover:bg-slate-100">
              <span className="w-8">{selectedCurrency}</span>
              <ChevronDown size={15} />
            </button>

            {isCurrencyOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-lg border border-gray-200 overflow-hidden z-50 min-w-[150px]">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => {
                      setSelectedCurrency(currency.code);
                      setIsCurrencyOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-slate-100 transition-colors text-sm">
                    {currency.code} - {currency.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Spacer for mobile to balance layout */}
        {/* <div className="md:hidden w-10"></div> */}
      </nav>

      {/* Desktop dropdown backdrop */}
      {(isLangOpen || isCurrencyOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsLangOpen(false);
            setIsCurrencyOpen(false);
          }}
        />
      )}

      {/* Mobile Menu Backdrop with Blur */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-30 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Menu
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={24} className="text-gray-700" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <ul className="flex flex-col p-4 gap-4">
            <li className="cursor-pointer hover:text-teal-600 transition-colors text-lg py-2 border-b border-gray-100">
              Home
            </li>
            <li className="cursor-pointer hover:text-teal-600 transition-colors text-lg py-2 border-b border-gray-100">
              Stays
            </li>
            <li className="cursor-pointer hover:text-teal-600 transition-colors text-lg py-2 border-b border-gray-100">
              Tours
            </li>
            <li className="cursor-pointer hover:text-teal-600 transition-colors text-lg py-2 border-b border-gray-100">
              Transfers
            </li>
            <li className="cursor-pointer hover:text-teal-600 transition-colors text-lg py-2 border-b border-gray-100">
              About Us
            </li>
          </ul>

          {/* Mobile Language & Currency Selectors */}
          <div className="p-4 mt-auto border-t border-gray-200">
            <div className="space-y-3">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsLangOpen(!isLangOpen);
                    setIsCurrencyOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-slate-200 flex items-center justify-between text-sm hover:bg-slate-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <span>{selectedLang.flag}</span>
                    <span>
                      {selectedLang.code} - {selectedLang.name}
                    </span>
                  </div>
                  <ChevronDown size={15} />
                </button>

                {isLangOpen && (
                  <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLang(lang);
                          setIsLangOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-slate-100 transition-colors text-sm">
                        {lang.flag} {lang.code} - {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Currency Selector */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsCurrencyOpen(!isCurrencyOpen);
                    setIsLangOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 hover:border-slate-500 transition-all flex items-center justify-between text-sm hover:bg-slate-100">
                  <span>{selectedCurrency}</span>
                  <ChevronDown size={15} />
                </button>

                {isCurrencyOpen && (
                  <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setSelectedCurrency(currency.code);
                          setIsCurrencyOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-slate-100 transition-colors text-sm">
                        {currency.code} - {currency.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
