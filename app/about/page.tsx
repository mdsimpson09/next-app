import React from 'react';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div>

      <div className="mt-16 min-h-screen bg-gray-100 py-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <section className="about-section">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-8 font-bold"> About Gamer Date</h3>
          <p>
            Welcome to Gamer Date, where gamers can connect, play, and build
            meaningful relationships.
          </p>
        <br></br>
          <p>
           We strive to provide you with the best opportunities to meet and conenct with other gamers above the age of 18. Say goodbye to the days where your team is filled with children. 
          </p>
        </section>
        <br></br>
        <section className="how-it-works-section">
        <h4 className="text-3xl sm:text-4xl text-center mb-8 font-bold"> How it works</h4>
          <p>
            Discover the world of Gamer Date by following these simple steps.
          </p>
          {/* Add more content and visuals here */}
        </section>
        <br></br>
        <section className="how-it-works-section">
        <h4 className="sm:text-2xl text-center mb-8 font-bold"> Be sure to read the community standards</h4>
          <p>
            Read the Community Standards <Link href="/faqs"> here. </Link>
          </p>
          {/* Add more content and visuals here */}
        </section>
      </div>
    </div>
  );
};

export default AboutPage;