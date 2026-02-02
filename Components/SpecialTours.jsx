"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  MapPin,
  Users,
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import useDataStore from "../stores/useDataStore";
import Link from "next/link";
import { useLanguageStore } from "../stores/useLanguageStore";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function SpecialTours() {
  const { tours, toursLoading, fetchTours, toggleBookingModal } = useDataStore();
  const { language, currency } = useLanguageStore();
  const home = useTranslations("HomePage");

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const displayedTours = tours.slice(0, 4);

  return (
    <section className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            {home("specialTours")}
          </h2>

          <div className="hidden md:flex gap-2">
            <button
              className="swiper-button-prev-custom w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md border border-gray-200 flex items-center justify-center transition-all"
              aria-label="Previous">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              className="swiper-button-next-custom w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md border border-gray-200 flex items-center justify-center transition-all"
              aria-label="Next">
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {toursLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : displayedTours.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No tours available at the moment.</p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={1.1}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2.1,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3.1,
                spaceBetween: 24,
              },
            }}
            className="pb-2">
            {displayedTours.map((tour) => (
              <SwiperSlide key={tour._id}>
                <article className="rounded-lg overflow-hidden bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  
                  {/* Image */}
                  <Link href={`/${language.code || "en"}/tour/${tour._id}`}>
                    <div className="relative h-48 md:h-56 overflow-hidden group">
                      <Image
                        src={
                          tour.images && tour.images[0]
                            ? tour.images[0]
                            : "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop"
                        }
                        alt={tour.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                        {tour.category || "Tour"}
                      </div>
                      
                      {/* Price Badge */}
                      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                        <span className="font-bold text-gray-900 text-sm">
                          {tour.price?.length > 0 &&
                            (() => {
                              const matchedPrice = tour.price.find(
                                (p) => p.currency === currency.code
                              );
                              return matchedPrice ? (
                                <span>
                                  {matchedPrice.price} {currency.symbol}
                                </span>
                              ) : null;
                            })()}
                        </span>
                        <span className="text-xs text-gray-600 ml-1">
                          / {home("person")}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-5">
                    <Link href={`/${language.code || "en"}/tour/${tour._id}`}>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-1">
                        {tour.name}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                        {tour.description || "Discover an amazing experience"}
                      </p>

                      {/* Tour Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="font-medium">{home("duration")}:</span>
                          <span className="truncate">{tour.duration || "N/A"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="font-medium">{home("time")}:</span>
                          <span className="truncate">
                            {tour.startTime || "N/A"} - {tour.endTime || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="font-medium">{home("location")}:</span>
                          <span className="truncate">{tour.location || "N/A"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="font-medium">{home("group")}:</span>
                          <span className="truncate">{tour.groupSize || "N/A"}</span>
                        </div>
                      </div>
                    </Link>

                    {/* Book Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleBookingModal();
                      }}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
                      {home("bookNow")}
                    </button>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}