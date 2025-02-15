import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen flex ">
      <div className="w-full   grid grid-cols-1 md:grid-cols-1  ">
       
        <div className='w-full '>
          <div className='w-full  grid grid-cols-1 md:grid-cols-2 '>
            <div className='m-auto w-xl'>
          <h1 className="text-5xl font-bold mb-5">Nice to <span className='bg-gradient-to-r from-orange-400 to-red-700 text-transparent bg-clip-text'>Meet You</span></h1>
          <p className="text-lg text-neutral-400 leading-relaxed ">
            Welcome to SK gym products, your ultimate destination for high-quality gym products designed to elevate your fitness journey.
            We are passionate about helping you achieve your fitness goals by providing the best equipment, accessories, and apparel. Whether
            you're a beginner, a seasoned athlete, or someone who's just getting started, we have everything you need to take your workout to the next level.
          </p>
          </div>
          <img
            src="https://sfhealthtech.com/cdn/shop/articles/resize-How-to-Setup-Home-Gym.jpg?v=1598866727

"
            alt="Fitness Equipment"
            className=" shadow-lg h-fit"
          />
          </div>
          <div className='w-full  grid grid-cols-1 md:grid-cols-2'>
          <img
            src="https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg"
            alt="Fitness Equipment"
            className=" shadow-lg h-fit"
          />
          <div className='m-auto w-xl'>
          <h1 className="text-5xl font-bold mb-5">Our <span className='bg-gradient-to-r from-orange-400 to-red-700 text-transparent bg-clip-text'>Mission</span></h1>
          <p className="text-lg text-neutral-400 leading-relaxed mb-4">
            Our mission is simple: to offer top-tier products that support your fitness ambitions while ensuring exceptional customer service and a seamless
            shopping experience. From strength training to cardio, yoga, and everything in between, we’ve curated a wide range of products from trusted brands to
            meet the needs of all fitness enthusiasts.
          </p>
          </div>
          
          </div>
          <div className='w-full  grid grid-cols-1 md:grid-cols-2'>
          <div className='m-auto w-xl'>
          <h1 className="text-5xl font-bold mb-5">Our <span className='bg-gradient-to-r from-orange-400 to-red-700 text-transparent bg-clip-text'>Gratitude</span></h1>
          <p className="text-lg text-neutral-400 leading-relaxed mb-4">
            Thank you for choosing SK gym products. We are committed to being your go-to resource for all things fitness, helping you get stronger, healthier,
            and closer to your goals every day.
          </p>
          </div>
          <img
            src="https://miocommerce.b-cdn.net//wp-content/uploads/2024/08/image-18-1024x576.jpeg"
            alt="Fitness Equipment"
            className=" shadow-lg h-fit"
          />
          </div>
        </div>

       
       
      </div>
    </div>
  );
};

export default About;
