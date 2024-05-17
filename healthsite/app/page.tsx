'use client'

import { useEffect, useState } from 'react';
import Landingpage from './MobilePages/landingpage'

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    }

    handleResize();

    if (typeof window !== 'undefined'){
      window.addEventListener('resize', handleResize);
    }

    return(() => {
      if (typeof window !== 'undefined'){
        window.removeEventListener('resize', handleResize);
      }
    })
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isMobile ? <Landingpage/> : <div>
        <p>Landing Page</p>
        </div>}
    </main>
  );
}
