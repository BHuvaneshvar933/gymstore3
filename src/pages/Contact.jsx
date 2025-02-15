import React from 'react';

const Contact = () => {
    return (
      <div className="px-8 py-16  min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-5">Contact <span className='bg-gradient-to-r from-orange-400 to-red-700 text-transparent bg-clip-text'>Us</span></h1>
          <p className="text-lg text-neutral-400 text-center mb-12">
            Have questions or need assistance? Reach out to us, and we'll be happy to help!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Our <span className='bg-gradient-to-r from-orange-400 to-red-700 text-transparent bg-clip-text'>Location</span></h2>
              <p className="text-neutral-400">123 Fitness Lane, Workout City, USA</p>
              <h2 className="text-2xl font-semibold">Customer <span className='bg-gradient-to-r from-orange-400 to-red-700 text-transparent bg-clip-text'>Support</span></h2>
              <p className="text-neutral-400">Email: support@gymstore.com</p>
              <p className="text-neutral-400">Phone: +1 234 567 890</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                ></textarea>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-700 text-white font-bold rounded-lg shadow hover:bg-orange-700 transition"
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