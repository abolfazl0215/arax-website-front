"use client";
import { useState, useEffect } from "react";
import { X, MapPin, Calendar, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import useDataStore from "../stores/useDataStore";
import { useLanguageStore } from "../stores/useLanguageStore";

const ServicesBar = () => {
  const t = useTranslations("Navigation");
  const home = useTranslations("HomePage");

  const [activeTab, setActiveTab] = useState("tours");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [errors, setErrors] = useState({});

  const {
    tours,
    stays,
    transfers,
    fetchTours,
    fetchStays,
    fetchTransfers,
    toursLoading,
    staysLoading,
    transfersLoading,
    toggleBookingModal,
  } = useDataStore();
  const { currency } = useLanguageStore();

  useEffect(() => {
    fetchTours();
    fetchStays();
    fetchTransfers();
  }, [fetchTours, fetchStays, fetchTransfers]);

  const today = new Date().toISOString().split("T")[0];

  const tourLocations = [
    "All",
    ...new Set(tours.map((tour) => tour.location).filter(Boolean)),
  ];
  const staysLocations = [
    "All",
    ...new Set(stays.map((stay) => stay.address).filter(Boolean)),
  ];
  const transferLocations = [
    "All Locations",
    "Yerevan",
    "Zvartnots Airport",
    "Sevan Lake",
    "Gyumri",
    "Dilijan",
  ];

  const tourTypes = [
    "All",
    ...new Set(tours.map((tour) => tour.category).filter(Boolean)),
  ];
  const staysTypes = [
    "All",
    ...new Set(stays.map((stay) => stay.type).filter(Boolean)),
  ];

  const handleSearch = () => {
    setErrors({});
    let newErrors = {};

    if (activeTab === "stays") {
      const checkIn = document.getElementById("checkIn").value;
      const checkOut = document.getElementById("checkOut").value;

      if (!checkIn) newErrors.checkIn = "Please select check-in date";
      if (!checkOut)
        newErrors.checkOut = "Please select check-out date";
      if (
        checkIn &&
        checkOut &&
        new Date(checkIn) >= new Date(checkOut)
      ) {
        newErrors.checkOut =
          "Check-out date must be after check-in date";
      }
    } else if (activeTab === "tours") {
      const startingDate =
        document.getElementById("startingDate").value;
      const endingDate = document.getElementById("endingDate").value;

      if (!startingDate)
        newErrors.startingDate = "Please select starting date";
      if (!endingDate)
        newErrors.endingDate = "Please select ending date";
      if (
        startingDate &&
        endingDate &&
        new Date(startingDate) >= new Date(endingDate)
      ) {
        newErrors.endingDate =
          "Ending date must be after starting date";
      }
    } else if (activeTab === "transfers") {
      const transferWhen =
        document.getElementById("transferWhen").value;
      if (!transferWhen)
        newErrors.transferWhen = "Please select a date";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      let results = [];

      if (activeTab === "stays") {
        const staysType = document.getElementById("staysType").value;
        const staysLocation =
          document.getElementById("staysLocation").value;

        results = stays.filter((stay) => {
          const typeMatch =
            staysType === "all" || stay.type === staysType;
          const locationMatch =
            staysLocation === "all" ||
            stay.address?.includes(staysLocation);
          return typeMatch && locationMatch;
        });
      } else if (activeTab === "tours") {
        const tourType = document.getElementById("tourType").value;
        const tourLocation =
          document.getElementById("tourLocation").value;

        results = tours.filter((tour) => {
          const typeMatch =
            tourType === "all" || tour.category === tourType;
          const locationMatch =
            tourLocation === "all" ||
            tour.location?.includes(tourLocation);
          return typeMatch && locationMatch;
        });
      } else if (activeTab === "transfers") {
        results = transfers;
      }

      setSearchResults(results);
      setShowModal(true);
    }, 800);
  };

  const handleBooking = (item) => {
    setSelectedItem(item);
    toggleBookingModal();
  };

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200 mb-8 overflow-x-auto md:overflow-visible no-scrollbar">
            {["stays", "tours", "transfers"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm md:text-base font-medium transition-all relative ${
                  activeTab === tab
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}>
                {home(tab)}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>

          {/* Stays Form */}
          {activeTab === "stays" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {home("staysType")}
                </label>
                <select
                  id="staysType"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  {staysTypes.map((type) => (
                    <option key={type} value={type.toLowerCase()}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {home("whereAreYouGoing")}
                </label>
                <select
                  id="staysLocation"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  {staysLocations.map((location) => (
                    <option
                      key={location}
                      value={location.toLowerCase()}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {home("checkIn")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="checkIn"
                  min={today}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    errors.checkIn
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.checkIn && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.checkIn}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {home("checkOut")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="checkOut"
                  min={today}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    errors.checkOut
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.checkOut && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.checkOut}
                  </p>
                )}
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={loading || staysLoading}
                  className="w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm flex items-center justify-center gap-2">
                  {loading || staysLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      {home("search")}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Tours Form */}
          {activeTab === "tours" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {home("tourType")}
                </label>
                <select
                  id="tourType"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  {tourTypes.map((type) => (
                    <option key={type} value={type.toLowerCase()}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {home("whereAreYouGoing")}
                </label>
                <select
                  id="tourLocation"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  {tourLocations.map((location) => (
                    <option
                      key={location}
                      value={location.toLowerCase()}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {home("startingDate")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="startingDate"
                  min={today}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    errors.startingDate
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.startingDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.startingDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {home("endingDate")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="endingDate"
                  min={today}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    errors.endingDate
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.endingDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.endingDate}
                  </p>
                )}
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={loading || toursLoading}
                  className="w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm flex items-center justify-center gap-2">
                  {loading || toursLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      {home("search")}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Transfers Form */}
          {activeTab === "transfers" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {home("from")}
                </label>
                <select
                  id="transferFrom"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  {transferLocations.map((location) => (
                    <option
                      key={location}
                      value={location.toLowerCase()}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {home("to")}
                </label>
                <select
                  id="transferTo"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  {transferLocations.map((location) => (
                    <option
                      key={location}
                      value={location.toLowerCase()}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {home("when")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="transferWhen"
                  min={today}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    errors.transferWhen
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.transferWhen && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.transferWhen}
                  </p>
                )}
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={loading || transfersLoading}
                  className="w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm flex items-center justify-center gap-2">
                  {loading || transfersLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      {home("search")}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4"
          onClick={() => setShowModal(false)}>
          <div
            className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {activeTab === "stays" &&
                  `Available Stays (${searchResults.length})`}
                {activeTab === "tours" &&
                  `Available Tours (${searchResults.length})`}
                {activeTab === "transfers" &&
                  `Available Transfers (${searchResults.length})`}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-6">
              {searchResults.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No results found. Please try different search
                    criteria.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.map((item) => (
                    <div
                      key={item._id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={
                          activeTab === "stays"
                            ? (item.images && item.images[0]) ||
                              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
                            : activeTab === "tours"
                              ? (item.images && item.images[0]) ||
                                "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop"
                              : item.image ||
                                "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop"
                        }
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">
                          {item.name}
                        </h3>

                        {activeTab === "stays" && (
                          <>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span className="line-clamp-1">
                                {item.address ||
                                  "Location not specified"}
                              </span>
                              {item.starsCount > 0 && (
                                <span className="ml-auto">
                                  ⭐ {item.starsCount}
                                </span>
                              )}
                            </div>
                            {item.included &&
                              item.included.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {item.included
                                    .slice(0, 3)
                                    .map((amenity, idx) => (
                                      <span
                                        key={idx}
                                        className="text-xs bg-gray-100 px-2 py-1 rounded">
                                        {amenity}
                                      </span>
                                    ))}
                                </div>
                              )}
                          </>
                        )}

                        {activeTab === "tours" && (
                          <>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                                {item.category || "Tour"}
                              </span>
                              <MapPin className="w-4 h-4" />
                              <span className="line-clamp-1">
                                {item.location}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                              {home("duration")}:{" "}
                              {item.duration || "N/A"}
                            </p>
                            {item.priceIncluded &&
                              item.priceIncluded.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {item.priceIncluded
                                    .slice(0, 3)
                                    .map((inc, idx) => (
                                      <span
                                        key={idx}
                                        className="text-xs bg-gray-100 px-2 py-1 rounded">
                                        {inc}
                                      </span>
                                    ))}
                                </div>
                              )}
                          </>
                        )}

                        {activeTab === "transfers" && (
                          <>
                            <div className="text-sm text-gray-600 mb-3 space-y-1">
                              <p>
                                <span className="font-medium">
                                  Passengers:
                                </span>{" "}
                                {item.passengers || "N/A"}
                              </p>
                              <p>
                                <span className="font-medium">
                                  Year:
                                </span>{" "}
                                {item.releaseYear || "N/A"}
                              </p>
                              <p>
                                <span className="font-medium">
                                  Insurance:
                                </span>{" "}
                                {item.insurance ? "✓ Yes" : "✗ No"}
                              </p>
                            </div>
                            {item.features &&
                              item.features.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {item.features
                                    .slice(0, 3)
                                    .map((feature, idx) => (
                                      <span
                                        key={idx}
                                        className="text-xs bg-gray-100 px-2 py-1 rounded">
                                        {feature}
                                      </span>
                                    ))}
                                </div>
                              )}
                          </>
                        )}

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                          <span className="text-lg font-bold text-blue-600">
                            {activeTab === "stays" &&
                            item.price &&
                            item.price[0]
                              ? (() => {
                                  const matchedPrice =
                                    item.price.find(
                                      (p) =>
                                        p.currency === currency.code,
                                    );
                                  return matchedPrice ? (
                                    <span>
                                      {matchedPrice.from}-
                                      {matchedPrice.to}
                                      {currency.symbol}
                                    </span>
                                  ) : null;
                                })()
                              : activeTab === "tours" &&
                                  item.price &&
                                  item.price[0]
                                ? (() => {
                                    const matchedPrice =
                                      item.price.find(
                                        (p) =>
                                          p.currency ===
                                          currency.code,
                                      );
                                    return matchedPrice ? (
                                      <span>
                                        {matchedPrice.price}{" "}
                                        {currency.symbol}
                                      </span>
                                    ) : null;
                                  })()
                                : activeTab === "transfers" &&
                                    item.pricePerKm
                                  ? (() => {
                                      const matchedPrice =
                                        item.pricePerKm.find(
                                          (p) =>
                                            p.currency ===
                                            currency.code,
                                        );
                                      return matchedPrice ? (
                                        <span>
                                          {matchedPrice.price}
                                          {currency.symbol}/km
                                        </span>
                                      ) : null;
                                    })()
                                  : "Contact for price"}
                          </span>
                          <button
                            onClick={() => handleBooking(item)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                            {home("bookNow")}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesBar;
