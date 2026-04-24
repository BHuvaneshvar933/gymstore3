const Footer = () => (
  <footer className="relative border-t border-orange-500/20 bg-gradient-to-b from-black to-neutral-950 text-neutral-400">
    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-red-700/5"></div>
    <div className="relative container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-700 flex items-center justify-center">
              <span className="text-2xl">💪</span>
            </div>
            <h3 className="text-2xl font-black bg-gradient-to-r from-white via-orange-400 to-red-600 text-transparent bg-clip-text">
              GymStore
            </h3>
          </div>
          <p className="text-sm text-neutral-500">
            Your trusted partner for premium fitness equipment and supplements.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/products" className="hover:text-orange-400 transition-colors">Products</a></li>
            <li><a href="/about" className="hover:text-orange-400 transition-colors">About Us</a></li>
            <li><a href="/contact" className="hover:text-orange-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-orange-400 transition-colors">FAQ</a></li>
            <li><a href="/shipping" className="hover:text-orange-400 transition-colors">Shipping Info</a></li>
            <li><a href="/returns" className="hover:text-orange-400 transition-colors">Returns</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-3">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-orange-400 hover:to-red-600 flex items-center justify-center transition-all transform hover:scale-110">
              <span className="text-lg">📘</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-orange-400 hover:to-red-600 flex items-center justify-center transition-all transform hover:scale-110">
              <span className="text-lg">📷</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-orange-400 hover:to-red-600 flex items-center justify-center transition-all transform hover:scale-110">
              <span className="text-lg">🐦</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-8 border-t border-neutral-800 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} <span className="text-orange-400 font-semibold">GymStore</span>. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
