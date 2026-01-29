// components/LanguageSelectionModal.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Select Your Language
          </h2>
          <p className="text-sm text-gray-500 text-center mt-2">
            Please choose your preferred language
          </p>
        </div>

        {/* Language List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang)}
                className={`
                  flex items-center gap-4 p-4 rounded-xl border-2 transition-all
                  ${
                    selectedLang?.code === lang.code
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-teal-300 hover:bg-gray-50"
                  }
                `}>
                <Image
                  src={lang.flag}
                  alt={lang.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-800">{lang.name}</div>
                  <div className="text-sm text-gray-500">{lang.code.toUpperCase()}</div>
                </div>
                {selectedLang?.code === lang.code && (
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleConfirm}
            disabled={!selectedLang}
            className={`
              w-full py-3 rounded-xl font-semibold transition-all
              ${
                selectedLang
                  ? "bg-teal-600 hover:bg-teal-700 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}>
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectionModal;