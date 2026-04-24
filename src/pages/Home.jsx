import React from 'react';

const Home = () => (
  <div className="relative bg-cover bg-center overflow-hidden"
    style={{ backgroundImage: `url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920)` }}>
    
    {/* Enhanced gradient overlay with vignette effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900/95 to-black opacity-90"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

    {/* Animated gradient orbs for visual interest */}
    <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-red-700/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>

    <div className="relative h-full flex flex-col items-center justify-center px-8 text-center text-white">
      
      {/* Main heading with enhanced styling */}
      <div className="mb-8 space-y-4">
        <div className="inline-block mb-4">
          <span className="text-sm font-semibold tracking-widest uppercase text-orange-400 bg-orange-400/10 px-4 py-2 rounded-full border border-orange-400/30">
            Premium Fitness Equipment
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tight">
          Welcome to{" "}
          <span className="block mt-2 bg-gradient-to-r from-orange-400 via-red-500 to-red-700 text-transparent bg-clip-text">
            GymStore
          </span>
        </h1>
        
        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
      </div>

      {/* Enhanced description */}
      <p className="text-xl md:text-2xl max-w-2xl mb-12 text-neutral-300 font-light leading-relaxed">
        Discover premium gym equipment and supplements designed to elevate your fitness journey.
        <span className="block mt-2 text-orange-400 font-semibold">Unbeatable quality. Unbeatable prices.</span>
      </p>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <a href="/products">
          <button className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-orange-400 to-red-700 hover:from-orange-500 hover:to-red-800 transition-all duration-300 font-bold text-lg shadow-lg shadow-orange-500/50 hover:shadow-xl hover:shadow-orange-500/70 hover:scale-105 transform">
            <span className="relative z-10">Shop Now</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </a>
        
        <button className="px-8 py-4 rounded-lg border-2 border-orange-400/50 hover:border-orange-400 text-white font-bold text-lg hover:bg-orange-400/10 transition-all duration-300 backdrop-blur-sm">
          Learn More
        </button>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl">
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 transform">
          <div className="text-4xl mb-3">💪</div>
          <h3 className="font-bold text-lg mb-2 text-orange-400">Premium Quality</h3>
          <p className="text-sm text-neutral-400">Professional-grade equipment built to last</p>
        </div>
        
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 transform">
          <div className="text-4xl mb-3">🚚</div>
          <h3 className="font-bold text-lg mb-2 text-orange-400">Fast Shipping</h3>
          <p className="text-sm text-neutral-400">Get your gear delivered in record time</p>
        </div>
        
        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 transform">
          <div className="text-4xl mb-3">💯</div>
          <h3 className="font-bold text-lg mb-2 text-orange-400">Best Prices</h3>
          <p className="text-sm text-neutral-400">Competitive pricing on all products</p>
        </div>
      </div>
    </div>
  </div>
);

export default Home;