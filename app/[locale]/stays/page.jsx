"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import useDataStore from "../../../stores/useDataStore"; // مسیر store را به درستی تنظیم کنید
import Link from "next/link";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { useTranslations } from "next-intl";

const filters = [
  { id: "All", label: "All" },
  { id: "hotel", label: "Hotel" },
  { id: "guesthouse", label: "Guesthouse" },
  { id: "hostel", label: "Hostel" },
  { id: "apartment", label: "Apartment" },
];

const StaysPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  // دریافت داده‌ها و توابع از store
  const { stays, staysLoading, staysError, fetchStays } =
    useDataStore();
  const { language, currency } = useLanguageStore();

  const stayy = useTranslations("Stays");

  // بارگذاری اقامتگاه‌ها هنگام mount شدن کامپوننت
  useEffect(() => {
    fetchStays();
  }, [fetchStays]);

  // فیلتر کردن اقامتگاه‌ها بر اساس نوع
  const filteredStays =
    activeFilter === "All"
      ? stays
      : stays.filter((stay) => stay.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      <Navbar />

      {/* Header Section */}
      <div className="px-4 md:px-[10vw] pt-8 md:pt-16 mt-[20vw] md:mt-[10vw]">
        <h1 className="text-2xl md:text-[2.3vw] font-semibold mb-3">
          {stayy("title")}
        </h1>
        <p className="text-slate-600 text-sm md:text-base mb-8">
          {stayy("subTitle")}
        </p>
      </div>

      {/* Filter Section */}
      <div className="px-4 md:px-[10vw] mb-8">
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-slate-200 text-gray-700 hover:bg-gray-200"
              }`}>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {staysLoading && (
        <div className="px-4 md:px-[10vw] py-12">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        </div>
      )}

      {/* Error State */}
      {staysError && (
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
                  Error loading stays: {staysError}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stays Grid Section */}
      {!staysLoading && !staysError && (
        <div className="w-full px-4 md:px-[8vw] py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredStays.map((stay) => (
                <div
                  key={stay._id}
                  className="bg-white rounded-lg md:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-48 md:h-64 overflow-hidden">
                    <img
                      src={
                        stay.images && stay.images[0]
                          ? stay.images[0]
                          : "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
                      }
                      alt={stay.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 capitalize">
                      {stay.type || "Stay"}
                    </div>

                    {/* Star Rating Badge */}
                    {stay.starsCount > 0 && (
                      <div className="absolute top-3 left-3 bg-yellow-100 border border-yellow-400 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1">
                        <span>⭐</span>
                        <span>{stay.starsCount}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                      {stay.name}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base line-clamp-2">
                      {stay.description ||
                        "Comfortable accommodation for your stay"}
                    </p>

                    {/* Additional Info */}
                    <div className="space-y-2 mb-4">
                      {stay.address && (
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="line-clamp-1">
                            {stay.address}
                          </span>
                        </div>
                      )}

                      {stay.distanceToCenter && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                          </svg>
                          <span>
                            {stay.distanceToCenter} km to center
                          </span>
                        </div>
                      )}

                      {stay.square && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                            />
                          </svg>
                          <span>{stay.square} m²</span>
                        </div>
                      )}
                    </div>

                    {/* Price Range */}
                    {stay.price && stay.price.length > 0 && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm font-semibold text-gray-700 mb-1">
                          {stayy("priceRange")}:
                        </div>
                        <div className="flex items-baseline gap-2">
                          {stay.price?.length > 0 &&
                            (() => {
                              const matchedPrice = stay.price.find(
                                (p) => p.currency === currency.code,
                              );

                              return matchedPrice ? (
                                <>
                                  <span className="text-lg font-bold text-blue-600">
                                    {matchedPrice.from}
                                    {" - "}
                                    {matchedPrice.to}
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    {currency.symbol}
                                  </span>
                                </>
                              ) : null;
                            })()}
                        </div>
                      </div>
                    )}

                    {/* Included Features */}
                    {stay.included && stay.included.length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs font-semibold text-gray-700 mb-2">
                          {stayy("included")}:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {stay.included
                            .slice(0, 3)
                            .map((item, index) => (
                              <span
                                key={index}
                                className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">
                                {item}
                              </span>
                            ))}
                          {stay.included.length > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              +{stay.included.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <Link
                      href={`/${language.code || "en"}/stay/${stay._id}`}
                      className="inline-flex items-center text-blue-500 font-medium hover:text-cyan-600 transition-colors">
                      {stayy("seeMore")}
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {filteredStays.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  No stays found for this category.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default StaysPage;
