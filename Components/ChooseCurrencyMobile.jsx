"use client";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguageStore } from "@/stores/useLanguageStore";

const currencies = [
  { code: "AMD", name: "Armenian Dram" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "GEL", name: "Georgian Lari" },
  { code: "USD", name: "US Dollar" },
];

const ChooseCurrencyMobile = ({
  setIsCurrencyOpen,
  setIsLangOpen,
  isCurrencyOpen,
}) => {
  const { currency, setCurrency } = useLanguageStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCurrencyChange = (curr) => {
    setCurrency(curr);
    setIsCurrencyOpen(false);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCurrencyOpen(!isCurrencyOpen);
    setIsLangOpen(false);
  };

  if (!mounted) {
    return (
      <div className="w-full px-4 py-3 rounded-lg border border-slate-300 flex items-center justify-between text-sm">
        <span>AMD</span>
        <ChevronDown size={15} />
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleButtonClick}
        onPointerDown={(e) => e.stopPropagation()}
        className="w-full px-4 py-3 rounded-lg border border-slate-300 hover:border-slate-500 transition-all flex items-center justify-between text-sm hover:bg-slate-100">
        <span>{currency.code}</span>
        <ChevronDown size={15} />
      </button>

      {isCurrencyOpen && (
        <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg z-50">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCurrencyChange(curr);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="w-full px-4 py-3 text-left hover:bg-slate-100 transition-colors text-sm">
              {curr.code} - {curr.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChooseCurrencyMobile;
