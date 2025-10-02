import React, { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, Send } from "lucide-react";
import { showtoast, showToastPromise } from "../utils/Toast";

import { AnimatePresence } from "framer-motion";
import Animation from "../utils/Animation"; // Import the Animation component
import GradientButton from "../components/UI/GradientButton";
import axios, { GoogleSheetApi } from "../utils/AxiosInstance";
import Accordion from "../components/UI/Accordian";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const whatsappNumber = "919356380766";
  const defaultMessage =
    "Hi there! I'm interested in sourcing high-quality agricultural products. I'd like to learn more about your export services.";

  // Encode message for URL
  const encodedMessage = encodeURIComponent(defaultMessage);

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year},${hours}:${minutes}:${seconds}`;
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
      setLoading(false);
      showtoast(
        "Missing Fields",
        "Please complete all required fields before submitting.",
        "error"
      );
      return;
    }

    // Prepare message data for submission
    const MessageData = {
      Name: name,
      Email: email,
      PhoneNo: phone,
      Message: message,
      ReceivedAt: formatDate(new Date()),
    };

    const SheetapiPromise = axios
      .post(GoogleSheetApi, MessageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setFormData({ name: "", email: "", phone: "", message: "" });
        return {
          message: "Your message was successfully sent",
        };
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject({
          message:
            "An error occurred while sending your message. Please try again shortly.",
          error: error,
        });
      })
      .finally(() => {
        setLoading(false);
      });

    showToastPromise(
      SheetapiPromise,
      {
        loading: "Sending your message, please wait...",
        success: (d: { message: string }) =>
          `${d.message}! Thank you for contacting us. We will respond as soon as possible.`,
        error: (err: { message: string; error: any }) =>
          `${err?.message || "Something went wrong!"}`,
      },
      4000
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence>
        {/* Hero Section */}
        <section className="py-20 relative">
          <div className="absolute top-0 inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary/25 z-10">
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>
          <img
            src="/Images/ContactPage/Hero.png"
            className="absolute top-0 z-4 object-cover w-full h-full blur-sm"
            alt="Contact Background"
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-[11]">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-200">
              Reach out to our trade experts for customized support and guidance
            </p>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Animation initialY={-100}>
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                We're Here to Help
              </h2>
            </Animation>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <Animation initialX={-100}>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-primary rounded-lg p-3">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Serving customers from
                      </h3>
                      <p className="text-gray-600">
                        MRP Global Trade Center, Chennai
                      </p>
                    </div>
                  </div>
                </Animation>
                <Animation initialX={-100}>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-primary rounded-lg p-3">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Phone Number
                      </h3>
                      <p className="text-gray-600">+91 935 638 0766</p>
                    </div>
                  </div>
                </Animation>
                <Animation initialX={-100}>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-primary rounded-lg p-3">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Email Addresses
                      </h3>
                      <p className="text-gray-600">
                        mrpglobaltraders2004@gmail.com
                        {/* <br />
                        sales@mrpglobaltraders.com */}
                      </p>
                    </div>
                  </div>
                </Animation>
                <Animation initialX={-100}>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-green-600 rounded-lg p-3">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        WhatsApp Support
                      </h3>
                      <p className="text-gray-600">
                        Instant support and quick order placement via WhatsApp
                      </p>
                      <a
                        href={whatsappURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium mt-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Chat with us on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </Animation>
              </div>

              <Animation initialX={100}>
                <div>
                  <div className="bg-secondarylight rounded-lg shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Send Us a Message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Full Name
                          <span className="text-primary font-extrabold">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:shadow-xl focus:border-primary outline-none"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email Address
                          <span className="text-primary font-extrabold">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:shadow-xl focus:border-primary outline-none"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Phone Number
                          <span className="text-primary font-extrabold">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:shadow-xl focus:border-primary outline-none"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Message
                          <span className="text-primary font-extrabold">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:shadow-xl focus:border-primary outline-none resize-none"
                          placeholder="Share your requirements, preferred products, quantities, or questions."
                        />
                      </div>
                      <GradientButton
                        type="submit"
                        variant="primary"
                        size="md"
                        icon={Send}
                        iconPosition="right"
                        loading={loading}
                        className="shadow-md w-full"
                        disabled={loading}
                      >
                        {loading ? " Sending Message..." : " Send Message"}
                      </GradientButton>
                    </form>
                  </div>
                </div>
              </Animation>
            </div>
          </div>
        </section>
        {/* Faq */}

        <Accordion count={5} className="bg-secondarylight" />

        {/* Map Section */}
        <Animation initialX={100}>
          <section className="">
            <div className="bg-white p-10 rounded-lg shadow-lg ">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Find Us
              </h3>
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Interactive map coming soon</p>
                    <p className="text-sm text-gray-400 mt-2">
                      MRP Global Traders , chennai, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Animation>
      </AnimatePresence>
    </div>
  );
};

export default Contact;
