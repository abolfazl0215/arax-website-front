"use client";
import { useState, useEffect } from "react";
import { Clock, Calendar, Users, MapPin } from "lucide-react";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import useDataStore from "../../../stores/useDataStore";
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
  const { tours, toursLoading, toursError, fetchTours, toggleBookingModal } = useDataStore();
  const { language, currency } = useLanguageStore();
  const home = useTranslations("HomePage");
  const tourss = useTranslations("Tours");

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const filteredTours =
    activeCategory === "All"
      ? tours
      : tours.filter((tour) => tour.category === activeCategory);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
            {tourss("title")}
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-8 max-w-3xl">
            {tourss("subTitle")}
          </p>
        </div>

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors
                  ${
                    activeCategory === category
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {toursLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-3 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
          </div>
        )}

        {/* Error State */}
        {toursError && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">Error loading tours: {toursError}</p>
            </div>
          </div>
        )}

        {/* Tours Grid */}
        {!toursLoading && !toursError && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTours.map((tour) => (
                <div
                  key={tour._id}
                  className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow bg-white"
                >
                  {/* Image */}
                  <Link href={`/${language.code || "en"}/tour/${tour._id}`}>
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={
                          tour.images && tour.images[0]
                            ? tour.images[0]
                            : "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop"
                        }
                        alt={tour.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-md text-xs font-medium text-gray-700 shadow-sm">
                        {tour.category || "Tour"}
                      </div>
                      <div className="absolute bottom-3 left-3 bg-white px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm">
                        <span className="font-semibold text-gray-900">
                          {tour.price?.length > 0 &&
                            (() => {
                              const matchedPrice = tour.price.find(
                                (p) => p.currency === currency.code
                              );
                              return matchedPrice ? (
                                <>
                                  {matchedPrice.price}
                                  <span className="text-gray-600 ml-0.5">{currency.symbol}</span>
                                </>
                              ) : null;
                            })()}
                        </span>
                        <span className="text-xs text-gray-600">/ {home("person")}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-4">
                    <Link href={`/${language.code || "en"}/tour/${tour._id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-gray-700 transition-colors line-clamp-1">
                        {tour.name}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                        {tour.description || "No description available"}
                      </p>

                      {/* Tour Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="font-medium">{home("duration")}:</span>
                          <span>{tour.duration || "N/A"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="font-medium">{home("time")}:</span>
                          <span>
                            {tour.startTime || "N/A"} - {tour.endTime || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="font-medium">{home("location")}:</span>
                          <span className="line-clamp-1">{tour.location || "N/A"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Users className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="font-medium">{tourss("groupSize")}:</span>
                          <span>{tour.groupSize || "N/A"}</span>
                        </div>
                      </div>
                    </Link>

                    {/* Book Button */}
                    <button
                      onClick={toggleBookingModal}
                      className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
                    >
                      {home("bookNow")}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredTours.length === 0 && !toursLoading && (
              <div className="text-center py-20">
                <p className="text-gray-500">No tours found in this category.</p>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ToursPage;