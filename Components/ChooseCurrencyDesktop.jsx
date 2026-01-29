"use client";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguageStore } from "@/stores/useLanguageStore";

const currencies = [
  { code: "AMD", name: "Armenian Dram", symbol: "֏" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
];

const ChooseCurrencyDesktop = () => {
  const { currency, setCurrency } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // بستن dropdown با کلیک خارج
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (curr) => {
    console.log("✅ Selected:", curr.code);
    setCurrency(curr);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="px-4 py-2 cursor-pointer text-sm rounded-lg border border-slate-300 hover:border-slate-500 transition-all flex items-center gap-2 hover:bg-slate-100">
        <span className="w-8">{currency?.code || "AMD"}</span>
        <ChevronDown
          size={15}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg border border-gray-200 overflow-hidden min-w-[200px] shadow-2xl z-50">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              type="button"
              onClick={() => handleSelect(curr)}
              className={`
                w-full px-4 py-2 text-left cursor-pointer transition-colors text-sm block
                ${
                  currency?.code === curr.code
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "hover:bg-slate-200"
                }
              `}>
              <div className="flex items-center justify-between">
                <span>
                  {curr.code} - {curr.name}
                </span>
                {currency?.code === curr.code && (
                  <span className="text-blue-600 font-bold">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChooseCurrencyDesktop;
