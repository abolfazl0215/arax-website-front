"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { motion, AnimatePresence } from "framer-motion";

const currencies = [
  { code: "AMD", name: "Armenian Dram", symbol: "֏" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
];

const ChooseCurrencyMobile = ({
  setIsCurrencyOpen,
  setIsLangOpen,
  isCurrencyOpen,
}) => {
  const { currency, setCurrency } = useLanguageStore();
  const [mounted, setMounted] = useState(false);
  const [buttonRect, setButtonRect] = useState(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => setMounted(true), []);

  // محاسبه موقعیت button برای dropdown
  useEffect(() => {
    if (isCurrencyOpen && buttonRef.current && mounted) {
      const updatePosition = () => {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      };
      updatePosition();
      const handleUpdate = () => updatePosition();
      window.addEventListener("scroll", handleUpdate, {
        passive: true,
      });
      window.addEventListener("resize", handleUpdate);
      return () => {
        window.removeEventListener("scroll", handleUpdate);
        window.removeEventListener("resize", handleUpdate);
      };
    }
  }, [isCurrencyOpen, mounted]);

  // بستن با کلیک خارج
  useEffect(() => {
    if (!isCurrencyOpen) return;
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsCurrencyOpen(false);
      }
    };
    const timeoutId = setTimeout(() => {
      document.addEventListener(
        "mousedown",
        handleClickOutside,
        true,
      );
      document.addEventListener("touchstart", handleClickOutside, {
        passive: true,
        capture: true,
      });
    }, 100);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
        true,
      );
      document.removeEventListener(
        "touchstart",
        handleClickOutside,
        true,
      );
    };
  }, [isCurrencyOpen, setIsCurrencyOpen]);

  const handleCurrencyChange = (curr) => {
    setCurrency(curr);
    setTimeout(() => setIsCurrencyOpen(false), 50);
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
        <span>֏ AMD</span>
        <ChevronDown size={15} />
      </div>
    );
  }

  return (
    <>
      {/* دکمه اصلی */}
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={handleButtonClick}
        whileTap={{ scale: 0.98 }}
        className="w-full px-4 py-3 rounded-lg border border-slate-300 hover:border-slate-500 transition-all flex items-center justify-between text-sm hover:bg-slate-100 active:bg-slate-200 touch-manipulation">
        <span className="font-medium">
          {currency.symbol} {currency.code}
        </span>
        <motion.div
          animate={{ rotate: isCurrencyOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}>
          <ChevronDown size={15} />
        </motion.div>
      </motion.button>

      {/* dropdown */}
      {mounted &&
        buttonRect &&
        createPortal(
          <AnimatePresence>
            {isCurrencyOpen && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  bottom: `${window.innerHeight - buttonRect.top + 8}px`,
                  left: `${buttonRect.left}px`,
                  width: `${buttonRect.width}px`,
                  zIndex: 2147483647,
                }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg">
                <motion.div
                  className="max-h-64 overflow-y-auto"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    open: {
                      transition: {
                        staggerChildren: 0.04,
                        delayChildren: 0.05,
                      },
                    },
                    closed: {
                      transition: {
                        staggerChildren: 0.03,
                        staggerDirection: -1,
                      },
                    },
                  }}>
                  {currencies.map((curr, index) => (
                    <motion.button
                      key={curr.code}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCurrencyChange(curr);
                      }}
                      variants={{
                        open: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 24,
                            overshootClamping: true, // ✅ جلوگیری از پرش
                          },
                        },
                        closed: {
                          opacity: 0,
                          x: -20,
                          transition: { duration: 0.15 },
                        },
                      }}
                      whileHover={{
                        backgroundColor:
                          currency.code === curr.code
                            ? "rgb(239, 246, 255)"
                            : "rgb(226, 232, 240)",
                        x: 4,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full px-4 py-3 text-left cursor-pointer transition-all text-sm
                        ${currency.code === curr.code ? "bg-blue-50 text-blue-700 font-semibold" : ""}
                        ${index !== currencies.length - 1 ? "border-b border-gray-200" : ""}
                      `}>
                      <div className="flex items-center justify-between">
                        <span>
                          {curr.symbol} {curr.code} - {curr.name}
                        </span>
                        {currency.code === curr.code && (
                          <motion.span
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 15,
                              overshootClamping: true, // ✅ جلوگیری از پرش
                            }}
                            className="text-blue-600 font-bold text-lg">
                            ✓
                          </motion.span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default ChooseCurrencyMobile;
