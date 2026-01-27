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

const ChooseCurrencyDesktop = ({ setIsCurrencyOpen, setIsLangOpen, isCurrencyOpen }) => {
  const { currency, setCurrency } = useLanguageStore();
  const [mounted, setMounted] = useState(false);

  // جلوگیری از hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCurrencyChange = (curr) => {
    setCurrency(curr);
    setIsCurrencyOpen(false);
  };

  // نمایش placeholder تا زمان mount شدن
  if (!mounted) {
    return (
      <div className="px-4 py-2 text-sm rounded-lg border border-slate-300 flex items-center gap-2">
        <span className="w-8">AMD</span>
        <ChevronDown size={15} />
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsCurrencyOpen(!isCurrencyOpen);
          setIsLangOpen(false);
        }}
        className="px-4 py-2 cursor-pointer text-sm rounded-lg border border-slate-300 hover:border-slate-500 transition-all flex items-center gap-2 hover:bg-slate-100"
      >
        <span className="w-8">{currency.code}</span>
        <ChevronDown size={15} />
      </button>

      {isCurrencyOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg border border-gray-200 overflow-hidden z-50 min-w-[150px] shadow-lg">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              onClick={() => handleCurrencyChange(curr)}
              className="w-full px-4 py-2 text-left hover:bg-slate-100 transition-colors text-sm"
            >
              {curr.code} - {curr.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChooseCurrencyDesktop;