"use client";
import React, { useEffect, memo, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLanguageStore } from "@/stores/useLanguageStore";
import Link from "next/link";
import useDataStore from "../stores/useDataStore";

// Memoized Stay Card Component
const StayCard = memo(({ stay, language, currency, seeMoreText }) => {
  const matchedPrice = useMemo(
    () => stay.price?.find((p) => p.currency === currency.code),
    [stay.price, currency.code],
  );

  const imageUrl =
    stay.images?.[0] ||
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop";

  return (
    <article className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all h-full flex flex-col">
      {/* Image */}
      <Link href={`/${language.code || "en"}/stay/${stay._id}`}>
        <div className="relative h-48 overflow-hidden group">
          <img
            src={imageUrl}
            alt={stay.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />

          {/* Type Badge */}
          {stay.type && (
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-medium text-gray-700 capitalize border border-gray-200">
              {stay.type}
            </div>
          )}

          {/* Star Rating Badge */}
          {stay.starsCount > 0 && (
            <div className="absolute top-3 left-3 bg-gray-900 px-2.5 py-1 rounded-md text-xs font-semibold text-white flex items-center gap-1">
              <span>⭐</span>
              <span>{stay.starsCount}</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content - flex-1 برای گرفتن فضای باقیمانده */}
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/${language.code || "en"}/stay/${stay._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-gray-700 transition-colors line-clamp-1">
            {stay.name}
          </h3>

          <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
            {stay.description ||
              "Comfortable accommodation for your stay"}
          </p>
        </Link>

        {/* Spacer برای فشار دادن قیمت و دکمه به پایین */}
        <div className="flex-1" />

        {/* Price Display */}
        {matchedPrice && (
          <div className="mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-gray-900">
                {matchedPrice.from}
              </span>
              {matchedPrice.to &&
                matchedPrice.to !== matchedPrice.from && (
                  <>
                    <span className="text-gray-400">-</span>
                    <span className="text-xl font-bold text-gray-900">
                      {matchedPrice.to}
                    </span>
                  </>
                )}
              <span className="text-sm text-gray-600 ml-1">
                {currency.symbol}
              </span>
            </div>
          </div>
        )}

        {/* See More Button - همیشه در پایین */}
        <Link
          href={`/${language.code || "en"}/stay/${stay._id}`}
          className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors group w-fit">
          {seeMoreText}
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
});

StayCard.displayName = "StayCard";

// Loading Skeleton Component
const LoadingSkeleton = memo(() => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="h-48 bg-gray-200 animate-pulse" />
        <div className="p-5 space-y-3">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3 mt-4" />
        </div>
      </div>
    ))}
  </div>
));

LoadingSkeleton.displayName = "LoadingSkeleton";

export default function HotelsSwiper() {
  const home = useTranslations("HomePage");
  const { language, currency } = useLanguageStore();
  const { stays, staysLoading, fetchStays } = useDataStore();

  useEffect(() => {
    fetchStays();
  }, [fetchStays]);

  const displayedStays = useMemo(() => stays.slice(0, 8), [stays]);

  return (
    <section className="w-full bg-gray-50 px-4 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {home("stays")}
            </h2>
            <Link
              href={`/${language.code}/stays`}
              className="text-gray-900 text-sm md:text-base hover:text-gray-700 transition-colors flex items-center gap-1 font-medium">
              {home("seeAll")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-2">
            <button
              className="swiper-button-prev-custom w-9 h-9 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              className="swiper-button-next-custom w-9 h-9 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next">
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {staysLoading ? (
          <LoadingSkeleton />
        ) : displayedStays.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏨</span>
            </div>
            <p className="text-gray-600 text-base">
              No stays available at the moment.
            </p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
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
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="!pb-2">
            {displayedStays.map((stay) => (
              <SwiperSlide key={stay._id} className="h-auto">
                <StayCard
                  stay={stay}
                  language={language}
                  currency={currency}
                  seeMoreText={home("seeMore")}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <style jsx global>{`
        .swiper-slide {
          height: auto !important;
        }

        .swiper-button-prev-custom.swiper-button-disabled,
        .swiper-button-next-custom.swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}
