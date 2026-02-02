"use client";
import React from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLanguageStore } from "@/stores/useLanguageStore";

export default function WhyAraksGroup() {
  const home = useTranslations("HomePage");
  const { language } = useLanguageStore();

  const features = [
    home("whyAraksOption1"),
    home("whyAraksOption2"),
    home("whyAraksOption3"),
    home("whyAraksOption4"),
  ];

  return (
    <section className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {home("whyAraksGroup")}
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              {home("whyAraksGroupDesc1")}
            </p>

            {/* Features List */}
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-blue-600" strokeWidth={3} />
                  </div>
                  <span className="text-gray-800 leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Read More Button */}
            <div className="pt-4">
              <Link
                href={`/${language.code}/about`}
                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-lg transition-colors shadow-sm hover:shadow-md">
                {home("readMore")}
              </Link>
            </div>
          </div>

          {/* Right Images Grid */}
          <div className="hidden lg:block">
            <div className="space-y-4">
              {/* Top Row - Two Images Side by Side */}
              <div className="flex gap-4 items-end">
                <div className="flex-1 h-40 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/images/why1.webp"
                    alt="Armenia landscape"
                    width={300}
                    height={160}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 h-64 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/images/why2.webp"
                    alt="Armenia landscape"
                    width={300}
                    height={256}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Bottom Row - Single Full Width Image */}
              <div className="h-32 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/why3.webp"
                  alt="Armenia landscape"
                  width={600}
                  height={128}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}