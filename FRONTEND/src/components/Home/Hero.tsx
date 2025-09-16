import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Pause } from "lucide-react";
import herosection from "../../assets/video/herosection.mp4";
import Animation from "../../utils/Animation";
import GradientButton from "../UI/GradientButton";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current?.pause();
      } else {
        videoRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative h-[600px] md:h-screen sm:h-screen lg:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div>
        {!videoLoaded && (
          <>
            <div className="fixed -z-[100] top-0 left-0 w-full h-full bg-secondarylight"></div>
            <img
              src="https://importexportfederation.com/wp-content/uploads/2023/11/exotic-fruits-berries-spanish-market-1.jpg"
              alt="Fallback Image"
              className="absolute top-0 z-1 object-cover w-full h-full"
            />
          </>
        )}

        <video
          ref={videoRef}
          src={herosection}
          className={`absolute -z-[100] top-0 left-0 w-full h-full object-cover blur-sm transition-opacity duration-700 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadedData={() => setVideoLoaded(true)}
          loop
          autoPlay
          muted
        ></video>
      </div>

      {/* Play/Pause Button */}
      <motion.button
        onClick={togglePlayPause}
        className="z-10 hidden md:block lg:block absolute top-10 right-10 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {isPlaying ? (
          <Pause className="w-7 h-7 text-gray-800" />
        ) : (
          <Play className="w-7 h-7 text-gray-800" />
        )}
      </motion.button>

      {/* Gradient Overlay */}
      <div className="absolute top-0 inset-0 bg-gradient-to-b from-secondarylight/40 via-transparent to-primary/80">
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6  lg:px-8 text-center text-white">
        <Animation initialY={100}>
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">Connecting Farmers</span>
            <span className="block bg-gradient-to-r from-secondary to-dustyTaupe bg-clip-text text-transparent">
              to the World
            </span>
          </motion.h1>
        </Animation>

        <Animation initialY={150}>
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-100"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <strong className="text-white">MRPGlobal Traders</strong> is your trusted platform for seamless import and
            export of <span className="text-secondary font-semibold">high-quality fruits</span> and food products.
          </motion.p>
        </Animation>

        <Animation initialY={200}>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <GradientButton
              onClick={() => window.location.href = '/products/imports'}
              variant="primary"
              size="lg"
              icon={ArrowRight}
              className="min-w-[200px] animate-glow"
            >
              Browse Products
            </GradientButton>
            
            <GradientButton
              onClick={() => window.location.href = '/contact'}
              variant="outline"
              size="lg"
              className="min-w-[200px] bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10"
            >
              Get Started
            </GradientButton>
          </motion.div>
        </Animation>
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-1/4 left-10 w-4 h-4 bg-secondary rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/3 right-20 w-6 h-6 bg-dustyTaupe rounded-full opacity-40"
          animate={{
            y: [0, 30, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-white rounded-full opacity-50"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
              to="/products"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Browse Products</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </Animation>
      </div>
    </div>
  );
};

export default Hero;
