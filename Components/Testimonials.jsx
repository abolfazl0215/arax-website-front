"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  Quote,
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { useTranslations } from "next-intl";

export default function TravelerReviews() {
  const home = useTranslations("HomePage");

  const reviews = [
    {
      id: 1,
      title: "Really great",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using",
      author: "Sara Moradi",
      tourInfo: "Istanbul tour 12/10/2035",
      rating: 5,
      videoThumbnail:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80",
    },
    {
      id: 2,
      title: "Really great",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using",
      author: "Sara Moradi",
      tourInfo: "Istanbul tour 12/10/2035",
      rating: 5,
      videoThumbnail:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    },
    {
      id: 3,
      title: "Really great",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using",
      author: "Sara Moradi",
      tourInfo: "Istanbul tour 12/10/2035",
      rating: 5,
      videoThumbnail:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    },
  ];

  return (
    <section className="px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20 w-full bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {home("travelerReviews")}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hear what our travelers have to say about their
            experiences
          </p>
        </div>

        {/* Reviews Container */}
        <div className="bg-slate-900 rounded-xl p-6 md:p-8 lg:p-12 relative overflow-hidden">
          {/* Decorative Quote Icon */}
          <div className="absolute top-8 left-8 opacity-10">
            <Quote className="w-24 h-24 text-white" />
          </div>

          {/* Navigation Buttons - Desktop */}
          <div className="hidden md:flex gap-3 justify-end mb-6">
            <button
              className="review-button-prev w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all"
              aria-label="Previous review">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              className="review-button-next w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all"
              aria-label="Next review">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Swiper */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1.1}
            dir="ltr"
            navigation={{
              prevEl: ".review-button-prev",
              nextEl: ".review-button-next",
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 24,
              },
            }}>
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <article className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full">
                  {/* Video Thumbnail */}
                  <div className="relative h-48 bg-gray-900 group">
                    <img
                      src={review.videoThumbnail}
                      alt={review.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        className="w-14 h-14 rounded-full bg-white hover:bg-blue-600 flex items-center justify-center transition-all hover:scale-110 group"
                        aria-label="Play video">
                        <Play
                          className="w-5 h-5 text-gray-900 group-hover:text-white ml-0.5 transition-colors"
                          fill="currentColor"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Rating */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                        />
                      ))}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {review.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-3">
                      {review.content}
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-semibold text-sm">
                          {review.author.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {review.author}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {review.tourInfo}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
