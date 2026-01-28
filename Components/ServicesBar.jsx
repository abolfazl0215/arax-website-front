"use client";
import { useState, useEffect } from "react";
import { X, Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import useDataStore from "../stores/useDataStore"; // مسیر store را به درستی تنظیم کنید
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const ServicesBar = () => {
  const t = useTranslations("Navigation");
  const home = useTranslations("HomePage");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [activeTab, setActiveTab] = useState("tours");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [showContactModal, setShowContactModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [errors, setErrors] = useState({});

  // دریافت داده‌ها از store
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

  // بارگذاری داده‌ها هنگام mount
  useEffect(() => {
    fetchTours();
    fetchStays();
    fetchTransfers();
  }, [fetchTours, fetchStays, fetchTransfers]);

  // تاریخ امروز برای محدود کردن انتخاب تاریخ‌های گذشته
  const today = new Date().toISOString().split("T")[0];

  // استخراج location های یونیک از داده‌ها
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

  // استخراج category های یونیک
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

      if (!checkIn) {
        newErrors.checkIn = "Please select check-in date";
      }
      if (!checkOut) {
        newErrors.checkOut = "Please select check-out date";
      }
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

      if (!startingDate) {
        newErrors.startingDate = "Please select starting date";
      }
      if (!endingDate) {
        newErrors.endingDate = "Please select ending date";
      }
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

      if (!transferWhen) {
        newErrors.transferWhen = "Please select a date";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // فیلتر کردن نتایج بر اساس انتخاب کاربر
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
        results = transfers; // همه ترانسفرها را نشان می‌دهیم
      }

      setSearchResults(results);
      setShowModal(true);
    }, 1000);
  };

  const handleBooking = (item) => {
    setSelectedItem(item);
    toggleBookingModal();
  };

  return (
    <motion.section
      ref={ref}
      className="px-[4vw] md:px-[8vw] pb-[19vw] md:py-[5vw] md:pb-[8vw]"
      initial={{ opacity: 0, y: 50 }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
      }
      transition={{ duration: 0.6, ease: "easeOut" }}>
      <motion.div
        className="bg-white w-full rounded-xl pt-3 pb-6 px-4 sm:px-6 md:px-8 shadow-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}>
        {/* Tabs */}
        <motion.ul
          className="flex flex-wrap gap-2 sm:gap-6 md:gap-10 justify-center items-center border-b border-gray-200 text-[#4B4B4B] pb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={
            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
          }
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}>
          <li
            onClick={() => setActiveTab("stays")}
            className={`cursor-pointer transition-all hover:text-teal-600 rounded-lg p-1 px-3 sm:px-5 text-sm sm:text-base ${
              activeTab === "stays" ? "bg-teal-900/7 text-black " : ""
            }`}>
            {home("stays")}
          </li>
          <li
            onClick={() => setActiveTab("tours")}
            className={`cursor-pointer transition-all hover:text-teal-600 rounded-lg p-1 px-3 sm:px-5 text-sm sm:text-base ${
              activeTab === "tours" ? "bg-teal-900/7 text-black " : ""
            }`}>
            {home("tours")}
          </li>
          <li
            onClick={() => setActiveTab("transfers")}
            className={`cursor-pointer transition-all hover:text-teal-600 rounded-lg p-1 px-3 sm:px-5 text-sm sm:text-base ${
              activeTab === "transfers"
                ? "bg-teal-900/7 text-black "
                : ""
            }`}>
            {home("transfers")}
          </li>
        </motion.ul>

        {/* Stays Tab */}
        {activeTab === "stays" && (
          <motion.div
            className="mt-6 md:mt-8 flex flex-col md:flex-row gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}>
            <div className="flex-1 w-full">
              <label
                htmlFor="staysType"
                className="text-sm text-gray-700 block">
                {home("staysType")}
              </label>
              <select
                className="border w-full border-slate-300 p-2 rounded-lg px-2 mt-2 capitalize"
                name="staysType"
                id="staysType">
                {staysTypes.map((type) => (
                  <option
                    key={type}
                    value={type.toLowerCase()}
                    className="capitalize">
                    {type}
                  </option>
                ))}
              </select>
              <p className="text-xs mt-1 h-[20px] opacity-0">
                Placeholder
              </p>
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="staysLocation"
                className="text-sm text-gray-700 block">
                {home("whereAreYouGoing")}
              </label>
              <select
                className="border w-full border-slate-300 p-2 rounded-lg px-2 mt-2"
                name="staysLocation"
                id="staysLocation">
                {staysLocations.map((location) => (
                  <option
                    key={location}
                    value={location.toLowerCase()}>
                    {location}
                  </option>
                ))}
              </select>
              <p className="text-xs mt-1 h-[20px] opacity-0">
                Placeholder
              </p>
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="checkIn"
                className="text-sm text-gray-700 block">
                {home("checkIn")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="checkIn"
                min={today}
                className={`border w-full mt-2 p-2 rounded-lg ${
                  errors.checkIn
                    ? "border-red-500"
                    : "border-slate-300"
                }`}
              />
              <p
                className={`text-xs mt-1 h-[20px] ${errors.checkIn ? "text-red-500" : "opacity-0"}`}>
                {errors.checkIn || "Placeholder"}
              </p>
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="checkOut"
                className="text-sm text-gray-700 block">
                {home("checkOut")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="checkOut"
                min={today}
                className={`border w-full mt-2 p-2 rounded-lg ${
                  errors.checkOut
                    ? "border-red-500"
                    : "border-slate-300"
                }`}
              />
              <p
                className={`text-xs mt-1 h-[20px] ${errors.checkOut ? "text-red-500" : "opacity-0"}`}>
                {errors.checkOut || "Placeholder"}
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={handleSearch}
                disabled={loading || staysLoading}
                className="bg-gradient-to-r from-blue-400 to-blue-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed h-[42px] flex items-center justify-center mt-[30px]">
                {loading || staysLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  home("search")
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Tours Tab */}
        {activeTab === "tours" && (
          <motion.div
            className="mt-6 md:mt-8 flex flex-col md:flex-row gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}>
            <div className="flex-1 w-full">
              <label
                htmlFor="tourType"
                className="text-sm text-gray-700 block">
                {home("tourType")}
              </label>
              <select
                className="border w-full border-slate-300 p-2 rounded-lg px-2 mt-2"
                name="tourType"
                id="tourType">
                {tourTypes.map((type) => (
                  <option key={type} value={type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </select>
              <p className="text-xs mt-1 h-[20px] opacity-0">
                Placeholder
              </p>
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="tourLocation"
                className="text-sm text-gray-700 block">
                {home("whereAreYouGoing")}
              </label>
              <select
                className="border w-full border-slate-300 p-2 rounded-lg px-2 mt-2"
                name="tourLocation"
                id="tourLocation">
                {tourLocations.map((location) => (
                  <option
                    key={location}
                    value={location.toLowerCase()}>
                    {location}
                  </option>
                ))}
              </select>
              <p className="text-xs mt-1 h-[20px] opacity-0">
                Placeholder
              </p>
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="startingDate"
                className="text-sm text-gray-700 block">
                {home("startingDate")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="startingDate"
                min={today}
                className={`border w-full mt-2 p-2 rounded-lg ${
                  errors.startingDate
                    ? "border-red-500"
                    : "border-slate-300"
                }`}
              />
              <p
                className={`text-xs mt-1 h-[20px] ${errors.startingDate ? "text-red-500" : "opacity-0"}`}>
                {errors.startingDate || "Placeholder"}
              </p>
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="endingDate"
                className="text-sm text-gray-700 block">
                {home("endingDate")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="endingDate"
                min={today}
                className={`border w-full mt-2 p-2 rounded-lg ${
                  errors.endingDate
                    ? "border-red-500"
                    : "border-slate-300"
                }`}
              />
              <p
                className={`text-xs mt-1 h-[20px] ${errors.endingDate ? "text-red-500" : "opacity-0"}`}>
                {errors.endingDate || "Placeholder"}
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={handleSearch}
                disabled={loading || toursLoading}
                className="bg-gradient-to-r from-blue-400 to-blue-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed h-[42px] flex items-center justify-center mt-[30px]">
                {loading || toursLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  home("search")
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Transfers Tab */}
        {activeTab === "transfers" && (
          <motion.div
            className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-end gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}>
            <div className="flex-1 w-full">
              <label
                htmlFor="transferFrom"
                className="text-sm text-gray-700">
                {home("from")}
              </label>
              <select
                className="border w-full border-slate-300 p-2 rounded-lg px-2 mt-2"
                name="transferFrom"
                id="transferFrom">
                {transferLocations.map((location) => (
                  <option
                    key={location}
                    value={location.toLowerCase()}>
                    {location}
                  </option>
                ))}
              </select>
              <p className=" text-xs mt-1 min-h-[16px]"></p>
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="transferTo"
                className="text-sm text-gray-700">
                {home("to")}
              </label>
              <select
                className="border w-full border-slate-300 p-2 rounded-lg px-2 mt-2"
                name="transferTo"
                id="transferTo">
                {transferLocations.map((location) => (
                  <option
                    key={location}
                    value={location.toLowerCase()}>
                    {location}
                  </option>
                ))}
              </select>
              <p className=" text-xs mt-1 min-h-[16px]"></p>
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="transferWhen"
                className="text-sm text-gray-700">
                {home("when")} <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="transferWhen"
                min={today}
                className={`border w-full mt-2 p-2 rounded-lg ${
                  errors.transferWhen
                    ? "border-red-500"
                    : "border-slate-300"
                }`}
              />
              {errors.transferWhen && (
                <p className="text-red-500 text-xs mt-1 min-h-[16px]">
                  {errors.transferWhen}
                </p>
              )}
              {!errors.transferWhen && (
                <div className="min-h-[16px] mt-1"></div>
              )}
            </div>
            <div>
              <button
                onClick={handleSearch}
                disabled={loading || transfersLoading}
                className="bg-gradient-to-r from-blue-400 to-blue-500 cursor-pointer text-white px-6 p-2 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed h-[42px] flex items-center justify-center">
                {loading || transfersLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  home("search")
                )}
              </button>
              <p className=" text-xs mt-1 min-h-[16px]"></p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Results Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-3xl bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">
                {activeTab === "stays" &&
                  `Available Stays (${searchResults.length})`}
                {activeTab === "tours" &&
                  `Available Tours (${searchResults.length})`}
                {activeTab === "transfers" &&
                  `Available Transfers (${searchResults.length})`}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 transition">
                <X size={24} />
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
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
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
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">
                          {item.name}
                        </h3>

                        {activeTab === "stays" && (
                          <>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <MapPin size={16} />
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
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                {item.category || "Tour"}
                              </span>
                              <MapPin size={14} />
                              <span className="line-clamp-1">
                                {item.location}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
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
                            <div className="text-sm text-gray-600 mb-3">
                              <p className="mb-1">
                                <span className="font-medium">
                                  Passengers:
                                </span>{" "}
                                {item.passengers || "N/A"}
                              </p>
                              <p className="mb-1">
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

                        <div className="flex items-center justify-between mt-4">
                          <span className="text-2xl font-bold text-blue-600">
                            {activeTab === "stays" &&
                            item.price &&
                            item.price[0]
                              ? `$${item.price[0].from}-${item.price[0].to}`
                              : activeTab === "tours" &&
                                  item.price &&
                                  item.price[0]
                                ? `$${item.price[0].price}`
                                : activeTab === "transfers" &&
                                    item.pricePerKm
                                  ? `$${item.pricePerKm}/km`
                                  : "Contact for price"}
                          </span>
                          <button
                            onClick={() => handleBooking(item)}
                            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-blue-500 hover:to-blue-600 transition">
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
    </motion.section>
  );
};

export default ServicesBar;
