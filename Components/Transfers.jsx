"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLanguageStore } from "@/stores/useLanguageStore";

export default function Transfers() {
  const home = useTranslations("HomePage");
  const { language } = useLanguageStore();

  const transferServices = [
    {
      icon: "/images/plane.png",
      title: home("airportTransfers"),
      description: home("airportTransferDesc"),
      link: home("seeMore"),
    },
    {
      icon: "/images/earth.svg",
      title: home("variousDestinations"),
      description: home("variousDestinationsDesc"),
      link: home("seeMore"),
    },
    {
      icon: "/images/truck.webp",
      title: home("transportFacility"),
      description: home("transportFacilityDesc"),
      link: home("seeMore"),
    },
  ];

  return (
    <div className="bg-gray-100  px-[4vw] md:px-[8vw] pb-[20vw] md:pb-[8vw]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-[6.3vw] md:text-3xl font-bold mb-14 text-gray-900">
          {home("transfers")}
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

                <Link
                  href={`/${language.code}/transfers`}
                  className="inline-flex items-center text-blue-500 font-medium hover:text-blue-600 transition-colors duration-200">
                  {service.link}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
