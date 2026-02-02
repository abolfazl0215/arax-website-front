"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import useDataStore from "../../../stores/useDataStore";
import Link from "next/link";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { useTranslations } from "next-intl";
import { MapPin, Maximize2, Navigation } from "lucide-react";

const filters = [
  { id: "All", label: "All" },
  { id: "hotel", label: "Hotel" },
  { id: "guesthouse", label: "Guesthouse" },
  { id: "hostel", label: "Hostel" },
  { id: "apartment", label: "Apartment" },
];

const StaysPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const { stays, staysLoading, staysError, fetchStays } =
    useDataStore();
  const { language, currency } = useLanguageStore();
  const stayy = useTranslations("Stays");

  useEffect(() => {
    fetchStays();
  }, [fetchStays]);

  const filteredStays =
    activeFilter === "All"
      ? stays
      : stays.filter((stay) => stay.type === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
          {stayy("title")}
        </h1>
        <p className="text-gray-600 text-base md:text-lg mb-8">
          {stayy("subTitle")}
        </p>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors
                ${
                  activeFilter === filter.id
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                }`}>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {staysLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-3 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
        </div>
      )}

      {/* Error State */}
      {staysError && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">
              Error loading stays: {staysError}
            </p>
          </div>
        </div>
      )}

      {/* Stays Grid Section */}
      {!staysLoading && !staysError && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStays.map((stay) => (
              <div
                key={stay._id}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={
                      stay.images && stay.images[0]
                        ? stay.images[0]
                        : "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
                    }
                    alt={stay.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-md text-xs font-medium text-gray-700 capitalize shadow-sm">
                    {stay.type || "Stay"}
                  </div>

                  {stay.starsCount > 0 && (
                    <div className="absolute top-3 left-3 bg-white px-2.5 py-1 rounded-md text-xs font-semibold text-gray-900 flex items-center gap-1 shadow-sm">
                      <span>⭐</span>
                      <span>{stay.starsCount}</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {stay.name}
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm line-clamp-2 leading-relaxed">
                    {stay.description ||
                      "Comfortable accommodation for your stay"}
                  </p>

                  {/* Additional Info */}
                  <div className="space-y-2 mb-4">
                    {stay.address && (
                      <div className="flex items-start gap-2 text-xs text-gray-600">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">
                          {stay.address}
                        </span>
                      </div>
                    )}

                    {stay.distanceToCenter && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Navigation className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>
                          {stay.distanceToCenter} km to center
                        </span>
                      </div>
                    )}

                    {stay.square && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Maximize2 className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{stay.square} m²</span>
                      </div>
                    )}
                  </div>

                  {/* Price Range */}
                  {stay.price && stay.price.length > 0 && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="text-xs font-medium text-gray-700 mb-1">
                        {stayy("priceRange")}
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        {stay.price?.length > 0 &&
                          (() => {
                            const matchedPrice = stay.price.find(
                              (p) => p.currency === currency.code,
                            );

                            return matchedPrice ? (
                              <>
                                <span className="text-base font-semibold text-gray-900">
                                  {matchedPrice.from} -{" "}
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
                      <div className="text-xs font-medium text-gray-700 mb-2">
                        {stayy("included")}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {stay.included
                          .slice(0, 3)
                          .map((item, index) => (
                            <span
                              key={index}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                              {item}
                            </span>
                          ))}
                        {stay.included.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            +{stay.included.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <Link
                    href={`/${language.code || "en"}/stay/${stay._id}`}
                    className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors">
                    {stayy("seeMore")}
                    <svg
                      className="w-4 h-4 ml-1"
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
              <p className="text-gray-500">
                No stays found for this category.
              </p>
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default StaysPage;
