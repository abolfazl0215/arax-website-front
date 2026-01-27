/**
 * Privacy Policy Page
 */

import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";

export const metadata = {
  title: "Privacy Policy - Arax Tour & Travel",
  description: "Privacy policy for Arax Tour & Travel website.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 md:px-[10vw] mt-[15vw] md:mt-[10vw]">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Information We Collect
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We collect information that you provide directly to
                us, including name, email address, phone number, and
                travel preferences when you make a booking or create
                an account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We use the information we collect to process your
                bookings, communicate with you about your travel
                plans, send you promotional materials (with your
                consent), and improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Data Storage
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Your data is stored locally in your browser. We do not
                share your personal information with third parties
                without your consent, except as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Rights
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You have the right to access, update, or delete your
                personal information at any time through your account
                settings or by contacting us.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
