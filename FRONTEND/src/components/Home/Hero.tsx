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
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
      {/* --- Background Media --- */}
      <div className="absolute inset-0 w-full h-full">
        {/* Fallback Image (Shown while video loads) */}
        {!videoLoaded && (
          <img
            src="/Images/HomePageImages/Hero.png"
            alt="MRPGlobal Trade"
            className="absolute inset-0 w-full h-full object-cover z-0 blur-[2px]"
          />
        )}

        {/* Background Video */}
        <video
          ref={videoRef}
          src={herosection}
          className={`absolute inset-0 w-full h-full object-cover blur-[2px] transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadedData={() => setVideoLoaded(true)}
          loop
          autoPlay
          muted
          playsInline // Critical for mobile autoplay
        />

        {/* Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10" />
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white h-full flex flex-col justify-center items-center pt-16">
        <Animation initialY={30}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg max-w-5xl leading-[1.1]">
            Empowering Global Trade with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200">
              Quality Goods
            </span>
          </h1>
        </Animation>

        <Animation initialY={30}>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md font-medium">
            Connecting the world with the finest agricultural products through
            reliability, unmatched quality, and ethical sourcing.
          </p>
        </Animation>

        <Animation initialY={30}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4">
            <Link
              to="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-primary bg-white rounded-full hover:bg-gray-50 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-1"
            >
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white border-2 border-white/30 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </div>
        </Animation>
      </div>

      {/* --- Video Controls (Bottom Right) --- */}
      <button
        onClick={togglePlayPause}
        className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-30 p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 group shadow-lg"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 fill-current" />
        ) : (
          <Play className="w-6 h-6 fill-current ml-1" />
        )}
      </button>

      {/* --- Scroll Indicator (Hidden on very small screens) --- */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden md:block opacity-70">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-scroll-down"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
