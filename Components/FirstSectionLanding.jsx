"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FirstSectionLanding({
  title1,
  title2,
  description,
}) {
  return (
    <section className="w-full overflow-hidden pt-24 md:pt-32 lg:pt-40">
      <div className="flex flex-wrap justify-between items-center gap-12 md:gap-16">
        {/* Text Content */}
        <motion.div
          className="w-full md:w-[48%] lg:w-[45%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            {title1}
            <br />
            <span className="text-slate-700">{title2}</span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
            {description}
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="w-full md:w-[48%] lg:w-[45%] relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}>
          {/* Main Image Container */}
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <div className="relative aspect-[4/3] md:aspect-[16/10]">
              <Image
                src="/images/yerevan.webp"
                className="object-cover"
                alt="Yerevan cityscape"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                quality={90}
              />

              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent" />
            </div>
          </div>

          {/* Accent Element - Optional */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/5 rounded-lg -z-10" />
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-slate-900/5 rounded-lg -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
