import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CreditCard, Truck, Shield, Clock } from "lucide-react";

const TransactionsSection: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Effortless Transactions
        </h2>
        <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
          From browsing and placing orders to making payments and tracking
          shipments, MRPGlobal Traders offers a smooth and secure transactional
          experience. Multiple payment options and integration with logistics
          services make global trade easy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Secure Payments
            </h3>
            <p className="text-gray-600">
              Multiple payment gateways for your convenience
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Global Shipping
            </h3>
            <p className="text-gray-600">
              Integrated logistics for worldwide delivery
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Trade Protection
            </h3>
            <p className="text-gray-600">
              Secure transactions with buyer protection
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Real-time Tracking
            </h3>
            <p className="text-gray-600">
              Track your orders from farm to destination
            </p>
          </div>
        </div>

        <div className="mb-8">
          <img
            src="https://media.assettype.com/outlookmoney/2024-07/6352e65d-fa4e-415a-936d-ac114bc4f06b/shutterstock_2037588638.jpg?w=801&auto=format%2Ccompress&fit=max&format=webp&dpr=1.0"
            alt="Easy Transactions"
            className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
          />
        </div>

        <Link
          to="/client/dashboard"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#5F1A35] to-[#CCBBAE] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
        >
          <span>Start Trading Now</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default TransactionsSection;
