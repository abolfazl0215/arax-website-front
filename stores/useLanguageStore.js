// stores/useLanguageStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLanguageStore = create(
  persist(
    (set) => ({
      language: {
        code: "en",
        name: "English",
        flag: "/icons/usa.svg",
      },
      currency: {
        code: "AMD",
        name: "Armenian Dram",
        symbol: "֏", // ⚠️ اضافه کردن symbol
      },
      setLanguage: (lang) => {
        console.log("📝 Setting language:", lang);
        set({ language: lang });
      },
      setCurrency: (curr) => {
        console.log("💰 Setting currency:", curr);
        set({ currency: curr });
        console.log("✅ Currency set successfully");
      },
    }),
    {
      name: "app-settings-storage",
      // ⚠️ اضافه کردن این option برای debug
      onRehydrateStorage: () => (state) => {
        console.log("💾 Rehydrated from localStorage:", state);
      },
    },
  ),
);
