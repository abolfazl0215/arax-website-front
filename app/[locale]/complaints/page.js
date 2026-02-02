"use client";

import { useState, memo, useCallback } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";

// Memoized Success Message
const SuccessMessage = memo(() => (
  <div className="text-center py-12">
    <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
      <CheckCircle2 className="w-7 h-7 text-white" />
    </div>
    <h2 className="text-xl font-semibold text-gray-900 mb-2">
      Complaint Submitted Successfully
    </h2>
    <p className="text-sm text-gray-600">
      We have received your complaint and will contact you within 48 hours.
    </p>
  </div>
));

SuccessMessage.displayName = "SuccessMessage";

// Memoized Form Input
const FormInput = memo(({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  disabled, 
  required = true,
  rows,
  placeholder,
  name
}) => {
  const isTextarea = type === "textarea";
  const Component = isTextarea ? "textarea" : "input";

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-900 mb-2">
        {label}
        {!required && <span className="text-gray-500 ml-1">(Optional)</span>}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Component
        id={name}
        name={name}
        type={!isTextarea ? type : undefined}
        rows={isTextarea ? rows : undefined}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all resize-none"
      />
    </div>
  );
});

FormInput.displayName = "FormInput";

export default function ComplaintsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingReference: "",
    complaint: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("📤 Sending complaint to server:", formData);

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset form after 4 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        bookingReference: "",
        complaint: "",
      });
    }, 4000);
  }, [formData]);

  const handleInputChange = useCallback((field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow py-12 px-4 md:px-[10vw] mt-[15vw] md:mt-[10vw]">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Submit a Complaint
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              We take your concerns seriously. Please provide details about your complaint and we'll respond within 48 hours.
            </p>
          </div>

          {/* Notice Banner */}
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-amber-800">
                All complaints are handled confidentially and reviewed by our customer service team.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
            {submitted ? (
              <SuccessMessage />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <FormInput
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  disabled={isSubmitting}
                />

                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  disabled={isSubmitting}
                />

                <FormInput
                  label="Booking Reference"
                  name="bookingReference"
                  value={formData.bookingReference}
                  onChange={handleInputChange("bookingReference")}
                  disabled={isSubmitting}
                  required={false}
                  placeholder="e.g., BK123456"
                />

                <FormInput
                  label="Complaint Details"
                  name="complaint"
                  type="textarea"
                  rows={6}
                  value={formData.complaint}
                  onChange={handleInputChange("complaint")}
                  disabled={isSubmitting}
                  placeholder="Please describe your complaint in detail..."
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Complaint</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By submitting this form, you consent to our privacy policy and terms of service.
                </p>
              </form>
            )}
          </div>

          {/* Help Section */}
          {!submitted && (
            <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                Need Immediate Assistance?
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-900">Phone:</span> +1 (555) 123-4567
                </p>
                <p>
                  <span className="font-medium text-gray-900">Email:</span> support@araxtour.com
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  Available Monday - Friday, 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}