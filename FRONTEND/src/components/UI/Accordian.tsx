import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "What products does MRP GLOBAL Traders export?",
    answer:
      "We export a wide variety of natural and high-quality products including spices, herbs, rock salt, palm jaggery, honey, dehydrated powders, and more.",
  },
  {
    question: "Are your products certified for international trade?",
    answer:
      "Yes, our products are certified with standards such as ISO 22000, FSSAI, Organic Certification, and HACCP where applicable.",
  },
  {
    question: "Do you offer bulk pricing or custom packaging?",
    answer:
      "Absolutely. We provide bulk order pricing and can accommodate custom labeling or packaging upon request.",
  },
  {
    question: "Which countries do you export to?",
    answer:
      "We export to clients across North America, Europe, the Middle East, and Asia. We are always open to expanding to new markets.",
  },
  {
    question: "How can I get a quote or place an order?",
    answer:
      "You can reach us via email at contact@mrpglobaltraders.com or use our contact form. Our team will respond within 24 hours.",
  },
  {
    question: "What is your typical lead time for orders?",
    answer:
      "Lead times vary by product and order size, but typically range from 2 to 4 weeks after order confirmation.",
  },
  {
    question: "Do you provide samples before bulk purchase?",
    answer:
      "Yes, sample products are available on request to help you assess quality before placing larger orders.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers, letters of credit, and other secure international payment methods to ensure smooth transactions.",
  },
  {
    question: "How do you ensure product quality during shipping?",
    answer:
      "Our logistics partners specialize in handling perishable goods, and we ensure proper packaging and cold chain management where necessary.",
  },
  {
    question: "Is there customer support available after purchase?",
    answer:
      "Yes, our customer support team is available to assist you with any inquiries or issues post-purchase.",
  },
];

const AccordionItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`group border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "bg-white border-primary/20 shadow-lg shadow-primary/5"
          : "bg-white border-gray-100 hover:border-primary/20 hover:shadow-md"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full px-6 py-5 flex justify-between items-center text-left cursor-pointer focus:outline-none "
        aria-expanded={isOpen}
      >
        <span
          className={`text-lg font-semibold transition-colors duration-300 pr-8 ${
            isOpen ? "text-primary" : "text-gray-800 group-hover:text-primary"
          }`}
        >
          {question}
        </span>
        <div
          className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
            isOpen
              ? "bg-primary text-white rotate-180 shadow-md"
              : "bg-gray-50 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary"
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-0">
              <p className="text-base text-gray-600 leading-relaxed border-t border-dashed border-gray-100 pt-4">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type AccordionProps = {
  count?: number;
  className?: string;
};

const Accordion: React.FC<AccordionProps> = ({
  count,
  className = "bg-gray-50",
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const safeCount = count ? Math.min(count, faqData.length) : faqData.length;
  const visibleFaqs = faqData.slice(0, safeCount);

  return (
    <section className={`${className} py-20 sm:py-24`} id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-xl mb-4">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We’ve compiled answers to the most common inquiries
            about our export services and products.
          </p>
        </div>

        {/* List */}
        <div className="space-y-4">
          {visibleFaqs.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={activeIndex === index}
              onClick={() => toggleIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accordion;
