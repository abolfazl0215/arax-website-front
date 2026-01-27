"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLanguageStore } from "@/stores/useLanguageStore";
import Link from "next/link";
import useDataStore from "../stores/useDataStore"; // مسیر store را به درستی تنظیم کنید

export default function HotelsSwiper() {
  const home = useTranslations("HomePage");
  const { language } = useLanguageStore();

  // دریافت داده‌ها و توابع از store
  const { stays, staysLoading, fetchStays } = useDataStore();

  // بارگذاری اقامتگاه‌ها هنگام mount شدن کامپوننت
  useEffect(() => {
    fetchStays();
  }, [fetchStays]);

  // نمایش فقط 4 اقامتگاه اول
  const displayedStays = stays.slice(0, 4);

  return (
    <div className="w-full bg-gray-100 px-[4vw] md:px-[8vw] pb-[20vw] md:pb-[11vw]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-[4vw] md:mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-[6.3vw] md:text-3xl font-bold text-gray-900">
              {/* {home("hotels")} */}
              Stays
            </h2>
            <Link
              href={`/${language.code}/stays`}
              className="text-blue-500 text-[4vw] md:text-lg hover:underline mt-1">
              {home("seeAll")} &gt;
            </Link>
          </div>

          <div className=" gap-2 hidden md:flex">
            <button className="swiper-button-prev-custom w-10 h-10 rounded-full bg-white  flex items-center justify-center hover:bg-gray-50 transition cursor-pointer">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button className="swiper-button-next-custom w-10 h-10 rounded-full bg-white  flex items-center justify-center hover:bg-gray-50 transition cursor-pointer">
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {staysLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : displayedStays.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No stays available at the moment.
            </p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1.2}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3.1,
                spaceBetween: 24,
              },
            }}
            className="hotels-swiper">
            {displayedStays.map((stay) => (
              <SwiperSlide key={stay._id}>
                <div className="bg-white rounded-lg md:rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-44 md:h-64 overflow-hidden">
                    <img
                      src={
                        stay.images && stay.images[0]
                          ? stay.images[0]
                          : "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
                      }
                      alt={stay.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    {/* Type Badge */}
                    {stay.type && (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 capitalize">
                        {stay.type}
                      </div>
                    )}
                    {/* Star Rating Badge */}
                    {stay.starsCount > 0 && (
                      <div className="absolute top-3 left-3 bg-yellow-400/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1">
                        <span>⭐</span>
                        <span>{stay.starsCount}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-[4vw] md:p-6">
                    <h3 className="text-[5.2vw] md:text-xl font-bold text-gray-900 mb-3">
                      {stay.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-[4vw] md:text-[1.1vw] line-clamp-2">
                      {stay.description ||
                        "Comfortable accommodation for your stay"}
                    </p>

                    {/* Price Display */}
                    {stay.price && stay.price.length > 0 && (
                      <div className="mb-3 flex items-baseline gap-2">
                        <span className="text-lg font-bold text-blue-600">
                          {stay.price[0].from} - {stay.price[0].to}
                        </span>
                        <span className="text-sm text-gray-600">
                          {stay.price[0].currency || "USD"}
                        </span>
                      </div>
                    )}

                    <Link
                      href={`/${language.code || "en"}/stay/${stay._id}`}
                      className="inline-flex items-center text-blue-500 font-medium hover:text-cyan-600 transition">
                      {home("seeMore")}
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
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
