"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { motion, AnimatePresence } from "framer-motion";

const currencies = [
  { code: "AMD", name: "Armenian Dram", symbol: "֏" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
];

const dropdownVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: -8,
    filter: "blur(4px)",
    transition: { duration: 0.18 },
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
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: -6,
    transition: { duration: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0 },
};

export default function ChooseCurrencyDesktop() {
  const { currency, setCurrency } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // بستن با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (curr) => {
    setCurrency(curr);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative select-none">
      {/* Button */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="px-[1vw] py-[.6vw] rounded-lg border border-slate-300 hover:border-slate-500 hover:bg-slate-100 transition-all flex items-center gap-[.7vw] text-[1vw] cursor-pointer">
        {" "}
        <span className="flex items-center gap-[.4vw] font-medium">
          {" "}
          <span className="text-[1.1vw]">
            {currency?.symbol || "֏"}{" "}
          </span>{" "}
          <span className="w-[2vw]">
            {currency?.code || "AMD"}{" "}
          </span>{" "}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}>
          <ChevronDown size={15} />
        </motion.div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full right-0 mt-2 bg-white rounded-xl border border-gray-200 overflow-hidden min-w-[220px] shadow-2xl z-50 backdrop-blur-sm">
            {currencies.map((curr) => {
              const active = currency?.code === curr.code;

              return (
                <motion.button
                  key={curr.code}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  onClick={() => handleSelect(curr)}
                  className={`
                w-full px-4 py-2 text-left transition-colors text-sm flex items-center justify-between cursor-pointer
                ${
                  active
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "hover:bg-slate-100"
                }
              `}>
                  <span className="flex items-center gap-2">
                    <span className="text-base">{curr.symbol}</span>
                    {curr.code} — {curr.name}
                  </span>

                  {active && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-blue-600 font-bold">
                      ✓
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
