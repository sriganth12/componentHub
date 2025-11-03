import React, { useState, useEffect, useCallback } from 'react';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import TruckIcon from './icons/TruckIcon';
import CubeIcon from './icons/CubeIcon';

const slides = [
  {
    icon: ShieldCheckIcon,
    title: "Quality Guaranteed",
    description: "Every component is rigorously tested to meet the highest quality standards. Genuine parts for genuine performance.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: TruckIcon,
    title: "Fast & Reliable Shipping",
    description: "Get your parts delivered right to your doorstep with our express shipping options, anywhere in the country.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: CubeIcon,
    title: "Unmatched Selection",
    description: "Browse the largest inventory of mobile components from all major brands. If you need it, we have it.",
    gradient: "from-green-500 to-teal-600",
  }
];

const CarouselBanner: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-64 rounded-2xl shadow-lg overflow-hidden mb-8 animate-fadeIn">
      {slides.map((slide, index) => {
        const Icon = slide.icon;
        return (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-gradient-to-br ${slide.gradient} p-8 text-white transition-opacity duration-700 ease-in-out ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="flex items-center h-full">
              <div className="w-1/4 flex justify-center">
                <Icon className="w-20 h-20 opacity-80" />
              </div>
              <div className="w-3/4 pl-6">
                <h2 className="text-3xl font-bold tracking-tight">{slide.title}</h2>
                <p className="mt-2 text-lg opacity-90">{slide.description}</p>
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselBanner;