// stores/useLanguageStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLanguageStore = create(
  persist(
    (set) => ({
      language: {
        code: "",
        name: "",
        flag: "/icons/usa.svg",
      },
      currency: {
        code: "AMD",
        name: "Armenian Dram",
        symbol: "֏",
      },
      _hasHydrated: false, // ✅ اضافه کردن flag برای بررسی hydration
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
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
      onRehydrateStorage: () => (state) => {
        console.log("💾 Rehydrated from localStorage:", state);
        // ✅ بعد از hydration، flag را true کن
        state?.setHasHydrated(true);
      },
    },
  ),
);
