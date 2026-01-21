import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

export default function SpecialTours() {
  const tours = [
    {
      id: 1,
      title: "Grand City Tour",
      price: "20,000",
      currency: "AMD",
      image:
        "https://res.cloudinary.com/dtakyi9mf/image/upload/v1768558382/thumb_7774403265.sevan_lake_things_to_do_armenia_holidayme_473042674_rzoln8.jpg",
    },
    {
      id: 2,
      title: "Grand City Tour",
      price: "20,000",
      currency: "AMD",
      image:
        "https://res.cloudinary.com/dtakyi9mf/image/upload/v1768557799/temple_of_sun_1c7cd4f16fada422799d1711ddd8acf83_xnoa3h.jpg",
    },
    {
      id: 3,
      title: "Grand City Tour",
      price: "20,000",
      currency: "AMD",
      image:
        "https://res.cloudinary.com/dtakyi9mf/image/upload/v1768557785/cascade-banner_ddpksn.jpg",
    },
    {
      id: 4,
      title: "Grand City Tour",
      price: "20,000",
      currency: "AMD",
      image:
        "https://res.cloudinary.com/dtakyi9mf/image/upload/v1768557785/cascade-banner_ddpksn.jpg",
    },
  ];

  return (
    <div className="w-full px-[4vw] md:px-[8vw] pb-[11vw] md:pb-[3vw] bg-gray-100">
      <div className="flex justify-between items-center mb-[4vw] md:mb-6">

        <h2 className="text-[6.3vw] md:text-3xl font-bold text-gray-900">
          Special Tours
        </h2>

        <div className="gap-2 hidden md:flex">
          <button className="swiper-button-prev-custom w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-5 h-5 text-blue-500" />
          </button>
          <button className="swiper-button-next-custom w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-5 h-5 text-blue-500" />
          </button>
        </div>

      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={1.1}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3.1,
          },
        }}
        className="pb-4">
        {tours.map((tour) => (
          <SwiperSlide key={tour.id}>
            <div className="overflow-hidden">
              <div className="relative h-52">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full rounded-xl  h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-900 text-white px-4 py-2 rounded-lg">
                  <div className="text-xl font-bold">
                    {tour.price}
                  </div>
                  <div className="text-xs">{tour.currency}</div>
                </div>
              </div>
              <div className="pt-2">
                <h3 className="text-[5vw] md:text-lg font-medium text-gray-900">
                  {tour.title}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
