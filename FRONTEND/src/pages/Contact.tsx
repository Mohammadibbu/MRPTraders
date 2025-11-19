import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Send,
  Clock,
  Home,
  ChevronRight,
} from "lucide-react";
import { showtoast, showToastPromise } from "../utils/Toast";
import { AnimatePresence, motion } from "framer-motion";
import Animation from "../utils/Animation";
import GradientButton from "../components/UI/GradientButton";
import axios, { GoogleSheetApi } from "../utils/AxiosInstance";
import Accordion from "../components/UI/Accordian";
import { contactDetails } from "../utils/ContactDetails";
import JoinUsSection from "../components/Home/JoinUsSection";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // WhatsApp Logic
  const whatsappNumber = contactDetails.phoneNumber;
  const defaultMessage =
    "Hi there! I'm interested in sourcing high-quality agricultural products. I'd like to learn more about your export services.";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  const formatDate = (date: Date): string => {
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

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

    const MessageData = {
      Name: name,
      Email: email,
      PhoneNo: phone,
      Message: message,
      ReceivedAt: formatDate(new Date()),
    };

    const SheetapiPromise = axios
      .post(GoogleSheetApi, MessageData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setFormData({ name: "", email: "", phone: "", message: "" });
        return { message: "Your message was successfully sent" };
      })
      .catch((error) => {
        console.error(error);
        throw new Error("An error occurred while sending your message.");
      })
      .finally(() => setLoading(false));

    showToastPromise(
      SheetapiPromise,
      {
        loading: "Sending your message...",
        success: (d: { message: string }) =>
          `${d.message}! We will get back to you shortly.`,
        error: (err: { message: string }) =>
          `${err?.message || "Something went wrong!"}`,
      },
      4000
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      content: contactDetails.location,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      icon: Phone,
      title: "Phone Number",
      content: contactDetails.phoneNumber,
      color: "text-blue-500",
      bg: "bg-blue-50",
      link: `tel:${contactDetails.phoneNumber}`,
    },
    {
      icon: Mail,
      title: "Email Address",
      content: contactDetails.email,
      color: "text-orange-500",
      bg: "bg-orange-50",
      link: `mailto:${contactDetails.email}`,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      content: "Chat with us directly",
      color: "text-green-500",
      bg: "bg-green-50",
      link: whatsappURL,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-primary/20">
      <AnimatePresence>
        {/* --- Breadcrumb Navigation --- */}
        <div className="bg-white/80 border-b sticky top-0 z-30 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
            <nav className="flex items-center text-sm text-gray-500 font-medium">
              <Link
                to="/"
                className="hover:text-primary transition-colors p-1 rounded-md hover:bg-gray-100"
              >
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4 mx-2 text-gray-300 shrink-0" />
              <span className="text-gray-900 font-semibold">Contact Us</span>
            </nav>
          </div>
        </div>

        {/* --- Hero Section --- */}
        <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/Images/ContactPage/Hero.png"
              alt="Contact Us"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90" />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight"
            >
              Get in <span className="text-primary">Touch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-200 font-medium max-w-2xl mx-auto"
            >
              Our trade experts are ready to assist you with custom sourcing and
              global logistics.
            </motion.p>
          </div>
        </section>

        {/* --- Main Content Grid --- */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              {/* LEFT COLUMN: Contact Info Cards */}
              <div className="lg:col-span-5 space-y-6">
                {contactInfo.map((info, index) => (
                  <Animation key={index} initialX={-50} delay={index * 0.1}>
                    <a
                      href={info.link}
                      target={info.link ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`flex items-start p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md group ${
                        info.link ? "cursor-pointer hover:-translate-y-1" : ""
                      }`}
                    >
                      <div
                        className={`p-3 rounded-xl ${info.bg} mr-5 group-hover:scale-110 transition-transform`}
                      >
                        <info.icon className={`w-6 h-6 ${info.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {info.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed break-words">
                          {info.content}
                        </p>
                      </div>
                    </a>
                  </Animation>
                ))}

                {/* Office Hours Card */}
                <Animation initialX={-50} delay={0.4}>
                  <div className="flex items-start p-6 bg-gray-900 rounded-2xl shadow-lg text-white">
                    <div className="p-3 rounded-xl bg-white/10 mr-5">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        Office Hours
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Mon - Sat: 9:00 AM - 6:00 PM
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Support available 24/7 via WhatsApp
                      </p>
                    </div>
                  </div>
                </Animation>
              </div>

              {/* RIGHT COLUMN: Form */}
              <div className="lg:col-span-7">
                <Animation initialX={50}>
                  <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-6 sm:p-10 lg:p-12">
                    <div className="mb-8">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Send us a Message
                      </h2>
                      <p className="text-gray-500 mt-2">
                        Fill out the form below and we will get back to you
                        within 24 hours.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Full Name <span className="text-primary">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                          />
                        </div>
                        {/* Phone */}
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Phone Number <span className="text-primary">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Email Address <span className="text-primary">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Your Requirement{" "}
                          <span className="text-primary">*</span>
                        </label>
                        <textarea
                          name="message"
                          id="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about the products you are interested in..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <GradientButton
                          type="submit"
                          variant="primary"
                          size="lg"
                          icon={Send}
                          loading={loading}
                          className="w-full sm:w-auto min-w-[200px] shadow-xl shadow-primary/20"
                        >
                          {loading ? "Sending..." : "Send Message"}
                        </GradientButton>
                      </div>
                    </form>
                  </div>
                </Animation>
              </div>
            </div>
          </div>
        </section>

        {/* --- Map Section --- */}
        {/* <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Animation initialY={50}>
              <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-inner h-[400px] w-full relative"> */}
        {/* Google Maps Embed */}
        {/* <iframe
                  title="MRPGlobal Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.2)" }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    contactDetails?.location
                  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                ></iframe> */}

        {/* Map Overlay Card */}
        {/* <div className="absolute bottom-4 left-4 bg-white p-4 rounded-xl shadow-lg max-w-xs hidden sm:block">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                    Headquarters
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {contactDetails.location}
                  </p>
                </div>
              </div>
            </Animation>
          </div>
        </section> */}

        {/* --- FAQ Section --- */}
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none"></div>
          <Accordion count={5} className="bg-gray-50" />
        </div>
      </AnimatePresence>

      <JoinUsSection />
    </div>
  );
};

export default Contact;
