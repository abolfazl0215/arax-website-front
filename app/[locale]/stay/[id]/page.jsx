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
  Navigation as NavigationIcon,
} from "lucide-react";
import Navbar from "../../../../Components/Navbar";
import Footer from "../../../../Components/Footer";
import useDataStore from "../../../../stores/useDataStore";
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
    return () => {
      clearSelectedStay();
    };
  }, [stayId, fetchStayById, clearSelectedStay]);

  // Loading state
  if (staysLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-3 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
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
        <div className="min-h-screen bg-gray-50 px-4 md:px-6 py-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-2">
                  Error Loading Stay
                </h3>
                <p className="text-red-700 text-sm">{staysError}</p>
                <button
                  onClick={() => router.back()}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
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
        <div className="min-h-screen bg-gray-50 px-4 md:px-6 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Stay Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The accommodation you're looking for doesn't exist.
            </p>
            <button
              onClick={() => router.back()}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
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
      : ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Stays</span>
          </button>
        </div>

        {/* Image Gallery with Swiper */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            {/* Main Swiper */}
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                pagination={{ clickable: true }}
                thumbs={{
                  swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                }}
                spaceBetween={10}
                slidesPerView={1}
                className="main-swiper"
                style={{
                  "--swiper-navigation-color": "#111827",
                  "--swiper-pagination-color": "#111827",
                }}
              >
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
                <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-md text-xs font-medium text-gray-700 capitalize shadow-sm z-10">
                  {stay.type}
                </div>
              )}

              {stay.starsCount > 0 && (
                <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm z-10">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold text-gray-900 text-sm">
                    {stay.starsCount}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails Swiper */}
            {images.length > 1 && (
              <div className="p-4">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  modules={[Navigation, Thumbs]}
                  spaceBetween={12}
                  slidesPerView={4}
                  watchSlidesProgress
                  breakpoints={{
                    640: { slidesPerView: 5, spaceBetween: 12 },
                    768: { slidesPerView: 6, spaceBetween: 16 },
                    1024: { slidesPerView: 8, spaceBetween: 16 },
                  }}
                  className="thumbs-swiper"
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="cursor-pointer rounded-md overflow-hidden border-2 border-gray-200 hover:border-gray-900 transition-colors aspect-video">
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
              width: 36px;
              height: 36px;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            .main-swiper .swiper-button-next:after,
            .main-swiper .swiper-button-prev:after {
              font-size: 16px;
              font-weight: bold;
            }

            .main-swiper .swiper-pagination-bullet {
              width: 8px;
              height: 8px;
              background: white;
              opacity: 0.7;
            }

            .main-swiper .swiper-pagination-bullet-active {
              opacity: 1;
              background: #111827;
            }

            .thumbs-swiper .swiper-slide-thumb-active > div {
              border-color: #111827;
            }
          `}</style>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Address */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                  {stay.name}
                </h1>

                {stay.address && (
                  <div className="flex items-start gap-2 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                    <span className="text-sm">{stay.address}</span>
                  </div>
                )}

                {stay.distanceToCenter && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <NavigationIcon className="w-4 h-4" />
                    <span className="text-sm">{stay.distanceToCenter} km to city center</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {stay.description && (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    {singleStay("about")}
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {stay.description}
                  </p>
                </div>
              )}

              {/* Property Details */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {singleStay("propertyDetails")}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {stay.square && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Maximize className="w-5 h-5 text-gray-700" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">{singleStay("size")}</p>
                        <p className="font-medium text-gray-900 text-sm">{stay.square} m²</p>
                      </div>
                    </div>
                  )}

                  {stay.starsCount > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-gray-700" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">{singleStay("rating")}</p>
                        <p className="font-medium text-gray-900 text-sm">{stay.starsCount} Stars</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Included Amenities */}
              {stay.included && stay.included.length > 0 && (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    {singleStay("whatsIncluded")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {stay.included.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-700" />
                        </div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {stay.notes && stay.notes.length > 0 && (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    {singleStay("importantInformation")}
                  </h2>
                  <div className="space-y-2">
                    {stay.notes.map((note, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100"
                      >
                        <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700 text-sm">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {singleStay("pricing")}
                </h3>

                {stay.price && stay.price.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-baseline gap-2 mb-1">
                        {stay.price?.length > 0 &&
                          (() => {
                            const matchedPrice = stay.price.find(
                              (p) => p.currency === currency.code
                            );
                            return matchedPrice ? (
                              <>
                                <span className="text-xl font-semibold text-gray-900">
                                  {matchedPrice.from} - {matchedPrice.to}
                                </span>
                                <span className="text-sm text-gray-600">{currency.symbol}</span>
                              </>
                            ) : null;
                          })()}
                      </div>
                      <p className="text-xs text-gray-600">{singleStay("perNight")}</p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-600 text-sm">Contact for pricing</p>
                  </div>
                )}

                <button
                  onClick={toggleBookingModal}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-4"
                >
                  {singleStay("bookNow")}
                </button>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-600 text-center">
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