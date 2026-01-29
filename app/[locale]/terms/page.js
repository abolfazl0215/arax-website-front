import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";

export const metadata = {
  title: "Terms and Conditions - Arax Tour & Travel",
  description:
    "Terms and conditions for using Arax Tour & Travel services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center md:text-left">
            Terms and Conditions
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-8">
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                By accessing and using the Arax Tour & Travel website, you
                accept and agree to be bound by the terms and provisions of this
                agreement.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                2. Booking and Payment
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                All bookings are subject to availability. Payment must be made
                in full at the time of booking unless otherwise specified.
                Prices are subject to change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                3. Cancellation Policy
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Cancellation policies vary by service type. Please refer to the
                specific terms for each booking. Cancellation fees may apply.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                4. Travel Documents
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                It is the customer's responsibility to ensure they have valid
                travel documents, including passports, visas, and any required
                vaccinations.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                5. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Arax Tour & Travel shall not be liable for any loss, damage, or
                inconvenience caused by circumstances beyond our control,
                including but not limited to weather, natural disasters, or
                government actions.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
