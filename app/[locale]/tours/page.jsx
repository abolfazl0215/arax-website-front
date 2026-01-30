"use client";
import { useState, useEffect } from "react";
import {
  Clock,
  Calendar,
  DollarSign,
  Users,
  MapPin,
} from "lucide-react";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import useDataStore from "../../../stores/useDataStore"; // مسیر store را به درستی تنظیم کنید
import { useLanguageStore } from "../../../stores/useLanguageStore";
import Link from "next/link";
import { useTranslations } from "next-intl";

const categories = [
  "All",
  "City Tour",
  "Cultural Tour",
  "Nature Tour",
  "Wine Tour",
  "Adventure Tour",
  "Culinary Tour",
];

const ToursPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  // دریافت داده‌ها و توابع از store
  const {
    tours,
    toursLoading,
    toursError,
    fetchTours,
    toggleBookingModal,
  } = useDataStore();

  const { language, currency } = useLanguageStore();
  const home = useTranslations("HomePage");
  const tourss = useTranslations("Tours");

  // بارگذاری تورها هنگام mount شدن کامپوننت
  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  // فیلتر کردن تورها بر اساس دسته‌بندی
  const filteredTours =
    activeCategory === "All"
      ? tours
      : tours.filter((tour) => tour.category === activeCategory);

  return (
    <>
      <div className="min-h-screen bg-[#f1f5f9] px-[4vw] md:px-[10vw]">
        <Navbar />

        {/* Header Section */}
        <div className="mt-[30vw] md:mt-[10vw] md:pt-16">
          <h1 className="text-3xl md:text-[2.5vw] font-bold mb-3 text-gray-900">
            {tourss("title")}
          </h1>
          <p className="text-slate-600 text-sm md:text-base mb-8 max-w-3xl">
            {tourss("subTitle")}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                    : "bg-slate-200 text-gray-700 hover:bg-gray-200"
                }`}>
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {toursLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {toursError && (
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
                  Error loading tours: {toursError}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tours Grid */}
        {!toursLoading && !toursError && (
          <div className="w-full py-12 md:py-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredTours.map((tour) => (
                  <div
                    key={tour._id}
                    className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 bg-white">
                    {/* Image */}
                    <Link
                      href={`/${language.code || "en"}/tour/${tour._id}`}>
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={
                            tour.images && tour.images[0]
                              ? tour.images[0]
                              : "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop"
                          }
                          alt={tour.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                          {tour.category || "Tour"}
                        </div>
                        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                          <span className="font-bold text-gray-900">
                            {/* {tour.price && tour.price[0]
                              ? `$${tour.price[0].price}`
                              : "N/A"} */}
                            {tour.price?.length > 0 &&
                              (() => {
                                const matchedPrice = tour.price.find(
                                  (p) => p.currency === currency.code,
                                );

                                return matchedPrice ? (
                                  <>
                                    <span>{matchedPrice.price} </span>
                                    <span className="text-green-700 font-semibold">
                                      {currency.symbol}
                                    </span>
                                  </>
                                ) : null;
                              })()}
                          </span>
                          <span className="text-xs text-gray-600">
                            / {home("person")}
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-6">
                      <Link
                        href={`/${language.code || "en"}/tour/${tour._id}`}>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                          {tour.name}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                          {tour.description ||
                            "No description available"}
                        </p>

                        {/* Tour Details */}
                        <div className="space-y-2.5 mb-5">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">
                              {home("duration")}:
                            </span>
                            <span>{tour.duration || "N/A"}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">{home("time")}:</span>
                            <span>
                              {tour.startTime || "N/A"} -{" "}
                              {tour.endTime || "N/A"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">
                              {home("location")}:
                            </span>
                            <span>{tour.location || "N/A"}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">
                              {tourss("groupSize")}:
                            </span>
                            <span>{tour.groupSize || "N/A"}</span>
                          </div>
                        </div>
                      </Link>

                      {/* Book Button */}
                      <button
                        onClick={toggleBookingModal}
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                        {home("bookNow")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredTours.length === 0 && !toursLoading && (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">
                    No tours found in this category.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ToursPage;
