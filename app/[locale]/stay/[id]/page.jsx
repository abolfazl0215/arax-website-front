"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import {
  MapPin,
  Star,
  ArrowLeft,
  Check,
  AlertCircle,
  Maximize,
  Users,
  Navigation as NavigationIcon,
} from "lucide-react";
import Navbar from "../../../../Components/Navbar";
import Footer from "../../../../Components/Footer";
import useDataStore from "../../../../stores/useDataStore"; // مسیر store را به درستی تنظیم کنید
import { useLanguageStore } from "@/stores/useLanguageStore";
import { useTranslations } from "next-intl";

export default function StayDetailPage() {
  const params = useParams();
  const router = useRouter();
  const stayId = params.id;

  const singleStay = useTranslations("SingleStay");

  const {
    selectedStay,
    fetchStayById,
    staysLoading,
    staysError,
    clearSelectedStay,
    toggleBookingModal,
  } = useDataStore();
  const { language, currency } = useLanguageStore();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    if (stayId) {
      fetchStayById(stayId);
    }

    // پاک کردن stay انتخاب شده هنگام unmount
    return () => {
      clearSelectedStay();
    };
  }, [stayId, fetchStayById, clearSelectedStay]);

  // Loading state
  if (staysLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen  flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  // Error state
  if (staysError) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f1f5f9] px-4 md:px-[10vw] py-16">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Error Loading Stay
                </h3>
                <p className="text-red-700">{staysError}</p>
                <button
                  onClick={() => router.back()}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Not found state
  if (!selectedStay) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f1f5f9] px-4 md:px-[10vw] py-16">
          <div className="text-center max-w-2xl mx-auto">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Stay Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The accommodation you're looking for doesn't exist.
            </p>
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const stay = selectedStay;
  const images =
    stay.images && stay.images.length > 0
      ? stay.images
      : [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f1f5f9]">
        {/* Back Button */}
        <div className="px-4 md:px-[10vw] pt-8 mt-[20vw] md:mt-[10vw]">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition mb-6">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Stays</span>
          </button>
        </div>

        {/* Image Gallery with Swiper */}
        <div className="px-4 md:px-[10vw] mb-8">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            {/* Main Swiper */}
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                // navigation
                pagination={{ clickable: true }}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                spaceBetween={10}
                slidesPerView={1}
                className="main-swiper"
                style={{
                  "--swiper-navigation-color": "#3b82f6",
                  "--swiper-pagination-color": "#3b82f6",
                }}>
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                      <img
                        src={image}
                        alt={`${stay.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Badges Overlay */}
              {stay.type && (
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-700 capitalize shadow-lg z-10">
                  {stay.type}
                </div>
              )}

              {stay.starsCount > 0 && (
                <div className="absolute top-4 left-4 bg-yellow-100 border border-yellow-400 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg z-10">
                  <Star className="w-5 h-5 fill-yellow-600 text-yellow-600" />
                  <span className="font-bold text-gray-800">
                    {stay.starsCount}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails Swiper */}
            {images.length > 1 && (
              <div className="p-4 ">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  modules={[Navigation, Thumbs]}
                  spaceBetween={12}
                  slidesPerView={4}
                  watchSlidesProgress
                  breakpoints={{
                    640: {
                      slidesPerView: 5,
                      spaceBetween: 12,
                    },
                    768: {
                      slidesPerView: 6,
                      spaceBetween: 16,
                    },
                    1024: {
                      slidesPerView: 8,
                      spaceBetween: 16,
                    },
                  }}
                  className="thumbs-swiper">
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="cursor-pointer rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all aspect-video">
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>

          <style jsx global>{`
            .main-swiper .swiper-button-next,
            .main-swiper .swiper-button-prev {
              background: white;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            }

            .main-swiper .swiper-button-next:after,
            .main-swiper .swiper-button-prev:after {
              font-size: 18px;
              font-weight: bold;
            }

            .main-swiper .swiper-pagination-bullet {
              width: 10px;
              height: 10px;
              background: white;
              opacity: 0.7;
            }

            .main-swiper .swiper-pagination-bullet-active {
              opacity: 1;
              background: #3b82f6;
            }

            .thumbs-swiper .swiper-slide-thumb-active > div {
              border-color: #3b82f6;
              box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }
          `}</style>
        </div>

        {/* Content */}
        <div className="px-4 md:px-[10vw] pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Address */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {stay.name}
                </h1>

                {stay.address && (
                  <div className="flex items-start gap-3 text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-1 text-blue-500" />
                    <span className="text-lg">{stay.address}</span>
                  </div>
                )}

                {stay.distanceToCenter && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <NavigationIcon className="w-5 h-5 text-blue-500" />
                    <span>
                      {stay.distanceToCenter} km to city center
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              {stay.description && (
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {singleStay("about")}
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {stay.description}
                  </p>
                </div>
              )}

              {/* Property Details */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {singleStay("propertyDetails")}
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {stay.square && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Maximize className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          {singleStay("size")}
                        </p>
                        <p className="font-semibold text-gray-900">
                          {stay.square} m²
                        </p>
                      </div>
                    </div>
                  )}

                  {stay.starsCount > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Star className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          {singleStay("rating")}
                        </p>
                        <p className="font-semibold text-gray-900">
                          {stay.starsCount} Stars
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Included Amenities */}
              {stay.included && stay.included.length > 0 && (
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {singleStay("whatsIncluded")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stay.included.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {stay.notes && stay.notes.length > 0 && (
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {singleStay("importantInformation")}
                  </h2>
                  <div className="space-y-3">
                    {stay.notes.map((note, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {singleStay("pricing")}
                </h3>

                {stay.price && stay.price.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                      <div className="flex items-baseline gap-2 mb-2">
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
                      <p className="text-sm text-gray-600">
                        {singleStay("perNight")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 p-4  rounded-lg text-center">
                    <p className="text-gray-600">
                      Contact for pricing
                    </p>
                  </div>
                )}

                <button
                  onClick={toggleBookingModal}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-4">
                  {singleStay("bookNow")}
                </button>

                {/* <button className="w-full border-2 border-blue-500 text-blue-500 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300">
                  Contact Host
                </button> */}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center">
                    Free cancellation available • Best price guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
