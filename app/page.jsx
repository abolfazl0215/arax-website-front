"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const MainPage = () => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({
    code: "ENG",
    name: "English",
  });
  const [selectedCurrency, setSelectedCurrency] = useState("AMD");

  const languages = [
    { code: "ENG", name: "English" },
    { code: "HY", name: "Հայերեն" },
    { code: "FA", name: "فارسی" },
    { code: "KA", name: "ქართული" },
    { code: "RU", name: "Русский" },
  ];

  const currencies = [
    { code: "AMD", name: "Armenian Dram" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "GEL", name: "Georgian Lari" },
    { code: "USD", name: "US Dollar" },
  ];

  return (
    <>
      <header className="px-28 py-5 ">
        <nav className="flex justify-between items-center border-b border-gray-200 pb-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/arax-logo.svg"
                className="w-13"
                alt="logo"
                width={200}
                height={200}
              />
              <div className="">
                <h1
                  className="text-3xl font-semibold
             bg-clip-text text-transparent
             bg-[linear-gradient(135deg,#B48900_0%,#FFC100_30%,#FFD966_50%,#FFC100_70%,#B48900_100%)]"
                  style={{
                    WebkitTextStroke: "0.5px #FFC100",
                  }}>
                  Araks <br />
                  <span
                    className="block text-sm font-normal
               bg-clip-text text-transparent
               bg-[linear-gradient(135deg,#B48900_0%,#FFC100_35%,#FFD966_50%,#FFC100_65%,#B48900_100%)]"
                    style={{
                      WebkitTextStroke: "0.5px #FFC100",
                    }}>
                    group
                  </span>
                </h1>
              </div>
            </div>
          </div>
          <ul className="flex gap-11 text-[#4B4B4B]">
            <li className="cursor-pointer hover:text-teal-600 transition-colors">
              Home
            </li>
            <li className="cursor-pointer hover:text-teal-600 transition-colors">
              Stays
            </li>
            <li className="cursor-pointer hover:text-teal-600 transition-colors">
              Tours
            </li>
            <li className="cursor-pointer hover:text-teal-600 transition-colors">
              Transfers
            </li>
            <li className="cursor-pointer hover:text-teal-600 transition-colors">
              Car Rental
            </li>
            <li className="cursor-pointer hover:text-teal-600 transition-colors">
              About Us
            </li>
          </ul>
          <div className="flex gap-2">
            <div className="relative">
              <button
                onClick={() => {
                  setIsLangOpen(!isLangOpen);
                  setIsCurrencyOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-slate-200 flex items-center gap-2 text-sm hover:bg-slate-300 transition-colors cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5"
                  fill="none"
                  viewBox="0 0 47 32">
                  <path
                    fill="#41479B"
                    d="M43.48 0H3.52C1.576 0 0 1.61 0 3.595v24.258c0 1.986 1.576 3.595 3.52 3.595h39.96c1.944 0 3.52-1.61 3.52-3.594V3.593C47 1.61 45.424 0 43.48 0"></path>
                  <path
                    fill="#F5F5F5"
                    d="M46.951 3c-.277-1.702-1.725-3-3.471-3h-.916L27.552 10.045V0h-8.104v10.045L4.436 0H3.52C1.774 0 .326 1.298.049 3l12.83 8.586H0v8.276h12.88L.049 28.448c.277 1.702 1.725 3 3.471 3h.916l15.012-10.045v10.045h8.104V21.403l15.012 10.045h.916c1.746 0 3.194-1.298 3.471-3l-12.83-8.586H47v-8.276H34.12z"></path>
                  <path
                    fill="#FF4B55"
                    d="M25.931 0H21.07v13.241H0v4.966h21.069v13.241h4.862V18.207H47V13.24H25.931z"></path>
                  <path
                    fill="#FF4B55"
                    d="m2.277 31.217 17.128-11.355h-2.977L.848 30.191c.38.454.87.81 1.429 1.026M31.797 19.862H28.82L45.41 30.86a3.6 3.6 0 0 0 1.127-1.225zM.371 1.987l14.48 9.6h2.976L1.42.708c-.44.335-.801.773-1.049 1.278M30.528 11.586 46.136 1.24A3.5 3.5 0 0 0 44.696.22L27.55 11.586z"></path>
                </svg>
                {selectedLang.code}
                <ChevronDown size={15} />
              </button>

              {isLangOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 min-w-[150px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang);
                        setIsLangOpen(false);
                      }}
                      className="w-full cursor-pointer px-4 py-2 text-left hover:bg-slate-100 transition-colors text-sm">
                      {lang.code} - {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setIsCurrencyOpen(!isCurrencyOpen);
                  setIsLangOpen(false);
                }}
                className="px-4 py-2 cursor-pointer text-sm rounded-lg border border-slate-300 hover:border-slate-500 transition-all flex items-center gap-2 hover:bg-slate-100 transition-colors">
                {selectedCurrency}
                <ChevronDown size={15} />
              </button>

              {isCurrencyOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 min-w-[150px]">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => {
                        setSelectedCurrency(currency.code);
                        setIsCurrencyOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-100 transition-colors text-sm">
                      {currency.code} - {currency.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
        <div className="flex justify-between items-center mt-20">
          <div>
            <h2 className="text-6xl font-bold text-slate-800">
              Explore Armenia
              <br /> in Comfort
            </h2>
            <p className="text-lg w-4/5 mt-4 text-slate-600">
              Start your trip with the exclusive offers to visit
              Armenia. Relish the itinerary by exploring new places,
              having a comfortable stay, delicious meals, and transfer
              facilities
            </p>
          </div>
          <Image
            src="/images/yerevan.png"
            className="w-[80%] object-cover h-70 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl rounded-tl-[150px]"
            alt="yerevan view"
            width={1000}
            height={1000}
          />
        </div>
      </header>

      {(isLangOpen || isCurrencyOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsLangOpen(false);
            setIsCurrencyOpen(false);
          }}
        />
      )}

      <main>
        <section className="px-28 py-20">
          <div className="bg-white w-full rounded-xl pt-3 pb-6 px-8">
            <ul className="flex gap-10 justify-center items-center border-b border-gray-200 text-[#4B4B4B] pb-3">
              <li className="cursor-pointer  transition-all hover:text-teal-600 rounded-lg p-1 px-5">
                Stays
              </li>
              <li
                selected
                className="cursor-pointer  transition-all hover:text-teal-600 bg-teal-900/8 rounded-lg p-1 px-5">
                Tours
              </li>
              <li className="cursor-pointer  transition-all hover:text-teal-600 rounded-lg p-1 px-5">
                Transfers
              </li>
            </ul>
            <div className="mt-8 flex items-end gap-6">
              <div className="flex-1">
                <label htmlFor="tourType" className="text-sm">
                  Tour type
                </label>
                <br />
                <select
                  className="border w-full border-slate-300 p-2 rounded-lg px-2 mt-2"
                  name="tourType"
                  id="tourType">
                  <option value="">Location</option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="tourType" className="text-sm">
                  Tour type
                </label>
                <br />
                <select
                  className="border w-full border-slate-300 p-2 rounded-lg px-2 mt-2"
                  name="tourType"
                  id="tourType">
                  <option value="">Location</option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="" className="text-sm">
                  Starting Date
                </label>
                <br />
                <input
                  type="date"
                  className="border w-full mt-2 border-slate-300 p-2 rounded-lg"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="" className="text-sm">
                  Ending Date
                </label>
                <br />
                <input
                  type="date"
                  className="border w-full mt-2 border-slate-300 p-2 rounded-lg"
                />
              </div>
              <button className="bg-gradient-to-r from-blue-400 to-blue-500 cursor-pointer text-white px-6 p-2  rounded-lg hover:bg-amber-600 transition-colors">
                Search
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer></footer>
    </>
  );
};

export default MainPage;
