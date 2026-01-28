"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function TravelerReviews() {
  const home = useTranslations("HomePage");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const reviews = [
    {
      id: 1,
      title: "Really great",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using",
      author: "Sara moradi",
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
      author: "Sara moradi",
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
      author: "Sara moradi",
      tourInfo: "Istanbul tour 12/10/2035",
      rating: 5,
      videoThumbnail:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="px-[4vw] md:px-[8vw] py-[8vw] md:py-[6vw] w-full overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
      }
      transition={{ duration: 0.6, ease: "easeOut" }}>
      <motion.div
        className="w-full bg-[#012710] grid-bg-dark py-[7vw] md:py-[2vw] pl-[6vw] md:pl-[3vw] rounded-xl md:rounded-3xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}>
        <div className="mx-auto">
          {/* FLEX CONTAINER */}
          <div className="flex flex-col lg:flex-row gap-[2vw] items-center">
            {/* LEFT SECTION */}
            <motion.div
              className="w-full lg:w-[28%] flex flex-col justify-evenly text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -50 }
              }
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: "easeOut",
              }}>
              <h2 className="text-[6.3vw] md:text-3xl font-bold w-full text-center">
                {home("travelerReviews")}
              </h2>

              {/* Illustration */}
              <motion.div
                className="flex justify-center items-center relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  ease: "easeOut",
                }}>
                <Image
                  src="/images/testimoniall.png"
                  alt="Traveler"
                  width={256}
                  height={256}
                  className="w-52 object-contain hidden md:block"
                />
              </motion.div>

              {/* Navigation Buttons */}
              <motion.div
                className="hidden md:flex gap-8 justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.6,
                  ease: "easeOut",
                }}>
                <button className="review-button-prev w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer">
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button className="review-button-next w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer">
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </motion.div>
            </motion.div>

            {/* RIGHT SECTION */}
            <motion.div
              className="w-full lg:w-[72%]"
              initial={{ opacity: 0, x: 50 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 50 }
              }
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: "easeOut",
              }}>
              <Swiper
                modules={[Navigation]}
                spaceBetween={15}
                slidesPerView={1.1}
                navigation={{
                  prevEl: ".review-button-prev",
                  nextEl: ".review-button-next",
                }}
                breakpoints={{
                  768: {
                    slidesPerView: 2.2,
                  },
                }}>
                {reviews.map((review, index) => (
                  <SwiperSlide key={review.id}>
                    <motion.div
                      className="bg-white rounded-xl overflow-hidden shadow-xl h-full"
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={
                        isInView
                          ? { opacity: 1, y: 0, scale: 1 }
                          : { opacity: 0, y: 30, scale: 0.95 }
                      }
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + index * 0.1,
                        ease: "easeOut",
                      }}>
                      {/* Video */}
                      <div className="relative h-56 bg-gray-900">
                        <img
                          src={review.videoThumbnail}
                          alt={review.title}
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="w-16 h-16 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all hover:scale-110">
                            <Play
                              className="w-6 h-6 text-gray-900 ml-1"
                              fill="currentColor"
                            />
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {review.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-6">
                          {review.content}
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">
                              {review.author.charAt(0).toUpperCase()}
                            </span>
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-semibold text-gray-900">
                                {review.author}
                              </p>

                              <div className="flex gap-1">
                                {[...Array(review.rating)].map(
                                  (_, i) => (
                                    <Star
                                      key={i}
                                      className="w-[3vw] h-[3vw] md:w-[1vw] md:h-[1vw] text-yellow-400"
                                      fill="currentColor"
                                    />
                                  ),
                                )}
                              </div>
                            </div>

                            <div className="text-xs text-gray-500">
                              {review.tourInfo}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
