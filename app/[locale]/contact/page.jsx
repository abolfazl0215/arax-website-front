/**
 * Contact Us Page
 * Contact form and company information
 */

import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";

export const metadata = {
  title: "Contact Us - Arax Tour & Travel",
  description:
    "Get in touch with Arax Tour & Travel for any inquiries or support.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-[4vw] md:px-[10vw] mt-[15vw]  md:mt-[10vw]">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Contact Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Email
                  </h3>
                  <p className="text-gray-600">info@araxtour.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Phone
                  </h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Address
                  </h3>
                  <p className="text-gray-600">
                    123 Travel Street
                    <br />
                    Tourism City, TC 12345
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Business Hours
                  </h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="6"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                    required></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors font-medium">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
