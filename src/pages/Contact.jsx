const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black py-16 px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold tracking-widest uppercase text-orange-400 bg-orange-400/10 px-4 py-2 rounded-full border border-orange-400/30">
              Get in Touch
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Contact <span className="bg-gradient-to-r from-orange-400 to-red-700 text-transparent bg-clip-text">Us</span>
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Have questions or need assistance? Reach out to us, and we'll be happy to help!
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-orange-400/50 transition-all backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Our <span className="bg-gradient-to-r from-orange-400 to-red-700 text-transparent bg-clip-text">Location</span>
                  </h2>
                  <p className="text-neutral-400">123 Fitness Lane, Workout City, USA</p>
                </div>
              </div>
            </div>

            {/* Customer Support Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-orange-400/50 transition-all backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">
                    Customer <span className="bg-gradient-to-r from-orange-400 to-red-700 text-transparent bg-clip-text">Support</span>
                  </h2>
                  <div className="space-y-2">
                    <p className="text-neutral-400 flex items-center">
                      <span className="mr-2">✉️</span>
                      support@gymstore.com
                    </p>
                    <p className="text-neutral-400 flex items-center">
                      <span className="mr-2">📞</span>
                      +1 234 567 890
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-orange-400/50 transition-all backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🕐</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">
                    Business <span className="bg-gradient-to-r from-orange-400 to-red-700 text-transparent bg-clip-text">Hours</span>
                  </h2>
                  <p className="text-neutral-400">Monday - Friday: 9am - 6pm</p>
                  <p className="text-neutral-400">Saturday: 10am - 4pm</p>
                  <p className="text-neutral-400">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6 text-white">Send us a Message</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-4 rounded-lg bg-black/40 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Your Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full p-4 rounded-lg bg-black/40 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Your Message</label>
                <textarea
                  placeholder="Tell us how we can help..."
                  rows="5"
                  className="w-full p-4 rounded-lg bg-black/40 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-lg bg-gradient-to-r from-orange-400 to-red-700 hover:from-orange-500 hover:to-red-800 text-white font-bold text-lg shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 transition-all transform hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

  export default Contact;