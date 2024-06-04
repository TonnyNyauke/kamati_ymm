'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import styled from 'styled-components'

import lemontea from '../Photos/PromotionPhotos/lemontea.jpg'
import remedy from '../Photos/PromotionPhotos/protocol.png'
import oil from '../Photos/PromotionPhotos/coconut_oil.jpg'

const ImageSlider = styled.section`
  background-color: #166534;
  border-radius: 10px;
  overflow: hidden;
  height: 50vh;
  zIndex: 1;

  .embla__container {
    display: flex;
    height: 100%;
  }

  .embla__slide {
    flex: 0 0 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

function Promotion() {
  const [carouselRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

  return (
    <ImageSlider className="embla mx-auto mt-12 sm:container border rounded" ref={carouselRef}>
      <div className="embla__container">
        <div className="embla__slide border border-green-200 rounded">
          <Image
            src={lemontea}
            alt="Lemon Tea"
            className="object-contain"
            priority
            placeholder="blur"
          />
        </div>
        <div className="embla__slide">
          <Image
            src={remedy}
            alt="Remedy"
            className="object-contain"
            priority
            placeholder="blur"
          />
        </div>
        <div className="embla__slide">
          <Image
            src={oil}
            alt="Coconut Oil"
            className="object-contain"
            priority
            placeholder="blur"
          />
        </div>
      </div>
    </ImageSlider>
  );
}

export default Promotion;