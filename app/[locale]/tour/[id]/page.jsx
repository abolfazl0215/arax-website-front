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
  ArrowLeft,
  Clock,
  Calendar,
  DollarSign,
  Users,
  Check,
  AlertCircle,
  Tag,
} from "lucide-react";
import Navbar from "../../../../Components/Navbar";
import Footer from "../../../../Components/Footer";
import useDataStore from "../../../../stores/useDataStore"; // مسیر store را به درستی تنظیم کنید

export default function TourDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tourId = params.id;

  const {
    selectedTour,
    fetchTourById,
    toursLoading,
    toursError,
    clearSelectedTour,
    toggleBookingModal,
  } = useDataStore();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    if (tourId) {
      fetchTourById(tourId);
    }

    // پاک کردن tour انتخاب شده هنگام unmount
    return () => {
      clearSelectedTour();
    };
  }, [tourId, fetchTourById, clearSelectedTour]);

  // Loading state
  if (toursLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  // Error state
  if (toursError) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f1f5f9] px-4 md:px-[10vw] py-16">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Error Loading Tour
                </h3>
                <p className="text-red-700">{toursError}</p>
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
  if (!selectedTour) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f1f5f9] px-4 md:px-[10vw] py-16">
          <div className="text-center max-w-2xl mx-auto">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tour Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The tour you're looking for doesn't exist.
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

  const tour = selectedTour;
  const images =
    tour.images && tour.images.length > 0
      ? tour.images
      : [
          "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop",
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
            <span className="font-medium">Back to Tours</span>
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
                        alt={`${tour.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Badges Overlay */}
              {tour.category && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
                  {tour.category}
                </div>
              )}

              {tour.price && tour.price[0] && (
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg z-10">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-gray-900 text-lg">
                    ${tour.price[0].price}
                  </span>
                  <span className="text-sm text-gray-600">
                    / person
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails Swiper */}
            {images.length > 1 && (
              <div className="p-4 bg-gray-50">
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
              {/* Title & Location */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {tour.name}
                </h1>

                {tour.location && (
                  <div className="flex items-start gap-3 text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-1 text-blue-500" />
                    <span className="text-lg">{tour.location}</span>
                  </div>
                )}

                {tour.category && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
                    <Tag className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">
                      {tour.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              {tour.description && (
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    About This Tour
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {tour.description}
                  </p>
                </div>
              )}

              {/* Tour Details */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Tour Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tour.duration && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Duration
                        </p>
                        <p className="font-semibold text-gray-900">
                          {tour.duration}
                        </p>
                      </div>
                    </div>
                  )}

                  {(tour.startTime || tour.endTime) && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Time</p>
                        <p className="font-semibold text-gray-900">
                          {tour.startTime || "N/A"} -{" "}
                          {tour.endTime || "N/A"}
                        </p>
                      </div>
                    </div>
                  )}

                  {tour.groupSize && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Group Size
                        </p>
                        <p className="font-semibold text-gray-900">
                          {tour.groupSize}
                        </p>
                      </div>
                    </div>
                  )}

                  {tour.location && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Location
                        </p>
                        <p className="font-semibold text-gray-900">
                          {tour.location}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Included */}
              {tour.priceIncluded &&
                tour.priceIncluded.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      What's Included
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tour.priceIncluded.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-gray-700">
                            {item}
                          </span>
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
                  Book This Tour
                </h3>

                {/* Pricing */}
                {tour.price && tour.price.length > 0 ? (
                  <div className="mb-6">
                    {tour.price.map((priceItem, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 mb-3">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-3xl font-bold text-blue-600">
                            ${priceItem.price}
                          </span>
                          <span className="text-sm text-gray-600">
                            {priceItem.currency || "USD"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          per person
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-gray-600">
                      Contact for pricing
                    </p>
                  </div>
                )}

                {/* Quick Info */}
                <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
                  {tour.duration && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold text-gray-900">
                        {tour.duration}
                      </span>
                    </div>
                  )}
                  {tour.groupSize && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        Group Size:
                      </span>
                      <span className="font-semibold text-gray-900">
                        {tour.groupSize}
                      </span>
                    </div>
                  )}
                  {tour.startTime && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        Start Time:
                      </span>
                      <span className="font-semibold text-gray-900">
                        {tour.startTime}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={toggleBookingModal}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-4">
                  Book Now
                </button>

                <button className="w-full border-2 border-blue-500 text-blue-500 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300">
                  Contact Guide
                </button>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Free cancellation available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Best price guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Instant confirmation</span>
                  </div>
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
