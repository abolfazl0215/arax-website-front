"use client";

import { ArrowRight, Plane, MapPin, Truck } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLanguageStore } from "@/stores/useLanguageStore";

export default function Transfers() {
  const home = useTranslations("HomePage");
  const { language } = useLanguageStore();

  const transferServices = [
    {
      icon: Plane,
      title: home("airportTransfers"),
      description: home("airportTransferDesc"),
      link: home("seeMore"),
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: MapPin,
      title: home("variousDestinations"),
      description: home("variousDestinationsDesc"),
      link: home("seeMore"),
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Truck,
      title: home("transportFacility"),
      description: home("transportFacilityDesc"),
      link: home("seeMore"),
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <section className="bg-gray-50 px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-gray-900">
          {home("transfers")}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {transferServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={index}
                className="bg-white relative rounded-xl p-6 md:p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300 group">
                
                {/* Icon */}
                <div className={`absolute -top-6 left-6 ${service.bgColor} rounded-xl p-4 shadow-md border border-gray-100`}>
                  <Icon className={`w-8 h-8 ${service.color}`} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  <Link
                    href={`/${language.code}/transfers`}
                    className="inline-flex items-center text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors group">
                    {service.link}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}