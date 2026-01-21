import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Transfers() {
  const transferServices = [
    {
      icon: "/images/plane.png",
      title: "Airport transfers",
      description:
        "Get the booking beforehand and reach your hotel without wasting any moment",
      link: "See more",
    },
    {
      icon: "/images/earth.svg",
      title: "Various Destinations",
      description:
        "Tell us about your favourite destinations and we will customise the transfer for you",
      link: "See more",
    },
    {
      icon: "/images/truck.webp",
      title: "Transport Facility",
      description:
        "Every vehicle is ready with drivers to pick you from any place in Armenia",
      link: "See more",
    },
  ];

  return (
    <div className="bg-gray-100  px-[4vw] md:px-[8vw] pb-[20vw] md:pb-[8vw]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-[6.3vw] md:text-3xl font-bold mb-14 text-gray-900">
          Transfers
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[11vw] md:gap-4">
          {transferServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white relative rounded-2xl p-[6vw] md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <Image
                  width={200}
                  height={200}
                  src={service.icon}
                  alt={service.title}
                  className={`${index == 0 ? "w-16" : index == 1 ? "w-12" : "w-14"} absolute -top-6 left-0  text-blue-500`}
                />

                <h3 className="text-xl font-semibold mb-4 text-gray-900 mt-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center text-blue-500 font-medium hover:text-blue-600 transition-colors duration-200">
                  {service.link}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
