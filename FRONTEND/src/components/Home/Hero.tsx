import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Pause } from "lucide-react";
import herosection from "../../assets/video/herosection.mp4";
import Animation from "../../utils/Animation";
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
      <button
        onClick={togglePlayPause}
        className="z-10 hidden md:block lg:block absolute top-10 right-10 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-white/20 rounded-full  hover:bg-white/30 transition-all"
      >
        {isPlaying ? (
          <Pause className="w-7 h-7 text-gray-800" />
        ) : (
          <Play className="w-7 h-7 text-gray-800" />
        )}
      </button>

      {/* Gradient Overlay */}
      <div className="absolute top-0 inset-0 bg-gradient-to-b from-secondarylight/40 via-transparent to-primary">
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6  lg:px-8 text-center text-white">
        <Animation initialY={50}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Connecting Farmers to the World
          </h1>
        </Animation>

        <Animation initialY={100}>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            MRPGlobal Traders is your trusted platform for seamless import and
            export of high-quality fruits and food products.
          </p>
        </Animation>

        <Animation initialY={50}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
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
