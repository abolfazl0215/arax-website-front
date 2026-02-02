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
} from "lucide-react";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import useDataStore from "../../../stores/useDataStore";
import { useLanguageStore } from "../../../stores/useLanguageStore";
import { useTranslations } from "next-intl";

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

  const transferss = useTranslations("Transfers");
  const {
    transfers,
    transfersLoading,
    transfersError,
    fetchTransfers,
    toggleBookingModal,
  } = useDataStore();
  const { currency } = useLanguageStore();

  useEffect(() => {
    fetchTransfers();
  }, [fetchTransfers]);

  const today = new Date().toISOString().slice(0, 16);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = () => {
    const errors = {};
    if (!formData.from) errors.from = "Please select pickup location";
    if (!formData.to) errors.to = "Please select destination";
    if (!formData.when) errors.when = "Please select date and time";
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

    setSearchLoading(true);
    setFormErrors({});

    setTimeout(() => {
      setSearchResults(transfers);
      setSearchLoading(false);
      setShowResultsModal(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
          {transferss("title1")}
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-3xl">
          {transferss("subTitle1")}
        </p>
      </div>

      {/* Booking Form Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Car className="w-5 h-5 text-gray-700" />
            {transferss("bookYourTransfer")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* From */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {transferss("from")}{" "}
                <span className="text-red-600">*</span>
              </label>
              <select
                name="from"
                value={formData.from}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
                  ${formErrors.from ? "border-red-500" : "border-gray-300"}
                `}>
                <option value="">Select pickup location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {formErrors.from && (
                <p className="text-red-600 text-xs mt-1">
                  {formErrors.from}
                </p>
              )}
            </div>

            {/* To */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {transferss("to")}{" "}
                <span className="text-red-600">*</span>
              </label>
              <select
                name="to"
                value={formData.to}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
                  ${formErrors.to ? "border-red-500" : "border-gray-300"}
                `}>
                <option value="">Select destination</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {formErrors.to && (
                <p className="text-red-600 text-xs mt-1">
                  {formErrors.to}
                </p>
              )}
            </div>

            {/* When */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {transferss("when")}{" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                type="datetime-local"
                name="when"
                value={formData.when}
                onChange={handleInputChange}
                min={today}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
                  ${formErrors.when ? "border-red-500" : "border-gray-300"}
                `}
              />
              {formErrors.when && (
                <p className="text-red-600 text-xs mt-1">
                  {formErrors.when}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-3">
              <button
                onClick={handleSubmit}
                disabled={searchLoading}
                className="w-full md:w-auto px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm">
                {searchLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Available Vehicles ({searchResults.length})
                </h2>
                <p className="text-xs text-gray-600 mt-0.5">
                  {formData.from} → {formData.to} •{" "}
                  {new Date(formData.when).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setShowResultsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-6">
              {searchResults.length === 0 ? (
                <div className="text-center py-12">
                  <Car className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    No vehicles available for this route.
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Please try different locations or contact us
                    directly.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((vehicle) => (
                    <div
                      key={vehicle._id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={
                            vehicle.image ||
                            "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop"
                          }
                          alt={vehicle.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-md text-xs font-semibold text-gray-900 shadow-sm">
                          {(() => {
                            const matchedPrice =
                              vehicle.pricePerKm.find(
                                (p) => p.currency === currency.code,
                              );
                            return matchedPrice ? (
                              <span>
                                {matchedPrice.price}
                                {currency.symbol}/km
                              </span>
                            ) : null;
                          })()}
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-1">
                        <div className="flex flex-col gap-4 flex-1 ">
                          <h3 className="text-base font-semibold text-gray-900 mb-3 line-clamp-1">
                            {vehicle.name}
                          </h3>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Users className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>
                                {vehicle.passengers || "N/A"}{" "}
                                Passengers
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>
                                {vehicle.releaseYear || "N/A"}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Shield className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>
                                {vehicle.insurance
                                  ? "Full Coverage"
                                  : "Basic"}
                              </span>
                            </div>
                          </div>

                          {vehicle.features &&
                            vehicle.features.length > 0 && (
                              <div className="mb-4">
                                <div className="flex flex-wrap gap-1.5">
                                  {vehicle.features
                                    .slice(0, 3)
                                    .map((feature, index) => (
                                      <span
                                        key={index}
                                        className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                        {feature}
                                      </span>
                                    ))}
                                  {vehicle.features.length > 3 && (
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                      +{vehicle.features.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                        <button
                          onClick={toggleBookingModal}
                          className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm mt-auto">
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
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-3 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
        </div>
      )}

      {/* Error State */}
      {transfersError && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">
              Error loading transfers: {transfersError}
            </p>
          </div>
        </div>
      )}

      {/* Our Vehicles Section */}
      {!transfersLoading && !transfersError && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 pb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Car className="w-6 h-6" />
            {transferss("title2")}
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            {transferss("subTitle2")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {transfers.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow flex flex-col h-full">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={
                      vehicle.image ||
                      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop"
                    }
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-md text-xs font-semibold text-gray-900 shadow-sm">
                    {(() => {
                      const matchedPrice = vehicle.pricePerKm.find(
                        (p) => p.currency === currency.code,
                      );
                      return matchedPrice ? (
                        <span>
                          {matchedPrice.price}
                          {currency.symbol}/km
                        </span>
                      ) : null;
                    })()}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex flex-col gap-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-1">
                      {vehicle.name}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Users className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="font-medium">
                          {transferss("passengers")}:
                        </span>
                        <span>{vehicle.passengers || "N/A"}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="font-medium">
                          {transferss("releaseYear")}:
                        </span>
                        <span>{vehicle.releaseYear || "N/A"}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Shield className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="font-medium">
                          {transferss("Insurance")}:
                        </span>
                        <span>
                          {vehicle.insurance
                            ? "Full Coverage"
                            : "Basic"}
                        </span>
                      </div>
                    </div>

                    {vehicle.features &&
                      vehicle.features.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-medium text-gray-700 mb-2">
                            {transferss("Features")}:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {vehicle.features.map(
                              (feature, index) => (
                                <span
                                  key={index}
                                  className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                  {feature}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                  </div>

                  <button
                    onClick={toggleBookingModal}
                    className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm mt-auto">
                    {transferss("selectVehicle")}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {transfers.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">
                No vehicles available at the moment.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Why Choose Us Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 text-center">
            {transferss("why")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                Icon: Shield,
                title: "whyTitle1",
                desc: "whyDesc1",
                color: "bg-gray-900",
              },
              {
                Icon: Clock,
                title: "whyTitle2",
                desc: "whyDesc2",
                color: "bg-gray-700",
              },
              {
                Icon: Car,
                title: "whyTitle3",
                desc: "whyDesc3",
                color: "bg-gray-800",
              },
              {
                Icon: Users,
                title: "whyTitle4",
                desc: "whyDesc4",
                color: "bg-gray-600",
              },
            ].map(({ Icon, title, desc, color }) => (
              <div key={title} className="text-center">
                <div
                  className={`w-14 h-14 ${color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">
                  {transferss(title)}
                </h3>
                <p className="text-sm text-gray-600">
                  {transferss(desc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TransferPage;
