"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLanguageStore } from "@/stores/useLanguageStore";

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
      window.addEventListener("scroll", updatePosition, {
        passive: true,
      });
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isCurrencyOpen, mounted]);

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
      <div className="w-full px-4 py-3 rounded-lg border border-gray-300 flex items-center justify-between text-sm">
        <span>֏ AMD</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    );
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleButtonClick}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-between text-sm font-medium text-gray-700 bg-white active:bg-gray-50 touch-manipulation">
        <span>
          {currency.symbol} {currency.code}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isCurrencyOpen ? "rotate-180" : ""}`}
        />
      </button>

      {mounted &&
        buttonRect &&
        createPortal(
          isCurrencyOpen && (
            <div
              ref={dropdownRef}
              style={{
                position: "fixed",
                bottom: `${window.innerHeight - buttonRect.top + 8}px`,
                left: `${buttonRect.left}px`,
                width: `${buttonRect.width}px`,
                zIndex: 9999,
                opacity: isCurrencyOpen ? 1 : 0,
                transform: isCurrencyOpen
                  ? "translateY(0)"
                  : "translateY(8px)",
                transition:
                  "opacity 150ms ease-out, transform 150ms ease-out",
              }}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg">
              <div className="max-h-64 overflow-y-auto">
                {currencies.map((curr, index) => (
                  <button
                    key={curr.code}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCurrencyChange(curr);
                    }}
                    className={`
                    w-full px-4 py-3 text-left text-sm transition-colors duration-100
                    ${
                      currency.code === curr.code
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-700 active:bg-gray-50"
                    }
                    ${index !== currencies.length - 1 ? "border-b border-gray-100" : ""}
                  `}>
                    <div className="flex items-center justify-between">
                      <span>
                        {curr.symbol} {curr.code} — {curr.name}
                      </span>
                      {currency.code === curr.code && (
                        <span className="text-gray-900 text-base">
                          ✓
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ),
          document.body,
        )}
    </>
  );
};

export default ChooseCurrencyMobile;
