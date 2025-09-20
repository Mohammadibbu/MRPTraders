import React from "react";
import Accordion from "../../components/UI/Accordian";

const FAQPage: React.FC = () => {
  return (
    <main className="min-h-screen ">
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
            <h1 className="text-5xl font-extrabold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Have questions? Find answers to the most common queries about MRP
              GLOBAL Traders.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <Accordion />

      {/* Contact Prompt */}
      <section className="py-10 text-center bg-primary text-secondarylight">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold mb-4">Still have questions?</h2>
          <p className="mb-6 text-secondary">
            We're here to help! Reach out to us anytime and we'll get back to
            you promptly.
          </p>
          <a
            href="/contact"
            className="inline-block bg-secondary hover:bg-primary-dark text-primary font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
};

export default FAQPage;
