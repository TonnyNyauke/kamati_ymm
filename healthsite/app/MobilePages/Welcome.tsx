import Link from 'next/link';
import React from 'react';

function Welcome() {
  return (
    <div className="welcome px-4 py-8 text-center">
      <h2 className="text-2xl font-bold text-gray-800">Welcome to AfyaBest</h2>
      <p className="text-lg text-gray-600 leading-relaxed mb-8">
        Empower your holistic health journey: diet, lifestyle, natural remedies, & whole-body healing.
      </p>
      <Link href="/AboutUs" className="btn btn-green">Learn More</Link>
    </div>
  );
}

export default Welcome;
