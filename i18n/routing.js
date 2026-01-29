import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: [
    "en",
    "fa",
    "ar",
    "de",
    "fr",
    "hy",
    "it",
    "ka",
    "ru",
    "zh",
  ],
  defaultLocale: "en",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
