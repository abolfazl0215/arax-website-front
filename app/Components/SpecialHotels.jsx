import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const hotels = [
  {
    id: 1,
    name: "Grand Hotel",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    description:
      "Select from the best hotels to stay in and continue your wonderful trip",
  },
  {
    id: 2,
    name: "Spinas palace Hotel",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
    description:
      "Select from the best hotels to stay in and continue your wonderful trip",
  },
  {
    id: 3,
    name: "Maya Hotel",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
    description:
      "Select from the best hotels to stay in and continue your wonderful trip",
  },
  {
    id: 4,
    name: "Grand City Tower",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
    description:
      "Select from the best hotels to stay in and continue your wonderful trip",
  },
  {
    id: 5,
    name: "Royal Palace",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    description:
      "Select from the best hotels to stay in and continue your wonderful trip",
  },
];

export default function HotelsSwiper() {
  return (
    <div className="w-full bg-gray-100 px-[4vw] md:px-[8vw] pb-[20vw] md:pb-[11vw]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-[4vw] md:mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-[6.3vw] md:text-3xl font-bold text-gray-900">
              Hotels
            </h2>
            <a
              href="#"
              className="text-blue-500 text-[4vw] md:text-lg hover:underline mt-1">
              See all &gt;
            </a>
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
          {hotels.map((hotel) => (
            <SwiperSlide key={hotel.id}>
              <div className="bg-white rounded-lg md:rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-44 md:h-64 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-[4vw] md:p-6">
                  <h3 className="text-[5.2vw] md:text-xl font-bold text-gray-900 mb-3">
                    {hotel.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-[4vw] md:text-[1.1vw]">
                    {hotel.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-blue-500 font-medium hover:text-cyan-600 transition">
                    See more
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
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
