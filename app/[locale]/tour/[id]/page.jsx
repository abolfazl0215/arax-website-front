"use client";
import { useEffect, useState, useMemo, useCallback, memo } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  MapPin,
  ArrowLeft,
  Clock,
  Calendar,
  Users,
  Check,
  AlertCircle,
  Tag,
  DollarSign,
} from "lucide-react";
import Navbar from "../../../../Components/Navbar";
import Footer from "../../../../Components/Footer";
import useDataStore from "../../../../stores/useDataStore";
import { useLanguageStore } from "../../../../stores/useLanguageStore";
import { useTranslations } from "next-intl";

// Lazy load Swiper برای بهینه‌سازی
const DynamicSwiper = dynamic(
  () => import("swiper/react").then((mod) => mod.Swiper),
  { ssr: false }
);
const DynamicSwiperSlide = dynamic(
  () => import("swiper/react").then((mod) => mod.SwiperSlide),
  { ssr: false }
);

// Memoized Components
const LoadingSpinner = memo(() => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-3 border-gray-200 border-t-slate-800 animate-spin" />
    </div>
  </div>
));

const ErrorState = memo(({ error, onBack }) => (
  <div className="min-h-screen bg-gray-50 px-4 md:px-[10vw] py-16">
    <div className="max-w-2xl mx-auto bg-white rounded-lg border border-red-200 p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Error Loading Tour
          </h3>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
            Go Back
          </button>
        </div>
      </div>
    </div>
  </div>
));

const NotFoundState = memo(({ onBack }) => (
  <div className="min-h-screen bg-gray-50 px-4 md:px-[10vw] py-16">
    <div className="text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8 text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Tour Not Found
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        The tour you're looking for doesn't exist.
      </p>
      <button
        onClick={onBack}
        className="px-6 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
        Go Back
      </button>
    </div>
  </div>
));

const TourGallery = memo(({ images, tourName, category, price, singleTour }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
      {/* Main Image */}
      <div className="relative aspect-[16/9] bg-gray-100">
        <img
          src={images[activeIndex]}
          alt={`${tourName} ${activeIndex + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Badges */}
        {category && (
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md">
            {category}
          </div>
        )}
        
        {price && price[0] && (
          <div className="absolute bottom-4 left-4 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200">
            <div className="flex items-baseline gap-1.5">
              <DollarSign className="w-4 h-4 text-gray-900" />
              <span className="text-lg font-semibold text-gray-900">
                {price[0].price}
              </span>
              <span className="text-xs text-gray-600">/ {singleTour("person")}</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-black/60 text-white text-xs font-medium rounded-full">
              {activeIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="p-3 bg-gray-50 border-t border-gray-200">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex-shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all ${
                  activeIndex === index
                    ? "border-gray-900 ring-2 ring-gray-900/10"
                    : "border-gray-200 hover:border-gray-300"
                }`}>
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

const TourDetails = memo(({ tour, singleTour }) => {
  const details = useMemo(() => [
    {
      icon: Clock,
      label: singleTour("duration"),
      value: tour.duration,
      bgColor: "bg-slate-50",
      iconColor: "text-slate-700",
    },
    {
      icon: Calendar,
      label: singleTour("time"),
      value: `${tour.startTime || "N/A"} - ${tour.endTime || "N/A"}`,
      bgColor: "bg-slate-50",
      iconColor: "text-slate-700",
      show: tour.startTime || tour.endTime,
    },
    {
      icon: Users,
      label: singleTour("groupSize"),
      value: tour.groupSize,
      bgColor: "bg-slate-50",
      iconColor: "text-slate-700",
    },
    {
      icon: MapPin,
      label: singleTour("location"),
      value: tour.location,
      bgColor: "bg-slate-50",
      iconColor: "text-slate-700",
    },
  ].filter(detail => detail.value && detail.show !== false), [tour, singleTour]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {singleTour("tourDetails")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {details.map((detail, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`w-10 h-10 ${detail.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <detail.icon className={`w-5 h-5 ${detail.iconColor}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-600 mb-0.5">{detail.label}</p>
              <p className="text-sm font-medium text-gray-900 truncate">
                {detail.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

const BookingSidebar = memo(({ tour, singleTour, currency, onBook }) => {
  const matchedPrice = useMemo(() => 
    tour.price?.find(p => p.currency === currency.code),
    [tour.price, currency.code]
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {singleTour("bookThisTour")}
      </h3>

      {/* Pricing */}
      {matchedPrice ? (
        <div className="mb-6">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-gray-900">
                {matchedPrice.price}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {currency.symbol}
              </span>
            </div>
            <p className="text-xs text-gray-600">{singleTour("perPerson")}</p>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <p className="text-sm text-gray-600">Contact for pricing</p>
        </div>
      )}

      {/* Quick Info */}
      <div className="space-y-2 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
        {tour.duration && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">{singleTour("duration")}:</span>
            <span className="font-medium text-gray-900">{tour.duration}</span>
          </div>
        )}
        {tour.groupSize && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">{singleTour("groupSize")}:</span>
            <span className="font-medium text-gray-900">{tour.groupSize}</span>
          </div>
        )}
        {tour.startTime && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">{singleTour("startTime")}:</span>
            <span className="font-medium text-gray-900">{tour.startTime}</span>
          </div>
        )}
      </div>

      <button
        onClick={onBook}
        className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors mb-3">
        {singleTour("bookNow")}
      </button>

      {/* Features */}
      <div className="pt-4 border-t border-gray-200 space-y-2">
        {["Free cancellation available", "Best price guarantee", "Instant confirmation"].map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
            <Check className="w-3.5 h-3.5 text-gray-900 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

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
  const { currency } = useLanguageStore();
  const singleTour = useTranslations("SingleTour");

  useEffect(() => {
    if (tourId) {
      fetchTourById(tourId);
    }
    return () => clearSelectedTour();
  }, [tourId, fetchTourById, clearSelectedTour]);

  const handleBack = useCallback(() => router.back(), [router]);

  const images = useMemo(() => 
    selectedTour?.images?.length > 0
      ? selectedTour.images
      : ["https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop"],
    [selectedTour]
  );

  if (toursLoading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner />
        <Footer />
      </>
    );
  }

  if (toursError) {
    return (
      <>
        <Navbar />
        <ErrorState error={toursError} onBack={handleBack} />
        <Footer />
      </>
    );
  }

  if (!selectedTour) {
    return (
      <>
        <Navbar />
        <NotFoundState onBack={handleBack} />
        <Footer />
      </>
    );
  }

  const tour = selectedTour;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Back Button */}
        <div className="px-4 md:px-[10vw] pt-8 mt-[20vw] md:mt-[10vw]">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Tours</span>
          </button>
        </div>

        {/* Gallery */}
        <div className="px-4 md:px-[10vw] py-6">
          <TourGallery
            images={images}
            tourName={tour.name}
            category={tour.category}
            price={tour.price}
            singleTour={singleTour}
          />
        </div>

        {/* Content */}
        <div className="px-4 md:px-[10vw] pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Location */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {tour.name}
                </h1>

                {tour.location && (
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{tour.location}</span>
                  </div>
                )}

                {tour.category && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-md border border-gray-200">
                    <Tag className="w-3.5 h-3.5 text-gray-700" />
                    <span className="text-xs font-medium text-gray-700">
                      {tour.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              {tour.description && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    {singleTour("AboutThisTour")}
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {tour.description}
                  </p>
                </div>
              )}

              {/* Tour Details */}
              <TourDetails tour={tour} singleTour={singleTour} />

              {/* What's Included */}
              {tour.priceIncluded?.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    {singleTour("whatsIncluded")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tour.priceIncluded.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-gray-900 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <BookingSidebar
                tour={tour}
                singleTour={singleTour}
                currency={currency}
                onBook={toggleBookingModal}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}