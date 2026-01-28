"use client";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  DollarSign,
  Users,
  MapPin,
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import useDataStore from "../stores/useDataStore";
import Link from "next/link";
import { useLanguageStore } from "../stores/useLanguageStore";

export default function SpecialTours() {
  const { tours, toursLoading, fetchTours, toggleBookingModal } =
    useDataStore();
  const { language } = useLanguageStore();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const displayedTours = tours.slice(0, 4);

  return (
    <motion.div
      ref={ref}
      className="w-full px-[4vw] md:px-[10vw] py-[8vw] md:py-[4vw] bg-[#f1f5f9]"
      initial={{ opacity: 0, y: 50 }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
      }
      transition={{ duration: 0.6, ease: "easeOut" }}>
      <motion.div
        className="flex justify-between items-center mb-[4vw] md:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={
          isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
        }
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}>
        <div>
          <h2 className="text-[6.3vw] md:text-3xl font-bold text-gray-900 ">
            Special Tours in Armenia
          </h2>
        </div>

        <div className="gap-2 hidden md:flex">
          <button className="swiper-button-prev-custom w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-5 h-5 text-blue-500" />
          </button>
          <button className="swiper-button-next-custom w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-5 h-5 text-blue-500" />
          </button>
        </div>
      </motion.div>

      {/* Loading State */}
      {toursLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : displayedTours.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No tours available at the moment.
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={
            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={12}
            slidesPerView={1.1}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3.2,
                spaceBetween: 24,
              },
            }}
            className="pb-4">
            {displayedTours.map((tour, index) => (
              <SwiperSlide key={tour._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 20, scale: 0.95 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + index * 0.1,
                    ease: "easeOut",
                  }}>
                  <div
                    
                    className="block rounded-2xl overflow-hidden transition-all duration-300 transform border border-gray-100 bg-white hover:shadow-xl">
                    {/* Image */}
                    <Link href={`/${language.code || "en"}/tour/${tour._id}`} >
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <img
                        src={
                          tour.images && tour.images[0]
                            ? tour.images[0]
                            : "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop"
                        }
                        alt={tour.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 md:px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                        {tour.category || "Tour"}
                      </div>
                      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <DollarSign className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                        <span className="font-bold text-gray-900 text-sm md:text-base">
                          {tour.price && tour.price[0]
                            ? `$${tour.price[0].price}`
                            : "N/A"}
                        </span>
                        <span className="text-xs text-gray-600">
                          / person
                        </span>
                      </div>
                    </div>
                    </Link>

                    {/* Content */}
                    <div className="p-4 md:p-6">
                      <Link href={`/${language.code || "en"}/tour/${tour._id}`} >
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 hover:text-blue-600 transition-colors cursor-pointer line-clamp-1">
                        {tour.name}
                      </h3>

                      <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed line-clamp-2">
                        {tour.description ||
                          "Discover an amazing experience"}
                      </p>

                      {/* Tour Details */}
                      <div className="space-y-2 mb-4 md:mb-5">
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                          <Clock className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0" />
                          <span className="font-medium">
                            Duration:
                          </span>
                          <span className="truncate">
                            {tour.duration || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0" />
                          <span className="font-medium">Time:</span>
                          <span className="truncate">
                            {tour.startTime || "N/A"} -{" "}
                            {tour.endTime || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0" />
                          <span className="font-medium">
                            Location:
                          </span>
                          <span className="truncate">
                            {tour.location || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                          <Users className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0" />
                          <span className="font-medium">Group:</span>
                          <span className="truncate">
                            {tour.groupSize || "N/A"}
                          </span>
                        </div>
                      </div>
                    </Link>

                      {/* Book Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // جلوی فعال شدن لینک را می‌گیرد
                          toggleBookingModal();
                        }}
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2.5 md:py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm md:text-base cursor-pointer">
                        Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}
    </motion.div>
  );
}
