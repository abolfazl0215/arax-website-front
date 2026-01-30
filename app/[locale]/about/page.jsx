"use client";
import React from "react";
import {
  MapPin,
  Users,
  Award,
  Heart,
  Globe,
  Shield,
  Star,
  TrendingUp,
} from "lucide-react";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import Link from "next/link";
import { useLanguageStore } from "@/stores/useLanguageStore";
import Image from "next/image";

const AboutUsPage = () => {
  const stats = [
    { icon: Users, number: "10,000+", label: "Happy Travelers" },
    { icon: Award, number: "15+", label: "Years Experience" },
    { icon: Star, number: "4.9/5", label: "Average Rating" },
    { icon: Globe, number: "50+", label: "Tour Destinations" },
  ];

  const { language } = useLanguageStore();

  const values = [
    {
      icon: Heart,
      title: "Passion for Travel",
      description:
        "We love what we do and are dedicated to creating unforgettable experiences for every traveler who chooses Armenia.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Your safety and comfort are our top priorities. We maintain the highest standards in all our services.",
    },
    {
      icon: Users,
      title: "Expert Guides",
      description:
        "Our experienced local guides bring Armenia's history and culture to life with authentic stories and insights.",
    },
    {
      icon: TrendingUp,
      title: "Sustainable Tourism",
      description:
        "We're committed to responsible tourism that benefits local communities and preserves Armenia's natural beauty.",
    },
  ];

  const team = [
    {
      name: "Armen Petrosyan",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      description: "15+ years in tourism industry",
    },
    {
      name: "Lusine Grigoryan",
      role: "Tour Operations Manager",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      description: "Expert in cultural tours",
    },
    {
      name: "Davit Sargsyan",
      role: "Customer Relations",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      description: "Multilingual support specialist",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden mt-[5vw]">
        <Image
          width={1000}
          height={400}
          src="/images/company.webp"
          alt="Armenia landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Welcome to Araks Group
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Your Gateway to Discovering the Heart of Armenia
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="px-4 md:px-[10vw] py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Our Story
          </h2>
          <div className="space-y-6 text-gray-700 leading-relaxed text-base md:text-lg">
            <p>
              Founded in 2009,{" "}
              <span className="font-semibold text-[#012710]">
                Araks Group
              </span>{" "}
              has been at the forefront of Armenian tourism, sharing
              the beauty, culture, and heritage of this ancient land
              with travelers from around the world. What started as a
              small family business with a single tour has grown into
              one of Armenia's most trusted and beloved travel
              companies.
            </p>
            <p>
              Named after the legendary Araks River that flows through
              our homeland, we embody the spirit of connection—
              bringing together people, cultures, and unforgettable
              experiences. Our team of passionate professionals is
              dedicated to showcasing the best of Armenia, from its
              UNESCO World Heritage sites and ancient monasteries to
              its vibrant cities and breathtaking natural landscapes.
            </p>
            <p>
              We believe that travel is more than just visiting
              places; it's about creating memories, building
              connections, and experiencing authentic moments that
              stay with you forever. Whether you're exploring the
              historic streets of Yerevan, hiking in the stunning
              Dilijan National Park, or savoring traditional Armenian
              cuisine, we're here to make your journey exceptional.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-br from-[#012710] via-[#013d18] to-[#015320] py-16">
        <div className="px-4 md:px-[10vw]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-12 h-12" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-green-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="px-4 md:px-[10vw] py-16 md:py-24 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          Our Values
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          The principles that guide everything we do at Araks Group
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#012710] to-[#015320] rounded-2xl flex items-center justify-center mb-6">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Meet Our Team Section */}
      <div className="px-4 md:px-[10vw] py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          Meet Our Team
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Passionate professionals dedicated to making your Armenian
          adventure unforgettable
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {member.name}
              </h3>
              <p className="text-[#012710] font-semibold mb-2">
                {member.role}
              </p>
              <p className="text-gray-600 text-sm">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 md:px-[10vw] py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Why Choose Araks Group?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h3 className="text-xl font-bold text-white mb-3">
                🌟 Authentic Experiences
              </h3>
              <p className="text-gray-300">
                We go beyond typical tourist spots to show you the
                real Armenia—its hidden gems, local traditions, and
                authentic culture.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h3 className="text-xl font-bold text-white mb-3">
                👥 Local Expertise
              </h3>
              <p className="text-gray-300">
                Our guides are born and raised in Armenia, offering
                insider knowledge and personal stories you won't find
                in guidebooks.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h3 className="text-xl font-bold text-white mb-3">
                💎 Personalized Service
              </h3>
              <p className="text-gray-300">
                Every traveler is unique. We customize tours to match
                your interests, pace, and preferences for a truly
                personal experience.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h3 className="text-xl font-bold text-white mb-3">
                🤝 24/7 Support
              </h3>
              <p className="text-gray-300">
                From booking to the end of your trip, our team is
                always available to ensure everything runs smoothly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 md:px-[10vw] py-16 md:py-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Explore Armenia?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Let us create an unforgettable journey tailored just for
            you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${language.code || "en"}/tours`}
              className="px-8 py-4 bg-gradient-to-r from-[#012710] to-[#015320] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
              Book Your Tour
            </Link>
            <Link
              href={`/${language.code || "en"}/contact`}
              className="px-8 py-4 bg-white text-[#012710] font-semibold rounded-xl border-2 border-[#012710] hover:bg-green-50 transition-all duration-300 cursor-pointer">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
