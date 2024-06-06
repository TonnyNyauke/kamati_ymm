import Link from 'next/link';
import React from 'react';

function Welcome() {
  return (
    <div className="welcome px-2 sm:px-4 py-4 sm:py-8 text-center">
      <h2 className="text-xl sm:text-3xl font-bold text-green-600">Welcome to AfyaBest</h2>
      <p className="text-md sm:text-lg leading-relaxed mb-4 sm:mb-8">
        Empower your holistic health journey: diet, lifestyle, natural remedies, & whole-body healing.
      </p>
      <Link href="/AboutUs"
      className="inline-block bg-green-500 text-white font-medium 
      py-1 sm:py-2 px-2 sm:px-4 rounded hover:bg-green-700 transition-colors duration-300">
          Learn More
      </Link>
    </div>
  );
}

export default Welcome;
