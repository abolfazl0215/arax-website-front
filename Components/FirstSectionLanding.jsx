"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

export default function FirstSectionLanding({
  title1,
  title2,
  description,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [3, -3]);
  const rotateY = useTransform(x, [-100, 100], [-3, 3]);

  // کلاس‌های rounded به صورت متغیر
  const roundedClasses = "rounded-tr-[20vw] rounded-br-[5vw] rounded-bl-[5vw] rounded-tl-[5vw] md:rounded-tr-2xl md:rounded-br-2xl md:rounded-bl-2xl md:rounded-tl-[150px]";

  return (
    <div className="flex w-full overflow-hidden flex-wrap justify-between items-center pt-[30vw] md:pt-[15vw]">
      {/* Text Content */}
      <motion.div
        className="order-1 md:w-[50%]"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}>
        <motion.h2
          className="text-[10vw] md:text-[4vw] font-bold text-slate-800 leading-[12vw] md:leading-[5vw]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}>
          {title1}
          <br /> {title2}
        </motion.h2>

        <motion.p
          className="text-[4.3vw] md:text-[1.3vw] w-[100%] md:w-4/5 mt-[2vw] md:mt-[1vw] text-slate-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}>
          {description}
        </motion.p>
      </motion.div>

      {/* Image with Advanced Animations */}
      <motion.div
        className="w-[100%] md:w-[42%] mt-[6vw] md:mt-0 order-2 relative"
        initial={{ opacity: 0, x: 50, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        style={{ perspective: "1000px" }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          x.set(e.clientX - centerX);
          y.set(e.clientY - centerY);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}>
        
        {/* Ambient Glow Animation - خارج از Container اصلی */}
        <motion.div
          className="absolute -inset-6 opacity-40 blur-3xl -z-10"
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, rgba(59,130,246,0.5) 0%, transparent 60%)",
              "radial-gradient(circle at 70% 60%, rgba(139,92,246,0.5) 0%, transparent 60%)",
              "radial-gradient(circle at 50% 50%, rgba(236,72,153,0.5) 0%, transparent 60%)",
              "radial-gradient(circle at 30% 40%, rgba(59,130,246,0.5) 0%, transparent 60%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* 3D Container with Tilt */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotateX: {
              duration: 0.3,
              ease: "easeOut",
            },
            rotateY: {
              duration: 0.3,
              ease: "easeOut",
            },
          }}
          className="relative">
          
          {/* Image Container with Overflow Hidden for Zoom Effect */}
          <motion.div
            className={`relative overflow-hidden ${roundedClasses}`}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, ease: "easeOut" }}>
            
            {/* Image with Ken Burns Effect (Zoom + Pan) */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                x: [0, -10, 0],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}>
              <Image
                src="/images/yerevan.webp"
                className="w-full object-cover h-[50vw] md:h-[20vw]"
                alt="yerevan view"
                width={600}
                height={400}
                priority
              />
            </motion.div>

            {/* Subtle Vignette Overlay - دقیقا روی تصویر */}
            <div 
              className={`absolute inset-0 pointer-events-none ${roundedClasses}`}
              style={{
                background: "radial-gradient(circle, transparent 40%, rgba(0,0,0,0.1) 100%)",
              }}
            />

            {/* Shimmer Effect - دقیقا روی تصویر */}
            <motion.div
              className={`absolute inset-0 pointer-events-none ${roundedClasses}`}
              style={{
                background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["-200% 0", "200% 0"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 2,
              }}
            />
          </motion.div>

          {/* Soft Shadow - با فاصله مناسب */}
          <div
            className={`absolute inset-0 ${roundedClasses}`}
            style={{
              transform: "translateZ(-15px) translateY(8px)",
              background: "rgba(0,0,0,0.15)",
              filter: "blur(15px)",
              zIndex: -1,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}