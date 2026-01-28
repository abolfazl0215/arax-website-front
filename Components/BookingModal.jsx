"use client";

import React from "react";
import { X, Phone, Mail, Globe, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useDataStore from "../stores/useDataStore";

const BookingModal = () => {
  const { isOpenBookingModal, toggleBookingModal } = useDataStore();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleBookingModal();
    }
  };

  const defaultContactInfo = {
    phone: "+1 (555) 123-4567",
    email: "booking@example.com",
    website: "www.example.com",
    whatsapp: "+1 (555) 123-4567",
    telegram: "@examplebooking",
  };

  const contacts = defaultContactInfo;

  return (
    <AnimatePresence>
      {isOpenBookingModal && (
        // Backdrop
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-3xl"
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          {/* Modal Content */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8"
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}>
            {/* Close Button */}
            <button
              onClick={toggleBookingModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal">
              <X size={24} />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Book with Us
              </h2>
              <p className="text-gray-600">
                Contact us to make your reservation
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              {/* Phone */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a
                    href={`tel:${contacts.phone}`}
                    className="text-gray-800 font-medium hover:text-blue-600 transition-colors">
                    {contacts.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircle
                    size={20}
                    className="text-green-600"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">WhatsApp</p>
                  <a
                    href={`https://wa.me/${contacts.whatsapp.replace(
                      /[^0-9]/g,
                      "",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 font-medium hover:text-green-600 transition-colors">
                    {contacts.whatsapp}
                  </a>
                </div>
              </div>

              {/* Telegram */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageCircle
                    size={20}
                    className="text-blue-500"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telegram</p>
                  <a
                    href={`https://t.me/${contacts.telegram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 font-medium hover:text-blue-500 transition-colors">
                    {contacts.telegram}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Mail size={20} className="text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a
                    href={`mailto:${contacts.email}`}
                    className="text-gray-800 font-medium hover:text-red-600 transition-colors">
                    {contacts.email}
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Globe size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a
                    href={`https://${contacts.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 font-medium hover:text-purple-600 transition-colors">
                    {contacts.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                We look forward to serving you!
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
