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

  useEffect(() => {
    setMounted(true);
  }, []);

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

      // Update on scroll and resize
      const handleUpdate = () => {
        if (buttonRef.current) {
          updatePosition();
        }
      };

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
        console.log("Clicked outside, closing dropdown");
        setIsCurrencyOpen(false);
      }
    };

    // تاخیر کوچک برای اجتناب از بسته شدن فوری
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
    console.log("✅ Currency selected:", curr.code);
    setCurrency(curr);
    // تاخیر کوچک برای اطمینان از اجرای setCurrency
    setTimeout(() => {
      setIsCurrencyOpen(false);
    }, 50);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Button clicked, current state:", isCurrencyOpen);
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
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleButtonClick}
        className="w-full px-4 py-3 rounded-lg border border-slate-300 hover:border-slate-500 transition-all flex items-center justify-between text-sm hover:bg-slate-100 active:bg-slate-200 touch-manipulation">
        <span className="font-medium">{currency.code}</span>
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 ${isCurrencyOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isCurrencyOpen &&
        mounted &&
        buttonRect &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              bottom: `${window.innerHeight - buttonRect.top + 8}px`,
              left: `${buttonRect.left}px`,
              width: `${buttonRect.width}px`,
              zIndex: 2147483647, // Maximum possible z-index
              pointerEvents: "auto",
              touchAction: "auto",
            }}
            className="bg-white rounded-lg border-2 border-gray-300 overflow-hidden shadow-2xl"
            onClick={(e) => {
              console.log("Dropdown clicked");
              e.stopPropagation();
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}>
            <div className="max-h-64 overflow-y-auto">
              {currencies.map((curr, index) => (
                <button
                  key={curr.code}
                  type="button"
                  onClick={(e) => {
                    console.log(
                      "=======Currency button clicked:",
                      curr.code,
                    );
                    e.preventDefault();
                    e.stopPropagation();
                    handleCurrencyChange(curr);
                  }}
                  onTouchEnd={(e) => {
                    console.log(
                      "=======Currency touch end:",
                      curr.code,
                    );
                    e.preventDefault();
                    e.stopPropagation();
                    handleCurrencyChange(curr);
                  }}
                  className={`
                  w-full px-4 py-3 text-left cursor-pointer transition-all text-sm
                  ${
                    currency.code === curr.code
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "hover:bg-slate-200 active:bg-slate-300"
                  }
                  ${index !== currencies.length - 1 ? "border-b border-gray-200" : ""}
                  touch-manipulation
                `}
                  style={{
                    WebkitTapHighlightColor: "transparent",
                    userSelect: "none",
                    pointerEvents: "auto",
                  }}>
                  <div className="flex items-center justify-between">
                    <span>
                      {curr.code} - {curr.name}
                    </span>
                    {currency.code === curr.code && (
                      <span className="text-blue-600 font-bold text-lg">
                        ✓
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default ChooseCurrencyMobile;
