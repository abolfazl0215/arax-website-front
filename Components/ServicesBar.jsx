"use client";
import { useState, useEffect } from "react";
import { X, Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import useDataStore from "../stores/useDataStore";
import { useLanguageStore } from "../stores/useLanguageStore";
import { motion, AnimatePresence } from "framer-motion";
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
    }, 1000);
  };

  const handleBooking = (item) => {
    setSelectedItem(item);
    toggleBookingModal();
  };

  return (
    <section className="w-full overflow-hidden">
      <motion.div
        ref={ref}
        className="px-[4vw] md:px-[8vw] pb-[19vw] md:py-[5vw] md:pb-[8vw]"
        initial={{ opacity: 0, y: 50 }}
        animate={
          isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
        }
        transition={{ duration: 0.6, ease: "easeOut" }}>
        <motion.div
          className="bg-white w-full rounded-xl pt-[4vw] md:pt-[1vw] pb-[4vw] md:pb-[1vw] px-[5vw] md:px-[3vw] shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}>
          {/* Tabs */}
          <motion.ul
            className="flex flex-wrap gap-[7vw] md:gap-[3vw] justify-center items-center border-b border-gray-200 text-[#4B4B4B] pb-[3vw] md:pb-[1vw]"
            initial={{ opacity: 0, y: -20 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
            }
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: "easeOut",
            }}>
            <li
              onClick={() => setActiveTab("stays")}
              className={`cursor-pointer transition-all hover:text-teal-600 rounded-lg p-[1.5vw] px-[4vw] md:p-[0.5vw] md:px-[1.5vw] text-[3.9vw] md:text-[1.1vw] ${
                activeTab === "stays"
                  ? "bg-teal-900/7 text-black "
                  : ""
              }`}>
              {home("stays")}
            </li>
            <li
              onClick={() => setActiveTab("tours")}
              className={`cursor-pointer transition-all hover:text-teal-600 rounded-lg p-[1.5vw] px-[4vw] md:p-[0.5vw] md:px-[1.5vw] text-[3.9vw] md:text-[1.1vw] ${
                activeTab === "tours"
                  ? "bg-teal-900/7 text-black "
                  : ""
              }`}>
              {home("tours")}
            </li>
            <li
              onClick={() => setActiveTab("transfers")}
              className={`cursor-pointer transition-all hover:text-teal-600 rounded-lg p-[1.5vw] px-[4vw] md:p-[0.5vw] md:px-[1.5vw] text-[3.9vw] md:text-[1.1vw] ${
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
              className="mt-[8vw] md:mt-[2vw] flex flex-col md:flex-row gap-[4vw] md:gap-[1.5vw]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}>
              <div className="flex-1 w-full">
                <label
                  htmlFor="staysType"
                  className="text-[4vw] md:text-[1vw] text-gray-700 block">
                  {home("staysType")}
                </label>
                <select
                  className="border w-full border-slate-300 p-[3vw] md:p-[0.5vw] rounded-lg px-[1vw] md:px-[0.5vw] mt-[2vw] md:mt-[0.5vw] capitalize text-[4vw] md:text-[1vw]"
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
                <p className="text-[2.5vw] md:text-[0.75vw] mt-[0.5vw] h-[4vw] md:h-[1.2vw] opacity-0">
                  Placeholder
                </p>
              </div>
              <div className="flex-1 w-full">
                <label
                  htmlFor="staysLocation"
                  className="text-[4vw] md:text-[1vw] text-gray-700 block">
                  {home("whereAreYouGoing")}
                </label>
                <select
                  className="border w-full border-slate-300 p-[3vw] md:p-[0.5vw] rounded-lg px-[1vw] md:px-[0.5vw] mt-[2vw] md:mt-[0.5vw] text-[4vw] md:text-[1vw]"
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
                <p className="text-[2.5vw] md:text-[0.75vw] mt-[0.5vw] h-[4vw] md:h-[1.2vw] opacity-0">
                  Placeholder
                </p>
              </div>
              <div className="flex-1 w-full">
                <label
                  htmlFor="checkIn"
                  className="text-[4vw] md:text-[1vw] text-gray-700 block">
                  {home("checkIn")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="checkIn"
                  min={today}
                  className={`border w-full mt-[2vw] md:mt-[0.5vw] p-[3vw] md:p-[0.5vw] rounded-lg text-[4vw] md:text-[1vw] ${
                    errors.checkIn
                      ? "border-red-500"
                      : "border-slate-300"
                  }`}
                />
                <p
                  className={`text-[2.5vw] md:text-[0.75vw] mt-[0.5vw] h-[4vw] md:h-[1.2vw] ${errors.checkIn ? "text-red-500" : "opacity-0"}`}>
                  {errors.checkIn || "Placeholder"}
                </p>
              </div>
              <div className="flex-1 w-full">
                <label
                  htmlFor="checkOut"
                  className="text-[4vw] md:text-[1vw] text-gray-700 block">
                  {home("checkOut")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="checkOut"
                  min={today}
                  className={`border w-full mt-[2vw] md:mt-[0.5vw] p-[3vw] md:p-[0.5vw] rounded-lg text-[4vw] md:text-[1vw] ${
                    errors.checkOut
                      ? "border-red-500"
                      : "border-slate-300"
                  }`}
                />
                <p
                  className={`text-[2.5vw] md:text-[0.75vw] mt-[0.5vw] h-[4vw] md:h-[1.2vw] ${errors.checkOut ? "text-red-500" : "opacity-0"}`}>
                  {errors.checkOut || "Placeholder"}
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={handleSearch}
                  disabled={loading || staysLoading}
                  className="bg-gradient-to-r from-blue-400 to-blue-500 cursor-pointer text-white px-[3vw] md:px-[1.5vw] py-[5.5vw] md:py-[0.5vw] rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed h-[8vw] md:h-[2.6vw] flex items-center justify-center mt-[5.5vw] md:mt-[1.9vw] text-[4vw] md:text-[1vw]">
                  {loading || staysLoading ? (
                    <div className="w-[4vw] h-[4vw] md:w-[1.2vw] md:h-[1.2vw] border-[0.4vw] md:border-[0.15vw] border-white border-t-transparent rounded-full animate-spin"></div>
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
              className="mt-[8vw] md:mt-[2vw] flex flex-col md:flex-row gap-[4vw] md:gap-[1.5vw]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}>
              <div className="flex-1 w-full">
                <label
                  htmlFor="tourType"
                  className="text-[4vw] md:text-[1vw] text-gray-700 block">
                  {home("tourType")}
                </label>
                <select
                  className="border w-full border-slate-300 p-[3vw] md:p-[0.5vw] rounded-lg px-[1vw] md:px-[0.5vw] mt-[2vw] md:mt-[0.5vw] text-[4vw] md:text-[1vw]"
                  name="tourType"
                  id="tourType">
                  {tourTypes.map((type) => (
                    <option key={type} value={type.toLowerCase()}>
                      {type}
                    </option>
                  ))}
                </select>
                <p className="text-[2.5vw] md:text-[0.75vw] mt-[0.5vw] h-[4vw] md:h-[1.2vw] opacity-0">
                  Placeholder
                </p>
              </div>
              <div className="flex-1 w-full">
                <label
                  htmlFor="tourLocation"
                  className="text-[4vw] md:text-[1vw] text-gray-700 block">
                  {home("whereAreYouGoing")}
                </label>
                <select
                  className="border w-full border-slate-300 p-[3vw] md:p-[0.5vw] rounded-lg px-[1vw] md:px-[0.5vw] mt-[2vw] md:mt-[0.5vw] text-[4vw] md:text-[1vw]"
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
                <p className="text-[2.5vw] md:text-[0.75vw] mt-[0.5vw] h-[4vw] md:h-[1.2vw] opacity-0">
                  Placeholder
                </p>
              </div>
              <div className="flex-1 w-full">
                <label
                  htmlFor="startingDate"
                  className="text-[4vw] md:text-[1vw] text-gray-700 block">
                  {home("startingDate")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="startingDate"
                  min={today}
                  className={`border w-full mt-[2vw] md:mt-[0.5vw] p-[3vw] md:p-[0.5vw] rounded-lg text-[4vw] md:text-[1vw] ${
                    errors.startingDate
                      ? "border-red-500"
                      : "border-slate-300"
                  }`}
                />
                <p
                  className={`text-[2.5vw] md:text-[0.75vw] mt-[0.5vw] h-[4vw] md:h-[1.2vw] ${errors.startingDate ? "text-red-500" : "opacity-0"}`}>
                  {errors.startingDate || "Placeholder"}
                </p>
              </div>
              <div className="flex-1 w-full">
                <label
                  htmlFor="endingDate"
                  className="text-[4vw] md:text-[1vw] text-gray-700 block">
                  {home("endingDate")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="endingDate"
                  min={today}
                  className={`border w-full mt-[2vw] md:mt-[0.5vw] p-[3vw] md:p-[0.5vw] rounded-lg text-[4vw] md:text-[1vw] ${
                    errors.endingDate
                      ? "border-red-500"
                      : "border-slate-300"
                  }`}
                />
                <p
                  className={`text-[2.5vw] md:text-[0.75vw] mt-[0.5vw] h-[4vw] md:h-[1.2vw] ${errors.endingDate ? "text-red-500" : "opacity-0"}`}>
                  {errors.endingDate || "Placeholder"}
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={handleSearch}
                  disabled={loading || toursLoading}
                  className="bg-gradient-to-r from-blue-400 to-blue-500 cursor-pointer text-white px-[3vw] md:px-[1.5vw] py-[5.5vw] md:py-[0.5vw] rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed h-[8vw] md:h-[2.6vw] flex items-center justify-center mt-[5.5vw] md:mt-[1.9vw] text-[4vw] md:text-[1vw]">
                  {loading || toursLoading ? (
                    <div className="w-[4vw] h-[4vw] md:w-[1.2vw] md:h-[1.2vw] border-[0.4vw] md:border-[0.15vw] border-white border-t-transparent rounded-full animate-spin"></div>
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
              className="mt-[8vw] md:mt-[2vw] flex flex-col md:flex-row md:items-end gap-[4vw] md:gap-[1.5vw]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}>
              <div className="flex-1 w-full">
                <label
                  htmlFor="transferFrom"
                  className="text-[4vw] md:text-[1vw] text-gray-700">
                  {home("from")}
                </label>
                <select
                  className="border w-full border-slate-300 p-[3vw] md:p-[0.5vw] rounded-lg px-[1vw] md:px-[0.5vw] mt-[2vw] md:mt-[0.5vw] text-[4vw] md:text-[1vw]"
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
                <p className="text-[2.5vw] md:text-[0.75vw] mt-[0.5vw] min-h-[3vw] md:min-h-[1vw]"></p>
              </div>
              <div className="flex-1 w-full">
                <label
                  htmlFor="transferTo"
                  className="text-[4vw] md:text-[1vw] text-gray-700">
                  {home("to")}
                </label>
                <select
                  className="border w-full border-slate-300 p-[3vw] md:p-[0.5vw] rounded-lg px-[1vw] md:px-[0.5vw] mt-[2vw] md:mt-[0.5vw] text-[4vw] md:text-[1vw]"
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
                <p className="text-[2.5vw] md:text-[0.75vw] mt-[0.5vw] min-h-[3vw] md:min-h-[1vw]"></p>
              </div>
              <div className="flex-1 w-full">
                <label
                  htmlFor="transferWhen"
                  className="text-[4vw] md:text-[1vw] text-gray-700">
                  {home("when")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="transferWhen"
                  min={today}
                  className={`border w-full mt-[2vw] md:mt-[0.5vw] p-[3vw] md:p-[0.5vw] rounded-lg text-[4vw] md:text-[1vw] ${
                    errors.transferWhen
                      ? "border-red-500"
                      : "border-slate-300"
                  }`}
                />
                {errors.transferWhen && (
                  <p className="text-red-500 text-[2.5vw] md:text-[0.75vw] mt-[0.5vw] min-h-[3vw] md:min-h-[1vw]">
                    {errors.transferWhen}
                  </p>
                )}
                {!errors.transferWhen && (
                  <div className="min-h-[3vw] md:min-h-[1vw] mt-[0.5vw]"></div>
                )}
              </div>
              <div>
                <button
                  onClick={handleSearch}
                  disabled={loading || transfersLoading}
                  className="bg-gradient-to-r from-blue-400 to-blue-500 cursor-pointer text-white px-[3vw] md:px-[1.5vw] p-[5.5vw] md:p-[0.5vw] rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed h-[8vw] md:h-[2.6vw] flex items-center justify-center text-[4vw] md:text-[1vw]">
                  {loading || transfersLoading ? (
                    <div className="w-[4vw] h-[4vw] md:w-[1.2vw] md:h-[1.2vw] border-[0.4vw] md:border-[0.15vw] border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    home("search")
                  )}
                </button>
                <p className="text-[2.5vw] md:text-[0.75vw] mt-[0.5vw] min-h-[3vw] md:min-h-[1vw]"></p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Results Modal با انیمیشن */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40 p-[2vw]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowModal(false)}>
            <motion.div
              className="bg-white rounded-xl w-full max-w-[90vw] md:max-w-[80vw] max-h-[90vh] overflow-hidden flex flex-col"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <motion.div
                className="flex justify-between items-center p-[3vw] md:p-[1.5vw] border-b"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}>
                <h2 className="text-[5vw] md:text-[1.5vw] font-semibold text-gray-800">
                  {activeTab === "stays" &&
                    `Available Stays (${searchResults.length})`}
                  {activeTab === "tours" &&
                    `Available Tours (${searchResults.length})`}
                  {activeTab === "transfers" &&
                    `Available Transfers (${searchResults.length})`}
                </h2>
                <motion.button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <X className="md:w-[1.5vw] md:h-[1.5vw] w-[5vw] h-[5vw]" />
                </motion.button>
              </motion.div>

              {/* Modal Content */}
              <div className="overflow-y-auto p-[3vw] md:p-[1.5vw]">
                {searchResults.length === 0 ? (
                  <motion.div
                    className="text-center py-[8vw] md:py-[3vw]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}>
                    <p className="text-gray-500 text-[4vw] md:text-[1.2vw]">
                      No results found. Please try different search criteria.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-[3vw] md:gap-[1.5vw]"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}>
                    {searchResults.map((item, index) => (
                      <motion.div
                        key={item._id}
                        variants={{
                          hidden: { opacity: 0, y: 20, scale: 0.95 },
                          show: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                              type: "spring",
                              damping: 20,
                              stiffness: 300,
                            },
                          },
                        }}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                        }}
                        className="border border-gray-200 rounded-lg overflow-hidden transition">
                        <motion.img
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
                          className="w-full h-[35vw] md:h-[12vw] object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="p-[2vw] md:p-[1vw]">
                          <h3 className="font-semibold text-[4vw] md:text-[1.2vw] text-gray-800 mb-[1vw] md:mb-[0.5vw]">
                            {item.name}
                          </h3>

                          {activeTab === "stays" && (
                            <>
                              <div className="flex items-center gap-[1vw] md:gap-[0.5vw] text-[4vw] md:text-[1vw] text-gray-600 mb-[1vw] md:mb-[0.5vw]">
                                <MapPin className="w-[3vw] h-[3vw] md:w-[1vw] md:h-[1vw]" />
                                <span className="line-clamp-1">
                                  {item.address || "Location not specified"}
                                </span>
                                {item.starsCount > 0 && (
                                  <span className="ml-auto">
                                    ⭐ {item.starsCount}
                                  </span>
                                )}
                              </div>
                              {item.included && item.included.length > 0 && (
                                <div className="flex flex-wrap gap-[1vw] md:gap-[0.5vw] mb-[1.5vw] md:mb-[0.75vw]">
                                  {item.included.slice(0, 3).map((amenity, idx) => (
                                    <span
                                      key={idx}
                                      className="text-[2.5vw] md:text-[0.75vw] bg-gray-100 px-[1vw] md:px-[0.5vw] py-[0.5vw] md:py-[0.25vw] rounded">
                                      {amenity}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </>
                          )}

                          {activeTab === "tours" && (
                            <>
                              <div className="flex items-center gap-[1vw] md:gap-[0.5vw] text-[4vw] md:text-[1vw] text-gray-600 mb-[1vw] md:mb-[0.5vw]">
                                <span className="bg-blue-100 text-blue-700 px-[1vw] md:px-[0.5vw] py-[0.5vw] md:py-[0.25vw] rounded text-[2.5vw] md:text-[0.75vw]">
                                  {item.category || "Tour"}
                                </span>
                                <MapPin className="w-[3vw] h-[3vw] md:w-[0.9vw] md:h-[0.9vw]" />
                                <span className="line-clamp-1">{item.location}</span>
                              </div>
                              <p className="text-[4vw] md:text-[1vw] text-gray-600 mb-[1vw] md:mb-[0.5vw]">
                                {home("duration")}: {item.duration || "N/A"}
                              </p>
                              {item.priceIncluded && item.priceIncluded.length > 0 && (
                                <div className="flex flex-wrap gap-[1vw] md:gap-[0.5vw] mb-[1.5vw] md:mb-[0.75vw]">
                                  {item.priceIncluded.slice(0, 3).map((inc, idx) => (
                                    <span
                                      key={idx}
                                      className="text-[2.5vw] md:text-[0.75vw] bg-gray-100 px-[1vw] md:px-[0.5vw] py-[0.5vw] md:py-[0.25vw] rounded">
                                      {inc}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </>
                          )}

                          {activeTab === "transfers" && (
                            <>
                              <div className="text-[4vw] md:text-[1vw] text-gray-600 mb-[1.5vw] md:mb-[0.75vw]">
                                <p className="mb-[0.5vw] md:mb-[0.25vw]">
                                  <span className="font-medium">Passengers:</span>{" "}
                                  {item.passengers || "N/A"}
                                </p>
                                <p className="mb-[0.5vw] md:mb-[0.25vw]">
                                  <span className="font-medium">Year:</span>{" "}
                                  {item.releaseYear || "N/A"}
                                </p>
                                <p>
                                  <span className="font-medium">Insurance:</span>{" "}
                                  {item.insurance ? "✓ Yes" : "✗ No"}
                                </p>
                              </div>
                              {item.features && item.features.length > 0 && (
                                <div className="flex flex-wrap gap-[1vw] md:gap-[0.5vw] mb-[1.5vw] md:mb-[0.75vw]">
                                  {item.features.slice(0, 3).map((feature, idx) => (
                                    <span
                                      key={idx}
                                      className="text-[2.5vw] md:text-[0.75vw] bg-gray-100 px-[1vw] md:px-[0.5vw] py-[0.5vw] md:py-[0.25vw] rounded">
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </>
                          )}

                          <div className="flex items-center justify-between mt-[2vw] md:mt-[1vw]">
                            <span className="text-[5vw] md:text-[1.5vw] font-bold text-blue-600">
                              {activeTab === "stays" && item.price && item.price[0]
                                ? (() => {
                                    const matchedPrice = item.price.find(
                                      (p) => p.currency === currency.code
                                    );
                                    return matchedPrice ? (
                                      <span>
                                        {matchedPrice.from}
                                        {"-"}
                                        {matchedPrice.to}
                                        {currency.symbol}
                                      </span>
                                    ) : null;
                                  })()
                                : activeTab === "tours" && item.price && item.price[0]
                                  ? (() => {
                                      const matchedPrice = item.price.find(
                                        (p) => p.currency === currency.code
                                      );
                                      return matchedPrice ? (
                                        <span>
                                          {matchedPrice.price} {currency.symbol}
                                        </span>
                                      ) : null;
                                    })()
                                  : activeTab === "transfers" &&
                                      item.pricePerKm &&
                                      item.pricePerKm
                                    ? (() => {
                                        const matchedPrice = item.pricePerKm.find(
                                          (p) => p.currency === currency.code
                                        );
                                        return matchedPrice ? (
                                          <span>
                                            {matchedPrice.price}
                                            {currency.symbol} {" /km "}
                                          </span>
                                        ) : null;
                                      })()
                                    : "Contact for price"}
                            </span>
                            <motion.button
                              onClick={() => handleBooking(item)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-[3vw] md:px-[1.5vw] py-[1vw] md:py-[0.5vw] rounded-lg hover:from-blue-500 hover:to-blue-600 transition text-[4vw] md:text-[1vw]">
                              {home("bookNow")}
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesBar;