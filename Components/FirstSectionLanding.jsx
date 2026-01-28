"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FirstSectionLanding({
  title1,
  title2,
  description,
}) {
  return (
    <div className="flex w-full overflow-hidden flex-wrap justify-between items-center pt-[30vw] md:pt-[13vw]">
      {/* Text Content */}
      <motion.div
        className="order-1 md:w-[50%]"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}>
        <motion.h2
          className="text-[10vw] md:text-6xl font-bold text-slate-800 leading-[12vw] md:leading-[5vw]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}>
          {title1}
          <br /> {title2}
        </motion.h2>

        <motion.p
          className="text-[4.3vw] md:text-lg w-[100%] md:w-4/5 mt-[2vw] md:mt-4 text-slate-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}>
          {description}
        </motion.p>
      </motion.div>

      {/* Image */}
      <motion.div
        className="w-[100%] md:w-[42%] mt-[5vw] md:mt-0 order-2"
        initial={{ opacity: 0, x: 50, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}>
        <Image
          src="/images/yerevan.png"
          className="w-full object-cover h-[50vw] md:h-70 rounded-tr-[40vw] rounded-br-[5vw] rounded-bl-[5vw] rounded-tl-[5vw] md:rounded-tr-2xl md:rounded-br-2xl md:rounded-bl-2xl md:rounded-tl-[150px]"
          alt="yerevan view"
          width={1000}
          height={1000}
        />
      </motion.div>
    </div>
  );
}
