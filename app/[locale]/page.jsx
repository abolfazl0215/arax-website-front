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
import FirstSectionLanding from "../../Components/FirstSectionLanding";
import BookingModal from "../../Components/BookingModal";

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
        <FirstSectionLanding
          title1={home("title1")}
          title2={home("title2")}
          description={home("description")}
        />
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
