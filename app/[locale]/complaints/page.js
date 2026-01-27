/**
 * Complaints Page
 * Customer complaints and feedback form
 */

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12  md:mx-[10vw] mt-[15vw] md:mt-[10vw]">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Submit a Complaint
          </h1>

          <div className="bg-white rounded-lg shadow-md p-8">
            {submitted ? (
              <div className="text-center py-8">
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Complaint Submitted
                </h2>
                <p className="text-gray-600">
                  We have received your complaint and will get back to
                  you within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complaint Details
                  </label>
                  <textarea
                    rows="8"
                    value={formData.complaint}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        complaint: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                    placeholder="Please describe your complaint in detail..."></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors font-medium">
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
