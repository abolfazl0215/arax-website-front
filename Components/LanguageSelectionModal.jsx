"use client";

import { useState } from "react";
import Image from "next/image";

const languages = [
  { code: "en", name: "English", flag: "/icons/usa.svg" },
  { code: "fa", name: "فارسی", flag: "/icons/iran.svg" },
  { code: "ar", name: "العربية", flag: "/icons/arab.svg" },
  { code: "ru", name: "Русский", flag: "/icons/russia.svg" },
  { code: "ka", name: "ქართული", flag: "/icons/georgia.svg" },
  { code: "hy", name: "Հայերեն", flag: "/icons/armenia.svg" },
  { code: "fr", name: "Français", flag: "/icons/france.svg" },
  { code: "de", name: "Deutsch", flag: "/icons/germany.svg" },
  { code: "zh", name: "中文", flag: "/icons/china.svg" },
  { code: "it", name: "Italiano", flag: "/icons/italy.svg" },
];

const LanguageSelectionModal = ({ onSelectLanguage }) => {
  const [selectedLang, setSelectedLang] = useState(null);

  const handleConfirm = () => {
    if (selectedLang) {
      onSelectLanguage(selectedLang);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-modal-title"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 id="language-modal-title" className="text-xl font-semibold text-gray-900">
            Select Your Language
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Choose your preferred language to continue
          </p>
        </div>

        {/* Language List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang)}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-lg border transition-colors duration-150
                  ${
                    selectedLang?.code === lang.code
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }
                `}
                aria-pressed={selectedLang?.code === lang.code}
              >
                <Image
                  src={lang.flag}
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded object-cover flex-shrink-0"
                />
                <div className="flex-1 text-left min-w-0">
                  <div className="font-medium text-gray-900 truncate">{lang.name}</div>
                  <div className="text-xs text-gray-500">{lang.code.toUpperCase()}</div>
                </div>
                {selectedLang?.code === lang.code && (
                  <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleConfirm}
            disabled={!selectedLang}
            className={`
              w-full py-2.5 px-4 rounded-lg font-medium transition-colors duration-150
              ${
                selectedLang
                  ? "bg-gray-900 hover:bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectionModal;