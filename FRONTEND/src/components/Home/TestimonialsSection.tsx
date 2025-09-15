import React from "react";
import { Quote, Star } from "lucide-react";

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "John Doe",
      location: "Farmer, Thailand",
      quote:
        "MRPGlobal Traders has helped me export my rambutan to new international markets. The platform makes the process simple and efficient.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    },
    {
      name: "Jane Smith",
      location: "Business Owner, USA",
      quote:
        "We've been able to source high-quality fruits directly from local farmers in Southeast Asia. The platform's reliability and ease of use are second to none.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    },
    {
      name: "Raj Patel",
      location: "Exporter, India",
      quote:
        "The quality assurance and certification process gives our international buyers confidence in our products. Sales have increased by 300% since joining.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
    },
  ];

  return (
    <section className="bg-secondarylight py-12  ">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Testimonials
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Our clients speak for us. Hear how MRPGlobal Traders has helped
          businesses and farmers across the world.
        </p>

        {/* Scrolling Wrapper */}
        <div className="overflow-hidden relative ">
          <div className="absolute top-0 left-0 w-full h-full  bg-gradient-to-r from-secondarylight via-transparent to-secondarylight z-10"></div>
          <div className="flex space-x-6 animate-scroll py-4  ">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-tr from-primary/30 via-secondary via-30% to-primary/40 rounded-lg shadow-lg p-4 w-72 flex-shrink-0"
              >
                <div className="flex items-center justify-center mb-4">
                  <Quote className="h-6 w-6 text-primary" />
                </div>

                <div className="flex items-center justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-gray-700 mb-4 italic leading-relaxed text-sm">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center justify-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-4 object-cover"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
