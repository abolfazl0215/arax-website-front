"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLanguageStore } from "@/stores/useLanguageStore";

export default function Transfers() {
  const home = useTranslations("HomePage");
  const { language } = useLanguageStore();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
    <section
      ref={ref}
      className="bg-gray-100 px-[4vw] md:px-[8vw] pb-[20vw] md:pb-[8vw]">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-[6.3vw] md:text-3xl font-bold mb-14 text-gray-900 will-change-transform"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          {home("transfers")}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[11vw] md:gap-4">
          {transferServices.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white relative rounded-2xl p-[6vw] md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 will-change-transform"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ willChange: "transform, opacity" }}>
              {/* 🔹 Static icon (NO animation = smooth) */}
              <Image
                width={64}
                height={64}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                src={service.icon}
                alt={service.title}
                className={`absolute -top-6 left-0 ${
                  index === 0 ? "w-16" : index === 1 ? "w-12" : "w-14"
                }`}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
