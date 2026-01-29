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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        bookingReference: "",
        complaint: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* ✅ فاصله استاندارد از ناوبار */}
      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        {/* ✅ محدود کردن عرض برای خوانایی */}
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center md:text-left">
            Submit a Complaint
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  Complaint Submitted
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
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
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
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
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
                    required
                    placeholder="Please describe your complaint in detail..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 active:scale-[0.98] transition">
                  Submit Complaint
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
