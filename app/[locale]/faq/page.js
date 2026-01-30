"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";

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

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 mt-[13vw] px-4 md:px-[5vw]">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h1>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className={`px-6 overflow-hidden transition-all duration-500 ease-in-out`}
                  style={{
                    maxHeight:
                      openIndex === index
                        ? `${contentRefs.current[index]?.scrollHeight}px`
                        : "0px",
                  }}>
                  <p className="text-gray-700 py-4">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
