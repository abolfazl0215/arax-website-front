"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLanguageStore } from "../stores/useLanguageStore";

export default function Footer() {
  const home = useTranslations("HomePage");
  const { language } = useLanguageStore();

  const navigationLinks = [
    { href: "/contact", label: home("contactUs") },
    { href: "/about", label: home("aboutUs") },
    { href: "/faq", label: home("faq") },
    { href: "/terms", label: home("termsAndConditions") },
  ];

  const moreLinks = [
    { href: "/privacy", label: home("privacyPolicy") },
    { href: "/complaints", label: home("complaints") },
    { href: "/tours", label: home("tours") },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/YOUR_USERNAME",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
        </svg>
      ),
      bg: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500",
    },
    {
      name: "Telegram",
      href: "https://t.me/YOUR_USERNAME",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      bg: "bg-sky-500",
    },
    {
      name: "WhatsApp",
      // شماره بدون + و فاصله — مثال: 989123456789
      href: "https://wa.me/YOUR_NUMBER",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
        </svg>
      ),
      bg: "bg-green-500",
    },
  ];

  return (
    <footer className="bg-slate-900 text-gray-400 py-12 px-6 md:px-20 lg:px-32 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Navigation Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            {home("navigation")}
          </h3>
          <ul className="space-y-2.5">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${language.code}${link.href}`}
                  className="text-sm hover:text-white transition-colors duration-150">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* More Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            {home("more")}
          </h3>
          <ul className="space-y-2.5">
            {moreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${language.code}${link.href}`}
                  className="text-sm hover:text-white transition-colors duration-150">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            {home("araksOnSocialMedia")}
          </h3>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-lg ${social.bg} flex items-center justify-center text-white hover:opacity-90 transition-opacity duration-150`}
                aria-label={social.name}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
