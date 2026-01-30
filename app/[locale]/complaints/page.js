"use client";

import { useState } from "react";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";

export default function ComplaintsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingReference: "",
    complaint: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ state برای لودینگ

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ✅ شبیه‌سازی ارسال به سرور با تأخیر 2 ثانیه
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // ✅ شبیه‌سازی پاسخ موفق سرور
    console.log("📤 Sending complaint to server:", formData);

    setIsSubmitting(false);
    setSubmitted(true);

    // ✅ بعد از 4 ثانیه فرم را ریست کن
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        bookingReference: "",
        complaint: "",
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow pt-40 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center md:text-left">
            Submit a Complaint
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8">
            {submitted ? (
              // ✅ پیام موفقیت
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Complaint Submitted Successfully!
                </h2>

                <p className="text-gray-600 text-sm sm:text-base">
                  We have received your complaint and will contact you
                  within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    disabled={isSubmitting}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    disabled={isSubmitting}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Booking Ref */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Booking Reference (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.bookingReference}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bookingReference: e.target.value,
                      })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Complaint */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Complaint Details
                  </label>
                  <textarea
                    rows="6"
                    value={formData.complaint}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        complaint: e.target.value,
                      })
                    }
                    disabled={isSubmitting}
                    required
                    placeholder="Please describe your complaint in detail..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                {/* ✅ دکمه ارسال با لودینگ */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 active:scale-[0.98] transition disabled:bg-teal-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer">
                  {isSubmitting ? (
                    <>
                      {/* ✅ Spinner انیمیشن */}
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    "Submit Complaint"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
