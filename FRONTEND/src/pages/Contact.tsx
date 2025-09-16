import React, { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, Send } from "lucide-react";
import { showtoast, showToastPromise } from "../utils/Toast";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import Animation from "../utils/Animation"; // Import the Animation component

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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
        "Please fill all required fields.",
        3000,
        "error"
      );
      return;
    }

    // Message Data ready to send
    const MessageData = {
      Name: name,
      Email: email,
      PhoneNo: phone,
      Message: message,
      ReceivedAt: formatDate(new Date()),
    };

    const SheetapiPromise = axios
      .post(import.meta.env.VITE_GOOGLE_SHEET_API_URL, MessageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setFormData({ name: "", email: "", phone: "", message: "" });
        return {
          message: "Your message has been sent",
        };
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject({
          message:
            "Something Went wrong! Please try again after a few seconds.",
          error: error,
        });
      })
      .finally(() => {
        setLoading(false);
      });

    showToastPromise(
      SheetapiPromise,
      {
        loading: "Message Sending... please wait!",
        success: (d: { message: string }) =>
          `${d.message} to our team. Thanks for reaching out! We’ll get back to you shortly.`,
        error: (err: { message: string; error: any }) =>
          ` ${err?.message || "Something went wrong!"}`,
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
            src="https://img.etimg.com/thumb/width-420,height-315,imgsize-166651,resizemode-75,msid-57750623/news/economy/agriculture/fruit-importer-ig-international-forayes-into-export-markets-with-bananas-grapes-and-onions.jpg"
            className="absolute top-0 z-4 object-cover w-full h-full blur-sm"
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-[11]">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-200">
              Get in touch with our trade specialists for personalized
              assistance
            </p>
          </div>
        </section>

        {/* Contact Information Section */}

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Animation initialY={-100}>
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Get In Touch
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
                        Address
                      </h3>
                      <p className="text-gray-600">
                        Global Trade Center, Mumbai, Maharashtra 400001, India
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
                        Phone
                      </h3>
                      <p className="text-gray-600">
                        +91 98765 43210
                        <br />
                        +1 (555) 123-4567
                      </p>
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
                        Email
                      </h3>
                      <p className="text-gray-600">
                        info@mrpglobaltraders.com
                        <br />
                        sales@mrpglobaltraders.com
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
                        WhatsApp
                      </h3>
                      <p className="text-gray-600">
                        For instant support and quick orders
                      </p>
                      <a
                        href="https://wa.me/919876543210"
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
                      Send us a message
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
                          placeholder="Your full name"
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
                          Phone Number{" "}
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
                          Message{" "}
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
                          placeholder="Tell us about your requirements, preferred products, quantities, etc."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                        disabled={loading}
                      >
                        <Send className="h-5 w-5" />
                        <span>{loading ? "Sending..." : "Send Message"}</span>
                      </button>
                    </form>
                  </div>
                </div>
              </Animation>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <Animation initialX={100}>
          <section className="mt-16">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Find Us
              </h3>
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Interactive map would be embedded here
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Global Trade Center, Mumbai, Maharashtra, India
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
