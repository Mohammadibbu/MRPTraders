import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CreditCard, Truck, Shield, Clock } from "lucide-react";
import Animation from "../../utils/Animation";
import ImageWithLoader from "../../utils/imageLoader";

const TransactionsSection: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title Animation */}
        <Animation initialY={-50}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Seamless & Secure Transactions
          </h2>
        </Animation>

        {/* Description Animation */}
        <Animation initialY={-50}>
          <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            Whether browsing products, placing orders, or making payments,
            MRPGlobal Traders ensures a hassle-free and secure experience. With
            multiple payment methods and integrated logistics, we simplify
            global trading for you.
          </p>
        </Animation>

        {/* Transaction Cards Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Secure Payments Card */}
          <Animation initialX={-50} delay={0.2}>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                Multiple trusted payment gateways to suit your preferences.
              </p>
            </div>
          </Animation>

          {/* Global Shipping Card */}
          <Animation initialX={50} delay={0.4}>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Global Shipping
              </h3>
              <p className="text-gray-600">
                Reliable logistics partners delivering your orders worldwide.
              </p>
            </div>
          </Animation>

          {/* Trade Protection Card */}
          <Animation initialY={50} delay={0.6}>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Buyer Protection
              </h3>
              <p className="text-gray-600">
                Secure transactions with comprehensive buyer safeguards.
              </p>
            </div>
          </Animation>

          {/* Real-time Tracking Card */}
          <Animation initialY={-50} delay={0.8}>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-time Tracking
              </h3>
              <p className="text-gray-600">
                Monitor your shipments at every step from farm to doorstep.
              </p>
            </div>
          </Animation>
        </div>

        {/* Image Fade-In Animation */}
        <Animation initialY={50} delay={1}>
          <ImageWithLoader
            src={`/Images/HomePageImages/TransactionSection.png`}
            alt="Fresh global trade"
            className={`w-full max-w-2xl mx-auto rounded-lg shadow-lg mb-9`}
          />
        </Animation>

        {/* Button Animation */}
        <Link
          to="/contact"
          className="group  inline-flex items-center space-x-2 bg-gradient-to-r from-primary  to-primary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
        >
          <span>Start Trading Now</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 duration-300" />
        </Link>
      </div>
    </section>
  );
};

export default TransactionsSection;
