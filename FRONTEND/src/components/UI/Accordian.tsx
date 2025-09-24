import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
    <div className="border border-primary/30 rounded-lg overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-md bg-white">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 flex justify-between items-center text-left group focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`faq-${question.replace(/\s+/g, "-").toLowerCase()}`}
        id={`faq-header-${question.replace(/\s+/g, "-").toLowerCase()}`}
      >
        <span className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 transform transition-transform duration-300 ${
            isOpen ? "rotate-180 text-primary" : "text-gray-500"
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 pb-5 text-gray-600 text-base leading-relaxed"
            id={`faq-${question.replace(/\s+/g, "-").toLowerCase()}`}
            role="region"
            aria-labelledby={`faq-header-${question
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
          >
            {answer}
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
    <section className={`${className} py-20`} id="faq">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Got questions? We’ve got answers to help you get started with MRP
            GLOBAL Traders.
          </p>
        </div>

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
