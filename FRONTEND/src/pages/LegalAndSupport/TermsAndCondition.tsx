import { AnimatePresence } from "framer-motion";
import Animation from "../../utils/Animation";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative py-24 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="absolute top-0 inset-0 bg-gradient-to-b from-secondarylight/40 via-transparent to-primary z-10">
            <div className="absolute inset-0 bg-black opacity-30" />
          </div>
          <img
            src="https://www.shutterstock.com/shutterstock/videos/1086445067/thumb/8.jpg?ip=x480"
            alt="Background"
            className="absolute top-0 z-4 object-cover w-full h-full blur-sm"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-[11]">
            <h1 className="text-5xl font-extrabold mb-4">Terms & Conditions</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Please review the terms below before using our website or engaging
              in trade.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <AnimatePresence>
        <Animation initialY={-50}>
          <main className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-14">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-700">
                These Terms & Conditions govern your use of the MRP GLOBAL
                Traders website and services. By accessing or using our website,
                you agree to comply with these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Use of Website
              </h2>
              <p className="text-gray-700">
                You agree to use our website only for lawful purposes and in a
                way that does not infringe upon the rights of others. We reserve
                the right to restrict or terminate your access if we believe
                your actions violate any laws or our terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Intellectual Property
              </h2>
              <p className="text-gray-700">
                All content on this site, including text, images, branding, and
                product descriptions, are the property of MRP GLOBAL Traders
                unless otherwise stated. Unauthorized use, reproduction, or
                distribution is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Product Information
              </h2>
              <p className="text-gray-700">
                We strive to provide accurate and up-to-date product
                information. However, availability, specifications, and pricing
                may be subject to change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Orders & Payment
              </h2>
              <p className="text-gray-700">
                All orders are subject to acceptance and availability. Payment
                terms and conditions will be outlined in your invoice or
                purchase agreement. MRP GLOBAL Traders reserves the right to
                cancel or decline any order at its discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Shipping & Delivery
              </h2>
              <p className="text-gray-700">
                We aim to fulfill and ship orders within agreed timelines.
                However, we are not liable for delays caused by customs,
                transportation, or events beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-gray-700">
                MRP GLOBAL Traders shall not be held liable for any indirect,
                incidental, or consequential damages arising out of the use of
                our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Governing Law
              </h2>
              <p className="text-gray-700">
                These Terms & Conditions are governed by and construed in
                accordance with the laws of [Insert Country/State], and any
                disputes shall be subject to the exclusive jurisdiction of the
                courts therein.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Changes to Terms
              </h2>
              <p className="text-gray-700">
                MRP GLOBAL Traders reserves the right to update or change these
                Terms & Conditions at any time. Continued use of the site or
                services after changes are posted constitutes your agreement to
                the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Contact Us
              </h2>
              <p className="text-gray-700 mb-2">
                If you have any questions or concerns regarding these Terms &
                Conditions, feel free to reach out:
              </p>
              <div className="bg-gray-100 rounded-md p-4">
                <p className="text-gray-800">
                  📧 <strong>Email:</strong>{" "}
                  <a
                    href="mailto: mrpglobaltraders2004@gmail.com"
                    className="text-primary underline hover:text-primary-dark"
                  >
                    mrpglobaltraders2004@gmail.com
                  </a>
                </p>
              </div>
            </section>
          </main>
        </Animation>
      </AnimatePresence>
    </div>
  );
};

export default TermsAndConditions;
