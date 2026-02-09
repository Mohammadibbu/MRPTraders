import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // SEO
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
import { GoogleSheetApi } from "../utils/AxiosInstance";
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

  const whatsappNumber = contactDetails.phoneNumber;
  const defaultMessage =
    "Hi there! I'm interested in sourcing high-quality agricultural products. I'd like to learn more about your export services.";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    defaultMessage,
  )}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
      setLoading(false);
      showtoast("Missing Fields", "Please complete all fields.", "error");
      return;
    }

    const formBody = new FormData();
    formBody.append("Name", name);
    formBody.append("Email", email);
    formBody.append("PhoneNo", phone);
    formBody.append("Message", message);
    formBody.append("ReceivedAt", new Date().toLocaleString());

    const fetchPromise = fetch(GoogleSheetApi, {
      method: "POST",
      body: formBody,
    }).then(async (response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }
    });

    showToastPromise(fetchPromise, {
      loading: "Sending...",
      success: (data) => {
        if (data.result === "success") {
          setFormData({ name: "", email: "", phone: "", message: "" });
          return "Message sent successfully!";
        } else {
          throw new Error(data.message || "Submission failed");
        }
      },
      error: () => "Failed to send message. Please try again.",
    });

    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      content: Array.isArray(contactDetails.email)
        ? contactDetails.email
        : [contactDetails.email],
      color: "text-orange-500",
      bg: "bg-orange-50",
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
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-primary/20 overflow-x-hidden">
      <Helmet>
        <title>Contact Us | MRP Global Traders - Export Inquiries</title>
        <meta
          name="description"
          content="Get in touch with MRP Global Traders for bulk agricultural export inquiries. Contact us via email, phone, or WhatsApp for sourcing spices, fruits, and millets."
        />
        <link rel="canonical" href="https://mrpglobaltraders.com/contact" />
      </Helmet>

      <AnimatePresence>
        {/* --- Breadcrumb --- */}
        <div className="bg-white/80 border-b sticky top-0 z-30 backdrop-blur-md">
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
        <section className="relative h-[35vh] md:h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/Images/ContactPage/Hero.png"
              alt="Contact Us"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90" />
          </div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight"
            >
              Get in <span className="text-primary">Touch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-gray-200 font-medium max-w-2xl mx-auto"
            >
              Our trade experts are ready to assist you with custom sourcing and
              global logistics.
            </motion.p>
          </div>
        </section>

        {/* --- Main Content Grid --- */}
        <section className="py-10 md:py-20 px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-12 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
              {/* LEFT COLUMN */}
              <div className="lg:col-span-5 space-y-4 md:space-y-6">
                {contactInfo.map((info, index) => (
                  <Animation key={index} initialX={-30} delay={index * 0.1}>
                    <div
                      className={`flex items-start p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md group`}
                    >
                      <div
                        className={`p-3 rounded-xl ${info.bg} mr-4 shrink-0 group-hover:scale-110 transition-transform`}
                      >
                        <info.icon
                          className={`w-5 h-5 md:w-6 h-6 ${info.color}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                          {info.title}
                        </h3>

                        {Array.isArray(info.content) ? (
                          <div className="flex flex-col space-y-1">
                            {info.content.map((email) => (
                              <a
                                key={email}
                                href={`mailto:${email}`}
                                className="text-gray-600 text-sm hover:text-primary transition-colors break-all"
                              >
                                {email}
                              </a>
                            ))}
                          </div>
                        ) : info.link ? (
                          <a
                            href={info.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 text-sm hover:text-primary transition-colors block break-words"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-gray-600 text-sm leading-relaxed break-words">
                            {info.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </Animation>
                ))}

                {/* Office Hours */}
                <Animation initialX={-30} delay={0.4}>
                  <div className="flex items-start p-5 md:p-6 bg-gray-900 rounded-2xl shadow-lg text-white">
                    <div className="p-3 rounded-xl bg-white/10 mr-4 shrink-0">
                      <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-white mb-1">
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
                <Animation initialX={30}>
                  <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl border border-gray-100 p-6 md:p-10 lg:p-12">
                    <div className="mb-8 text-center sm:text-left">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Send us a Message
                      </h2>
                      <p className="text-gray-500 mt-2 text-sm md:text-base">
                        Fill out the form below and we will get back to you
                        within 24 hours.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-5 md:space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name <span className="text-primary">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number <span className="text-primary">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={
                              contactDetails?.phoneNumber ?? "Your Phone Number"
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address <span className="text-primary">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Your Requirement{" "}
                          <span className="text-primary">*</span>
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about the products you are interested in..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                        />
                      </div>
                      <div className="pt-2">
                        <GradientButton
                          type="submit"
                          variant="primary"
                          size="lg"
                          icon={Send}
                          loading={loading}
                          className="w-full sm:w-auto min-w-[180px]"
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

        {/* FAQ Section */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <Accordion count={5} className="bg-gray-50" />
        </div>
      </AnimatePresence>

      <JoinUsSection />
    </div>
  );
};

export default Contact;
