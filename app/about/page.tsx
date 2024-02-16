import React from 'react';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div>

<div className='flex justify-center items-center bg-indigo-200 p-10 rounded-xl w-3/4 min-h-[75vh] mx-auto'>
      <div className='py-6 px-6 bg-white shadow-md rounded-md overflow-y-auto hide-scrollbar w-3/4 min-h-[75vh] my-8'>
        <section className="about-section">
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-8 font-bold"> About Gamer Date</h3>
        <div className="bg-indigo-50 p-6 rounded-lg shadow-lg">
        
          <p>
            Welcome to Gamer Date, where gamers can connect, play, and build
            meaningful relationships.
          </p>
        <br></br>
          <p>
           We strive to provide you with the best opportunities to meet and conenct with other gamers above the age of 18. Say goodbye to the days where your team is filled with children. 
          </p>
          </div>
        </section>
        <br></br>
        <section className="getting-started-section my-8">
          <div className="bg-indigo-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6">Getting Started with Gamer Date</h2>
        <ul className="list-decimal ml-4">
            <li className="mb-4">
              <strong>Sign Up</strong>
              <p>Visit the Gamer Date website or download the app, and click on the Sign Up link to create your account.</p>
            </li>
            <li className="mb-4">
              <strong>Complete Your Registration</strong>
              <p>Enter additional details like your gaming nickname, age, and location to complete your registration.</p>
            </li>
            <li className="mb-4">
              <strong>Create Your Profile</strong>
              <p>Write about yourself, focusing on your gaming interests and personality, and specify your favorite games and consoles.</p>
            </li>
            <li className="mb-4">
              <strong>Express Your Gaming Preferences</strong>
              <p>Let others know your preferred way to connect and what you&apos;re looking for on Gamer Date, be it squads, friends, or followers.</p>
            </li>
            <li className="mb-4">
              <strong>Upload a Profile Photo</strong>
              <p>Choose a profile photo that showcases your personality or gaming persona.</p>
            </li>
            <li className="mb-4">
              <strong>Explore and Connect</strong>
              <p>Browse gamer profiles and show interest by clicking the heart button, or pass by clicking the X button.</p>
            </li>
            <li className="mb-4">
              <strong>Matching with Other Gamers</strong>
               <p>When mutual interest is shown, gamers appear on each other&apos;s &apos;Matches&apos; page, where you can view their full profile and connect.</p>
            </li>
            <li className="mb-4">
              <strong>Start Building Connections</strong>
              <p>Reach out to your matches and start building friendships, squads, or streaming partnerships.</p>
            </li>
          </ul>
          </div>
        </section>

          {/* Add more content and visuals here */}
        
        <br></br>
        <section className="endorsements-section my-8">
          <h2 className="text-3xl font-bold text-center mb-6">What Gamers are saying about Gamer Date</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-4 rounded-lg shadow-lg">
              <p className="font-semibold">EpicRogueQueen</p>
              <p>&quot;Gamer Date is a game-changer! It&apos;s been amazing for finding my squad. We&apos;ve been dominating leaderboards ever since. Big shoutout to Gamer Date for making this possible!&quot;</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg shadow-lg">
              <p className="font-semibold">PixelPaladin42</p>
              <p>&quot;Never knew how many like-minded gamers were out there until I joined Gamer Date. I&apos;ve built so many incredible friendships and even found my perfect duo partner for co-op campaigns. Highly recommend it to any gamer looking to expand their network!&quot;</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg shadow-lg md:col-span-2">
              <p className="font-semibold">MysticMage88</p>
              <p>&quot;As someone who always struggled to find a reliable team for competitive play, Gamer Date has been a lifesaver. It&apos;s like a social network but just for gamers. I&apos;ve met some awesome people, and our team synergy is off the charts!&quot;</p>
            </div>
          </div>
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
    </div>
  );
};

export default AboutPage;