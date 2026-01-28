"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLanguageStore } from "@/stores/useLanguageStore";

export default function WhyAraksGroup() {
  const home = useTranslations("HomePage");
  const { language } = useLanguageStore();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    home("whyAraksOption1"),
    home("whyAraksOption2"),
    home("whyAraksOption3"),
    home("whyAraksOption4"),
  ];

  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80",
      alt: "Armenia sunset view",
      className: "col-span-1 row-span-1",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1589268954161-a8c4eb85d10e?w=800&q=80",
      alt: "Mount Ararat",
      className: "col-span-1 row-span-2",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1555400082-b3b6eae80e98?w=800&q=80",
      alt: "Yerevan city",
      className: "col-span-2 row-span-1",
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="w-full mx-auto px-[4vw] md:px-[8vw] pb-[20vw] md:pb-[10vw] mt-[10vw] md:mt-[3vw]"
      initial={{ opacity: 0, y: 50 }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
      }
      transition={{ duration: 0.6, ease: "easeOut" }}>
      <div className="flex flex-wrap justify-between gap-15 items-center">
        {/* Left Content */}
        <motion.div
          className="flex-1 order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={
            isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
          }
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}>
          <motion.h2
            className="text-[6.3vw] md:text-3xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
            }
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: "easeOut",
            }}>
            {home("whyAraksGroup")}
          </motion.h2>

          <motion.p
            className="text-gray-600 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.5,
              delay: 0.4,
              ease: "easeOut",
            }}>
            {home("whyAraksGroupDesc1")}
          </motion.p>

          {/* Features List */}
          <div className="space-y-4 mb-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -30 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -30 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.1,
                  ease: "easeOut",
                }}>
                <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5">
                  <Check
                    className="w-4 h-4 text-blue-500"
                    strokeWidth={3}
                  />
                </div>
                <p className="text-gray-800 leading-relaxed">
                  {feature}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Read More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.5,
              delay: 0.9,
              ease: "easeOut",
            }}>
            <Link
              href={`/${language.code}/about`}
              className="inline-block px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-500 cursor-pointer hover:bg-blue-600 text-white text-lg font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl">
              {home("readMore")}
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Images Grid */}
        <motion.div
          className="w-[40%] order-2 hidden md:block"
          initial={{ opacity: 0, x: 50 }}
          animate={
            isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
          }
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}>
          <motion.div
            className="w-full flex items-end gap-3 h-60"
            initial={{ opacity: 0, y: 30 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: "easeOut",
            }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{
                duration: 0.5,
                delay: 0.5,
                ease: "easeOut",
              }}
              className="flex-1">
              <Image
                width={200}
                height={200}
                src="https://res.cloudinary.com/dtakyi9mf/image/upload/v1768893218/pexels-arthousestudio-4530180_b7otjf.jpg"
                alt="Armenia landscape"
                className="w-full object-cover rounded-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{
                duration: 0.5,
                delay: 0.6,
                ease: "easeOut",
              }}
              className="flex-1">
              <Image
                width={200}
                height={200}
                src="https://res.cloudinary.com/dtakyi9mf/image/upload/v1768893282/pexels-artem-makarov-289670876-30454809_smwgcu.jpg"
                alt="Armenia landscape"
                className="w-full object-cover rounded-lg h-full"
              />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{
              duration: 0.6,
              delay: 0.7,
              ease: "easeOut",
            }}>
            <Image
              width={200}
              height={200}
              src="https://res.cloudinary.com/dtakyi9mf/image/upload/v1768893004/pexels-roboseal34-34030755_iwseth.jpg"
              alt="Armenia landscape"
              className="w-full mt-3 h-30 object-cover rounded-xl shadow-lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
