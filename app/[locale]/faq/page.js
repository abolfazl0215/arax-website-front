"use client";

import { useState, memo, useCallback } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";

// نمونه FAQ
const faqs = [
  {
    question: "How do I book a tour?",
    answer:
      'You can browse our tours on the Tours page, select your preferred tour, and click "Book Now". You will need to log in first if you haven\'t already.',
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Currently, we accept all major credit cards and bank transfers. Payment details will be provided during the booking process.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes, you can cancel your booking from your profile page. Please note that cancellation policies may vary depending on the service type.",
  },
  {
    question: "How long does visa processing take?",
    answer:
      "Visa processing times vary by destination. You can find the estimated processing time for each visa on the visa details page.",
  },
  {
    question: "Do you offer travel insurance?",
    answer:
      "Yes, we offer comprehensive travel insurance plans. You can book travel insurance from the Insurance page.",
  },
  {
    question: "How can I check my booking status?",
    answer:
      'You can view all your bookings and their status in your profile page. All bookings will show as "processing" initially.',
  },
];

// کامپوننت FAQ آیتم
const FAQItem = memo(({ faq, index, isOpen, onToggle }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all hover:border-gray-300">
      <button
        onClick={() => onToggle(index)}
        className="w-full px-6 py-4 text-left flex items-start gap-4 hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
          <HelpCircle className="w-4 h-4 text-gray-600" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-gray-900 text-sm md:text-base">
            {faq.question}
          </span>
        </div>
        <ChevronDown
          className={`flex-shrink-0 w-5 h-5 text-gray-600 transition-transform duration-300 mt-0.5 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        id={`faq-answer-${index}`}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-4 pl-16">
            <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

FAQItem.displayName = "FAQItem";

// کامپوننت Empty State
const EmptyState = memo(() => (
  <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
      <HelpCircle className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">No FAQs Available</h3>
    <p className="text-sm text-gray-600">
      Please check back later for frequently asked questions.
    </p>
  </div>
));

EmptyState.displayName = "EmptyState";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [language, setLanguage] = useState({ code: "en" }); // مدیریت زبان ساده

  const toggleFAQ = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow py-12 mt-[13vw] md:mt-[10vw] px-4 md:px-[10vw]">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Find answers to common questions about our services, booking process, and policies.
            </p>
          </div>

          {/* FAQ List */}
          {faqs.length > 0 ? (
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={toggleFAQ}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}

          {/* Contact CTA */}
          {faqs.length > 0 && (
            <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Still have questions?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Can't find the answer you're looking for? Please reach out to our support team.
                </p>
                <a
                  href={`/${language.code}/contact`}
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
