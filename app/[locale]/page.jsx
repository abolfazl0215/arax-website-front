import Image from "next/image";
import ServicesBar from "../../Components/ServicesBar";
import SpecialTours from "../../Components/SpecialTours";
import Testimonials from "../../Components/Testimonials";
import WhyAraksGroup from "../../Components/WhyAraksGroup";
import SpecialStays from "../../Components/SpecialStay";
import Transfers from "../../Components/Transfers";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";

import { getTranslations } from "next-intl/server";

const locales = ["fa", "en"];
const defaultLocale = "fa";

const MainPage = async ({ params }) => {
  const { locale } = await params;

  const lang = locale || defaultLocale;

  // ترجمه‌ها
  const home = await getTranslations({
    locale: lang,
    namespace: "HomePage",
  });
  const nav = await getTranslations({
    locale: lang,
    namespace: "Navigation",
  });
  // const nav = useTranslations("Navigation");

  return (
    <>
      <header className="px-[4vw] md:px-[8vw] w-full grid-bg pb-[22vw] md:pb-[5vw]">
        <Navbar locale={locale} />
        <div className="flex flex-wrap justify-between items-center pt-[30vw] md:pt-[13vw] ">
          {/* <h1>{t("title")}</h1>
          <p>{t("description")}</p> */}
          <div className="order-1 md:w-[50%]">
            <h2 className="text-[10vw] md:text-6xl font-bold text-slate-800 leading-[12vw] md:leading-[5vw]">
              {home("title1")}
              <br /> {home("title2")}
            </h2>
            <p className="text-[4.3vw] md:text-lg w-[100%] md:w-4/5 mt-[2vw] md:mt-4 text-slate-600">
              {home("description")}
            </p>
          </div>
          <Image
            src="/images/yerevan.png"
            className="w-[100%]  md:w-[42%] mt-[5vw] md:mt-0 order-2  object-cover h-[50vw] md:h-70 rounded-tr-[40vw] rounded-br-[5vw] rounded-bl-[5vw] rounded-tl-[5vw] md:rounded-tr-2xl md:rounded-br-2xl md:rounded-bl-2xl md:rounded-tl-[150px]"
            alt="yerevan view"
            width={1000}
            height={1000}
          />
        </div>
      </header>

      {/* <LanguageSwitcher /> */}

      <main>
        {/* <h1>{t("title")}</h1> */}
        <ServicesBar locale={locale} />
        <SpecialTours />
        <Testimonials />
        <WhyAraksGroup />
        <SpecialStays />
        <Transfers />
        <Footer />
      </main>
      <footer></footer>
    </>
  );
};

export default MainPage;
