// components/PrivacyPolicy.tsx

import React from "react";
import { AnimatePresence } from "framer-motion";
import Animation from "../../utils/Animation";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
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
            <h1 className="text-5xl font-extrabold mb-4"> Privacy Policy</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Learn how MRP GLOBAL Traders collects, uses, and protects your
              information in full transparency.
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
              <p className="text-gray-700 leading-relaxed">
                MRP GLOBAL Traders ("we", "our", or "us") is committed to
                protecting your privacy. This Privacy Policy explains how we
                collect, use, store, and safeguard your personal data when you
                interact with our website or engage with us directly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Information We Collect
              </h2>
              <p className="text-gray-700 mb-2">
                We may collect the following information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Full name, email address, and phone number</li>
                <li>Business name, address, and type of service</li>
                <li>Details of inquiries or transactions</li>
                <li>
                  Browser data such as IP address, location, and device type
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Respond to inquiries and provide support</li>
                <li>Process and fulfill trade or export orders</li>
                <li>Improve website performance and customer experience</li>
                <li>Meet legal, regulatory, or compliance obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Sharing of Information
              </h2>
              <p className="text-gray-700">
                We do not sell or rent your personal data. We may share data
                only with trusted third-party partners when essential for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
                <li>Shipping and logistics services</li>
                <li>Payment gateways or financial processors</li>
                <li>
                  Compliance with government regulations or legal requests
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Data Security
              </h2>
              <p className="text-gray-700">
                We apply industry-standard measures to safeguard your
                information from unauthorized access, misuse, alteration, or
                loss — including encryption, secure servers, and access control
                mechanisms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Your Rights
              </h2>
              <p className="text-gray-700 mb-2">
                You have the right to access, correct, or delete your data. To
                make a request, please contact our support team.
              </p>
              <div className="bg-gray-100 rounded-md p-4">
                <p className="text-gray-800">
                  📧 <strong>Email:</strong>{" "}
                  <a
                    href="mailto:contact@mrpglobaltraders.com"
                    className="text-primary underline hover:text-primary-dark"
                  >
                    contact@mrpglobaltraders.com
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Third-Party Links
              </h2>
              <p className="text-gray-700">
                Our website may contain links to external sites. MRP GLOBAL
                Traders is not responsible for the privacy practices or content
                on third-party websites. We encourage you to review their
                privacy policies before providing any data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Policy Updates
              </h2>
              <p className="text-gray-700">
                This Privacy Policy may be revised periodically. Any updates
                will be posted on this page with an updated effective date.
                Continued use of our services constitutes your agreement to the
                revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Contact Us
              </h2>
              <p className="text-gray-700 mb-2">
                If you have any questions or concerns regarding our Privacy
                Policy, please contact us:
              </p>
              <div className="bg-gray-100 rounded-md p-4">
                <p className="text-gray-800">
                  📧 <strong>Email:</strong>{" "}
                  <a
                    href="mailto:contact@mrpglobaltraders.com"
                    className="text-primary underline hover:text-primary-dark"
                  >
                    contact@mrpglobaltraders.com
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

export default PrivacyPolicy;
