"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Car,
  Users,
  Shield,
  Clock,
  X,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import useDataStore from "../../../stores/useDataStore"; // مسیر store را به درستی تنظیم کنید

const locations = [
  "Tatev Ropeway",
  "Sevan Lake",
  "Zvartnots Airport",
  "Echmiadzin",
  "Yerevan",
  "Dilijan",
  "Tsaghkadzor",
  "Gyumri",
  "Amberd",
  "Jermuk",
  "Tbilisi",
  "Aghveran",
  "Bjni",
];

const TransferPage = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    when: "",
  });
  const [searchLoading, setSearchLoading] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  // دریافت داده‌ها و توابع از store
  const {
    transfers,
    transfersLoading,
    transfersError,
    fetchTransfers,
    toggleBookingModal
  } = useDataStore();

  // بارگذاری ترانسفرها هنگام mount شدن کامپوننت
  useEffect(() => {
    fetchTransfers();
  }, [fetchTransfers]);

  // تاریخ امروز برای محدود کردن انتخاب تاریخ‌های گذشته
  const today = new Date().toISOString().slice(0, 16); // برای datetime-local

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // پاک کردن خطا هنگام تغییر
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = () => {
    // Validation
    const errors = {};
    if (!formData.from) {
      errors.from = "Please select pickup location";
    }
    if (!formData.to) {
      errors.to = "Please select destination";
    }
    if (!formData.when) {
      errors.when = "Please select date and time";
    }
    if (
      formData.from &&
      formData.to &&
      formData.from === formData.to
    ) {
      errors.to =
        "Destination must be different from pickup location";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // شروع جستجو با fake delay
    setSearchLoading(true);
    setFormErrors({});

    setTimeout(() => {
      // نمایش همه ترانسفرها (در واقعیت می‌توان فیلتر کرد)
      setSearchResults(transfers);
      setSearchLoading(false);
      setShowResultsModal(true);
    }, 1500); // 1.5 ثانیه delay
  };


  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      {/* Header Section */}
      <Navbar />

      <div className="px-4 md:px-[10vw] pt-8 md:pt-16 pb-8 mt-[10vw]">
        <h1 className="text-3xl md:text-[2.8vw] mt-[10vw] md:mt-0 font-bold mb-4 text-gray-900">
          Comfortable & Reliable Transfer Service
        </h1>
        <p className="text-slate-600 text-sm md:text-base max-w-3xl leading-relaxed">
          Travel in comfort and style with our professional transfer
          service. Whether you need airport transfers, city-to-city
          transportation, or tours to popular destinations, we provide
          safe, reliable, and affordable transfers throughout Armenia
          and neighboring regions. Our experienced drivers ensure a
          smooth journey in well-maintained vehicles.
        </p>
      </div>

      {/* Booking Form Section */}
      <div className="px-4 md:px-[10vw] pb-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Car className="w-7 h-7 text-blue-500" />
            Book Your Transfer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* From */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                From <span className="text-red-500">*</span>
              </label>
              <select
                name="from"
                value={formData.from}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white text-gray-700 ${
                  formErrors.from
                    ? "border-red-500"
                    : "border-gray-200"
                }`}>
                <option value="">Select pickup location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {formErrors.from && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.from}
                </p>
              )}
            </div>

            {/* To */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-500" />
                To <span className="text-red-500">*</span>
              </label>
              <select
                name="to"
                value={formData.to}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white text-gray-700 ${
                  formErrors.to ? "border-red-500" : "border-gray-200"
                }`}>
                <option value="">Select destination</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {formErrors.to && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.to}
                </p>
              )}
            </div>

            {/* When */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-500" />
                When <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="when"
                value={formData.when}
                onChange={handleInputChange}
                min={today}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white text-gray-700 ${
                  formErrors.when
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              />
              {formErrors.when && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.when}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-3">
              <button
                onClick={handleSubmit}
                disabled={searchLoading}
                className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2">
                {searchLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  "Search Available Transfers"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results Modal */}
      {showResultsModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-3xl bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Available Vehicles ({searchResults.length})
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.from} → {formData.to} •{" "}
                  {new Date(formData.when).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setShowResultsModal(false)}
                className="text-gray-500 hover:text-gray-700 transition">
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-6">
              {searchResults.length === 0 ? (
                <div className="text-center py-12">
                  <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    No vehicles available for this route.
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Please try different locations or contact us
                    directly.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((vehicle) => (
                    <div
                      key={vehicle._id}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                      {/* Vehicle Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={
                            vehicle.image ||
                            "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop"
                          }
                          alt={vehicle.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                          ${vehicle.pricePerKm || 0}/km
                        </div>
                      </div>

                      {/* Vehicle Details */}
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">
                          {vehicle.name}
                        </h3>

                        {/* Specs */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span>
                              {vehicle.passengers || "N/A"} Passengers
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span>
                              {vehicle.releaseYear || "N/A"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span>
                              {vehicle.insurance
                                ? "Full Coverage"
                                : "Basic"}
                            </span>
                          </div>
                        </div>

                        {/* Features */}
                        {vehicle.features &&
                          vehicle.features.length > 0 && (
                            <div className="mb-4">
                              <div className="flex flex-wrap gap-1.5">
                                {vehicle.features
                                  .slice(0, 3)
                                  .map((feature, index) => (
                                    <span
                                      key={index}
                                      className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                                      {feature}
                                    </span>
                                  ))}
                                {vehicle.features.length > 3 && (
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                    +{vehicle.features.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                        {/* Select Button */}
                        <button
                          onClick={toggleBookingModal}
                          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                          Select Vehicle
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {transfersLoading && (
        <div className="px-4 md:px-[10vw] py-12">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        </div>
      )}

      {/* Error State */}
      {transfersError && (
        <div className="px-4 md:px-[10vw] py-12">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Error loading transfers: {transfersError}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Our Vehicles Section */}
      {!transfersLoading && !transfersError && (
        <div className="px-4 md:px-[10vw] py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
            <Car className="w-8 h-8 text-blue-500" />
            Our Vehicles
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl">
            Choose from our fleet of modern, comfortable, and
            well-maintained vehicles. All vehicles are regularly
            serviced and equipped with safety features.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transfers.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                {/* Vehicle Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={
                      vehicle.image ||
                      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop"
                    }
                    alt={vehicle.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                    ${vehicle.pricePerKm || 0}/km
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {vehicle.name}
                  </h3>

                  {/* Specs */}
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-sm">
                        Passengers:
                      </span>
                      <span className="text-sm">
                        {vehicle.passengers || "N/A"} Passengers
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-sm">
                        Release Year:
                      </span>
                      <span className="text-sm">
                        {vehicle.releaseYear || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <Shield className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-sm">
                        Insurance:
                      </span>
                      <span className="text-sm">
                        {vehicle.insurance
                          ? "Full Coverage"
                          : "Basic Coverage"}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  {vehicle.features &&
                    vehicle.features.length > 0 && (
                      <div className="mb-5">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Features:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {vehicle.features.map((feature, index) => (
                            <span
                              key={index}
                              className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Book Button */}
                  <button
                    onClick={toggleBookingModal}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Select Vehicle
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {transfers.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No vehicles available at the moment.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Why Choose Us Section */}
      <div className="px-4 md:px-[10vw] py-12 bg-gradient-to-r from-blue-50 to-cyan-50">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Why Choose Our Transfer Service?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">
              Safe & Reliable
            </h3>
            <p className="text-sm text-gray-600">
              Professional drivers with years of experience
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">
              24/7 Service
            </h3>
            <p className="text-sm text-gray-600">
              Available anytime, day or night
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">
              Modern Fleet
            </h3>
            <p className="text-sm text-gray-600">
              Well-maintained and comfortable vehicles
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">
              Flexible Options
            </h3>
            <p className="text-sm text-gray-600">
              Solo, family, or group transfers
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TransferPage;
