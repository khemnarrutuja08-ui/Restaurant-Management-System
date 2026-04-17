import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { navigate } = useContext(AppContext);

  const images = [
    "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">

      {/* Background Images with zoom effect */}
      {images.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-center bg-cover transition-all duration-1000 scale-105"
          style={{
            backgroundImage: `url(${img})`,
            opacity: index === currentIndex ? 1 : 0,
            transform: index === currentIndex ? "scale(1.05)" : "scale(1)",
          }}
        />
      ))}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>

      {/* Floating blur glow effect */}
      <div className="absolute w-[500px] h-[500px] bg-orange-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-yellow-400/10 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 animate-fadeIn">

        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Welcome to <span className="text-orange-400">Our Restaurant</span>
        </h1>

        <p className="text-base md:text-xl mb-10 max-w-2xl mx-auto text-gray-200">
          Experience the taste of perfection — where every bite tells a story
          and every meal feels like a celebration.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">

          <button
            onClick={() => navigate("/menu")}
            className="group relative px-7 py-3 rounded-full bg-orange-500 text-black font-semibold overflow-hidden shadow-lg transition-all hover:scale-105"
          >
            <span className="relative z-10">All Menus</span>
            <div className="absolute inset-0 bg-orange-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
          </button>

          <button
            onClick={() => navigate("/book-table")}
            className="px-7 py-3 rounded-full border-2 border-white text-white font-semibold backdrop-blur-md hover:bg-white hover:text-black transition-all hover:scale-105"
          >
            Book a Table
          </button>
        </div>
      </div>

      {/* Optional subtle scroll indicator */}
      <div className="absolute bottom-6 text-white/60 text-sm animate-bounce">
        Scroll down ↓
      </div>

    </section>
  );
};

export default Hero;
