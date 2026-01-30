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
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function SpecialTours() {
  const { tours, toursLoading, fetchTours, toggleBookingModal } =
    useDataStore();
  const { language, currency } = useLanguageStore();
  const home = useTranslations("HomePage");

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
          <h2 className="text-[6.3vw] md:text-[2.2vw] font-bold text-gray-900 ">
            {home("specialTours")}
          </h2>
        </div>

        <div className="gap-[1vw] hidden md:flex">
          <button className="swiper-button-prev-custom w-[2.5vw] h-[2.5vw] rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
            <ChevronLeft className="w-5 h-5 text-blue-500" />
          </button>
          <button className="swiper-button-next-custom w-[2.5vw] h-[2.5vw] rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
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
            className="pb-[1vw]">
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
                  <div className="block rounded-2xl overflow-hidden transition-all duration-300 transform border border-gray-100 bg-white hover:shadow-xl">
                    {/* Image */}
                    <Link
                      href={`/${language.code || "en"}/tour/${tour._id}`}>
                      <div className="relative h-48 md:h-[15vw] overflow-hidden">
                        <Image
                          src={
                            tour.images && tour.images[0]
                              ? tour.images[0]
                              : "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop"
                          }
                          alt={tour.name}
                          width={200}
                          height={150}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-[4vw] md:px-[1.2vw] py-[1.5vw] md:py-[.5vw] rounded-full text-xs font-semibold shadow-lg">
                          {tour.category || "Tour"}
                        </div>
                        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-[4vw] md:px-[1.1vw] py-[1vw] md:py-[.5vw] rounded-full flex items-center gap-[1vw] md:gap-[.5vw] shadow-lg">
                          {/* <DollarSign className="w-[3vw] h-[3vw] md:w-[1vw] md:h-[1vw] text-green-600" /> */}
                          <span className="font-bold text-gray-900 text-sm md:text-[1.2vw]">
                            {tour.price?.length > 0 &&
                              (() => {
                                const matchedPrice = tour.price.find(
                                  (p) => p.currency === currency.code,
                                );

                                return matchedPrice ? (
                                  <span>
                                    {matchedPrice.price}{" "}
                                    {currency.symbol}
                                  </span>
                                ) : null;
                              })()}
                          </span>
                          <span className="text-[3.5vw] md:text-[.9vw] text-gray-600">
                            / {home("person")}
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-[5vw] md:p-[1.5vw]">
                      <Link
                        href={`/${language.code || "en"}/tour/${tour._id}`}>
                        <h3 className="text-[5vw] md:text-[1.4vw] font-bold text-gray-900 mb-[2vw] md:mb-[.9vw] hover:text-blue-600 transition-colors cursor-pointer line-clamp-1">
                          {tour.name}
                        </h3>

                        <p className="text-gray-600 text-[3.7vw] md:text-[1vw] mb-[4vw] md:mb-[1vw] leading-relaxed line-clamp-2">
                          {tour.description ||
                            "Discover an amazing experience"}
                        </p>

                        {/* Tour Details */}
                        <div className="space-y-[2vw] md:space-y-[.6vw] mb-[1.5vw] md:mb-[1.5vw]">
                          <div className="flex items-center gap-[2vw] md:gap-[.7vw] text-[3.5vw] md:text-[1vw] text-gray-700">
                            <Clock className="w-[3vw] h-[3vw] md:w-[1vw] md:h-[1vw] text-blue-500 flex-shrink-0" />
                            <span className="font-medium">
                              {home("duration")}:
                            </span>
                            <span className="truncate">
                              {tour.duration || "N/A"}
                            </span>
                          </div>

                          <div className="flex items-center gap-[2vw] md:gap-[.7vw] text-[3.5vw] md:text-[1vw] text-gray-700">
                            <Calendar className="w-[3vw] h-[3vw] md:w-[1vw] md:h-[1vw] text-blue-500 flex-shrink-0" />
                            <span className="font-medium">{home("time")}:</span>
                            <span className="truncate">
                              {tour.startTime || "N/A"} -{" "}
                              {tour.endTime || "N/A"}
                            </span>
                          </div>

                          <div className="flex items-center gap-[2vw] md:gap-[.7vw] text-[3.5vw] md:text-[1vw] text-gray-700">
                            <MapPin className="w-[3vw] h-[3vw] md:w-[1vw] md:h-[1vw] text-blue-500 flex-shrink-0" />
                            <span className="font-medium">
                              {home("location")}:
                            </span>
                            <span className="truncate">
                              {tour.location || "N/A"}
                            </span>
                          </div>

                          <div className="flex items-center gap-[2vw] md:gap-[.7vw] text-[3.5vw] md:text-[1vw] text-gray-700">
                            <Users className="w-[3vw] h-[3vw] md:w-[1vw] md:h-[1vw] text-blue-500 flex-shrink-0" />
                            <span className="font-medium">
                              {home("group")}:
                            </span>
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
                        className="w-full bg-gradient-to-r mt-[3vw] md:mt-0 from-blue-500 to-cyan-500 text-white py-[3vw] md:py-[.8vw] rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 text-[4vw] md:text-[1.1vw] cursor-pointer">
                       {home("bookNow")}
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
