"use client";

import { useState, memo, useCallback } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";

// Memoized Contact Info Item
const ContactInfoItem = memo(
  ({ icon: Icon, title, content, href, isLink }) => (
    <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-gray-700" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">
          {title}
        </h3>
        {isLink ? (
          <a
            href={href}
            className="text-sm text-gray-900 hover:text-gray-700 transition-colors font-medium">
            {content}
          </a>
        ) : (
          <p className="text-sm text-gray-600 whitespace-pre-line">
            {content}
          </p>
        )}
      </div>
    </div>
  ),
);

ContactInfoItem.displayName = "ContactInfoItem";

// Memoized Success Message
const SuccessMessage = memo(() => (
  <div className="text-center py-12">
    <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
      <CheckCircle2 className="w-7 h-7 text-white" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      Message Sent Successfully!
    </h3>
    <p className="text-sm text-gray-600">
      Thank you for contacting us. We will get back to you within 24
      hours.
    </p>
  </div>
));

SuccessMessage.displayName = "SuccessMessage";

// Memoized Form Input
const FormInput = memo(
  ({
    label,
    type = "text",
    value,
    onChange,
    disabled,
    required = true,
    rows,
    placeholder,
  }) => {
    const isTextarea = type === "textarea";
    const Component = isTextarea ? "textarea" : "input";

    return (
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label}{" "}
          {required && <span className="text-red-500">*</span>}
        </label>
        <Component
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
  },
);

FormInput.displayName = "FormInput";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("📤 Sending message to server:", formData);

      setIsSubmitting(false);
      setSubmitted(true);

      // Reset form after 4 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 4000);
    },
    [formData],
  );

  const handleInputChange = useCallback(
    (field) => (e) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    },
    [],
  );

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "info@araxtour.com",
      href: "mailto:info@araxtour.com",
      isLink: true,
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      href: "tel:+15551234567",
      isLink: true,
    },
    {
      icon: MapPin,
      title: "Address",
      content: "123 Travel Street\nTourism City, TC 12345",
      isLink: false,
    },
    {
      icon: Clock,
      title: "Business Hours",
      content:
        "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
      isLink: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow py-12 px-4 md:px-[10vw] mt-[15vw] md:mt-[10vw]">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Contact Us
            </h1>
            <p className="text-gray-600">
              Have a question? We'd love to hear from you. Send us a
              message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-3">
                  {contactInfo.map((info, index) => (
                    <ContactInfoItem key={index} {...info} />
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Send us a Message
                </h2>

                {submitted ? (
                  <SuccessMessage />
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <FormInput
                      label="Name"
                      value={formData.name}
                      onChange={handleInputChange("name")}
                      disabled={isSubmitting}
                    />

                    <FormInput
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange("email")}
                      disabled={isSubmitting}
                    />

                    <FormInput
                      label="Message"
                      type="textarea"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange("message")}
                      disabled={isSubmitting}
                      placeholder="Tell us how we can help you..."
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
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      By submitting this form, you agree to our
                      privacy policy and terms of service.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
