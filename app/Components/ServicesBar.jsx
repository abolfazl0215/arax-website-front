"use client";
import { useState } from "react";

const ServicesBar = () => {
  const [activeTab, setActiveTab] = useState("tours");

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
            Stays
          </li>
          <li
            onClick={() => setActiveTab("tours")}
            className={`cursor-pointer transition-all hover:text-teal-600 rounded-lg p-1 px-3 sm:px-5 text-sm sm:text-base ${
              activeTab === "tours" ? "bg-teal-900/7 text-black " : ""
            }`}>
            Tours
          </li>
          <li
            onClick={() => setActiveTab("transfers")}
            className={`cursor-pointer transition-all hover:text-teal-600 rounded-lg p-1 px-3 sm:px-5 text-sm sm:text-base ${
              activeTab === "transfers"
                ? "bg-teal-900/7 text-black "
                : ""
            }`}>
            Transfers
          </li>
        </ul>

        {/* Stays Tab */}
        {activeTab === "stays" && (
          <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            <div className="flex-1 w-full">
              <label
                htmlFor="staysType"
                className="text-sm text-gray-700">
                Stays Type
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
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="staysLocation"
                className="text-sm text-gray-700">
                Where are you going
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
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="checkIn"
                className="text-sm text-gray-700">
                Check-in
              </label>
              <input
                type="date"
                id="checkIn"
                className="border w-full mt-2 border-slate-300 p-2 rounded-lg"
              />
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="checkOut"
                className="text-sm text-gray-700">
                Check-out
              </label>
              <input
                type="date"
                id="checkOut"
                className="border w-full mt-2 border-slate-300 p-2 rounded-lg"
              />
            </div>
            <button className="bg-gradient-to-r from-blue-400 to-blue-500 cursor-pointer text-white px-6 p-2 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all w-full md:w-auto">
              Search
            </button>
          </div>
        )}

        {/* Tours Tab */}
        {activeTab === "tours" && (
          <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            <div className="flex-1 w-full">
              <label
                htmlFor="tourType"
                className="text-sm text-gray-700">
                Tour Type
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
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="tourLocation"
                className="text-sm text-gray-700">
                Where are you going
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
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="startingDate"
                className="text-sm text-gray-700">
                Starting Date
              </label>
              <input
                type="date"
                id="startingDate"
                className="border w-full mt-2 border-slate-300 p-2 rounded-lg"
              />
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="endingDate"
                className="text-sm text-gray-700">
                Ending Date
              </label>
              <input
                type="date"
                id="endingDate"
                className="border w-full mt-2 border-slate-300 p-2 rounded-lg"
              />
            </div>
            <button className="bg-gradient-to-r from-blue-400 to-blue-500 cursor-pointer text-white px-6 p-2 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all w-full md:w-auto">
              Search
            </button>
          </div>
        )}

        {/* Transfers Tab */}
        {activeTab === "transfers" && (
          <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            <div className="flex-1 w-full">
              <label
                htmlFor="transferFrom"
                className="text-sm text-gray-700">
                From
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
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="transferTo"
                className="text-sm text-gray-700">
                To
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
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="transferWhen"
                className="text-sm text-gray-700">
                When
              </label>
              <input
                type="date"
                id="transferWhen"
                className="border w-full mt-2 border-slate-300 p-2 rounded-lg"
              />
            </div>
            <button className="bg-gradient-to-r from-blue-400 to-blue-500 cursor-pointer text-white px-6 p-2 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all w-full md:w-auto">
              Search
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesBar;
