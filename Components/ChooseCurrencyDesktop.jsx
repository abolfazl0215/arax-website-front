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

export default function ChooseCurrencyDesktop() {
  const { currency, setCurrency } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (curr) => {
    setCurrency(curr);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors duration-150"
        aria-expanded={isOpen}
        aria-haspopup="listbox">
        <span className="flex items-center gap-1.5">
          <span className="text-base">{currency?.symbol || "֏"}</span>
          <span className="min-w-[2.5rem]">
            {currency?.code || "AMD"}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="py-1" role="listbox">
            {currencies.map((curr) => {
              const isActive = currency?.code === curr.code;

              return (
                <button
                  key={curr.code}
                  onClick={() => handleSelect(curr)}
                  role="option"
                  aria-selected={isActive}
                  className={`
                    w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors duration-100
                    ${
                      isActive
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}>
                  <span className="flex items-center gap-2">
                    <span className="text-base w-5">
                      {curr.symbol}
                    </span>
                    <span>{curr.code}</span>
                    <span className="text-gray-500">—</span>
                    <span className="text-gray-600">{curr.name}</span>
                  </span>

                  {isActive && (
                    <span className="text-gray-900 text-base">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
