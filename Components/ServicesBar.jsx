"use client";
import { useState } from "react";
import { X, Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

const ServicesBar = () => {
  const t = useTranslations("Navigation");
  const [activeTab, setActiveTab] = useState("tours");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [errors, setErrors] = useState({});

  const staysTypes = ["All", "Apartment", "Hotel", "Resort"];

  const staysLocations = [
    "Sevan lake",
    "Yerevan",
    "Dilijan",
    "Tsaghkadzor",
    "Gyumri",
    "Amberd",
    "Jermuk",
    "Arzni",
    "Aghveran",
    "Alaverdi",
    "Syunic",
    "Vayots Dzor",
    "Ijevan",
    "Tavush",
    "Hankavan",
    "Goris",
    "Stepanavan",
  ];

  const tourTypes = ["All", "Group tour", "Private tour"];

  const tourLocations = [
    "Garni-Geghard",
    "Khor Virap",
    "Tatev Ropeway",
    "Sevan Lake",
    "Echmiadzin",
    "Yerevan",
    "Dilijan",
    "Haghpat and Sanahin",
    "Tsaghkadzor",
    "Gyumri",
    "Noravank",
    "Amberd",
    "Jermuk",
    "Saghmosavank",
    "Aragats (Lake Kari)",
    "Areni",
    "Noratus Khachkars",
    "Shaki Waterfall",
    "Carahunge",
  ];

  const transferLocations = [
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

  const home = useTranslations("HomePage");

  // Mock data for stays
  const mockStays = [
    {
      id: 1,
      name: "Lake Sevan Resort & Spa",
      type: "Resort",
      location: "Sevan lake",
      price: "$120",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      amenities: ["Pool", "Spa", "Restaurant", "Free WiFi"],
    },
    {
      id: 2,
      name: "Yerevan Luxury Hotel",
      type: "Hotel",
      location: "Yerevan",
      price: "$95",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400",
      amenities: ["Gym", "Bar", "Parking", "Free WiFi"],
    },
    {
      id: 3,
      name: "Dilijan Forest Apartment",
      type: "Apartment",
      location: "Dilijan",
      price: "$65",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
      amenities: ["Kitchen", "Mountain View", "Free WiFi"],
    },
    {
      id: 4,
      name: "Tsaghkadzor Ski Resort",
      type: "Resort",
      location: "Tsaghkadzor",
      price: "$150",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
      amenities: ["Ski Access", "Spa", "Restaurant", "Heated Pool"],
    },
  ];

  // Mock data for tours
  const mockTours = [
    {
      id: 1,
      name: "Garni Temple & Geghard Monastery",
      type: "Group tour",
      location: "Garni-Geghard",
      price: "$35",
      duration: "6 hours",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400",
      includes: ["Guide", "Transportation", "Lunch"],
    },
    {
      id: 2,
      name: "Private Tatev Ropeway Adventure",
      type: "Private tour",
      location: "Tatev Ropeway",
      price: "$120",
      duration: "Full day",
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      includes: [
        "Private Guide",
        "Transportation",
        "Meals",
        "Cable Car",
      ],
    },
    {
      id: 3,
      name: "Sevan Lake Discovery",
      type: "Group tour",
      location: "Sevan Lake",
      price: "$45",
      duration: "8 hours",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400",
      includes: ["Guide", "Transportation", "Lunch", "Boat Ride"],
    },
    {
      id: 4,
      name: "Echmiadzin Sacred Sites",
      type: "Group tour",
      location: "Echmiadzin",
      price: "$30",
      duration: "5 hours",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400",
      includes: ["Guide", "Transportation", "Entry Fees"],
    },
  ];

  // Mock data for transfers
  const mockTransfers = [
    {
      id: 1,
      name: "Airport Transfer - Premium Sedan",
      from: "Zvartnots Airport",
      to: "Yerevan",
      price: "$25",
      vehicle: "Sedan",
      capacity: "3 passengers",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400",
    },
    {
      id: 2,
      name: "Yerevan to Sevan Lake - Minivan",
      from: "Yerevan",
      to: "Sevan Lake",
      price: "$60",
      vehicle: "Minivan",
      capacity: "7 passengers",
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400",
    },
    {
      id: 3,
      name: "Tbilisi Transfer - SUV",
      from: "Yerevan",
      to: "Tbilisi",
      price: "$120",
      vehicle: "SUV",
      capacity: "5 passengers",
      image:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400",
    },
    {
      id: 4,
      name: "Dilijan Mountain Transfer",
      from: "Yerevan",
      to: "Dilijan",
      price: "$55",
      vehicle: "Sedan",
      capacity: "3 passengers",
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
    },
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
        results = mockStays;
      } else if (activeTab === "tours") {
        results = mockTours;
      } else if (activeTab === "transfers") {
        results = mockTransfers;
      }

      setSearchResults(results);
      setShowModal(true);
    }, 1000);
  };

  const handleBooking = (item) => {
    setSelectedItem(item);
    setShowContactModal(true);
  };

  return (
    <section className="px-[4vw] md:px-[8vw] pb-[19vw] md:py-[5vw] md:pb-[8vw]">
      <div className="bg-white w-full rounded-xl pt-3 pb-6 px-4 sm:px-6 md:px-8 shadow-sm">
        {/* Tabs */}
        <ul className="flex flex-wrap gap-2 sm:gap-6 md:gap-10 justify-center items-center border-b border-gray-200 text-[#4B4B4B] pb-3">
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
        </ul>

        {/* Stays Tab */}
        {activeTab === "stays" && (
          <div className="mt-6 md:mt-8 flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex-1 w-full">
              <label
                htmlFor="staysType"
                className="text-sm text-gray-700 block">
                {home("staysType")}
              </label>
              <select
                className="border w-full border-slate-300 p-2 rounded-lg px-2 mt-2"
                name="staysType"
                id="staysType">
                {staysTypes.map((type) => (
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
                disabled={loading}
                className="bg-gradient-to-r from-blue-400 to-blue-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed h-[42px] flex items-center justify-center mt-[30px]">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  home("search")
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tours Tab */}
        {activeTab === "tours" && (
          <div className="mt-6 md:mt-8 flex flex-col md:flex-row gap-4 md:gap-6">
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
                disabled={loading}
                className="bg-gradient-to-r from-blue-400 to-blue-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed h-[42px] flex items-center justify-center mt-[30px]">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  home("search")
                )}
              </button>
            </div>
          </div>
        )}

        {/* Transfers Tab */}
        {activeTab === "transfers" && (
          <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
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
                disabled={loading}
                className="bg-gradient-to-r from-blue-400 to-blue-500 cursor-pointer text-white px-6 p-2 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed h-[42px] flex items-center justify-center">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  home("search")
                )}
              </button>
              <p className=" text-xs mt-1 min-h-[16px]"></p>
            </div>
          </div>
        )}
      </div>

      {/* Results Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">
                {activeTab === "stays" && "Available Stays"}
                {activeTab === "tours" && "Available Tours"}
                {activeTab === "transfers" && "Available Transfers"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 transition">
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                    <img
                      src={item.image}
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
                            <span>{item.location}</span>
                            <span className="ml-auto">
                              ⭐ {item.rating}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {item.amenities.map((amenity, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </>
                      )}

                      {activeTab === "tours" && (
                        <>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <span>{item.type}</span>
                            <span className="ml-auto">
                              ⭐ {item.rating}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {home("duration")}: {item.duration}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {item.includes.map((inc, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {inc}
                              </span>
                            ))}
                          </div>
                        </>
                      )}

                      {activeTab === "transfers" && (
                        <>
                          <div className="text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-2 mb-1">
                              <MapPin size={16} />
                              <span>
                                {item.from} → {item.to}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {item.vehicle} • {item.capacity}
                          </p>
                        </>
                      )}

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-bold text-blue-600">
                          {item.price}
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
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {home("contactUsforBooking")}
              </h2>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-500 hover:text-gray-700 transition">
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                {home("toBook")}{" "}
                <span className="font-semibold">
                  {selectedItem?.name}
                </span>
                {home("toBookContinue")}
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="tel:+374XXXXXXXX"
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <p className="text-gray-600">+374 XX XXX XXX</p>
                </div>
              </a>

              <a
                href="mailto:info@yourcompany.am"
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div className="bg-green-100 p-3 rounded-full">
                  <Mail className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-600">info@yourcompany.am</p>
                </div>
              </a>

              <a
                href="https://wa.me/374XXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div className="bg-teal-100 p-3 rounded-full">
                  <MessageCircle
                    className="text-teal-600"
                    size={24}
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    WhatsApp
                  </p>
                  <p className="text-gray-600">+374 XX XXX XXX</p>
                </div>
              </a>
            </div>

            <p className="text-sm text-gray-500 text-center mt-6">
              {home("textTeam")}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesBar;
