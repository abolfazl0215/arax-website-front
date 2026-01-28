import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import BookingModal from "../../Components/BookingModal";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  // unwrap params
  const { locale } = await params;

  // اگر locale معتبر نبود، 404
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // پیام‌ها
  const messages = (await import(`../../messages/${locale}.json`))
    .default;

  return (
    <html
      lang={locale}
      dir={locale === "fa" || locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <BookingModal />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
