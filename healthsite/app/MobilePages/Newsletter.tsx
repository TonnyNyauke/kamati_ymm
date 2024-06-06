import React from 'react';
import styled from 'styled-components';

import flowers from '../Photos/flat_lay_flowers.jpg';

const NewsletterContainer = styled.section`
  /*background-color: #c2f0d6;*/ /* Light, nature-inspired green */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex; /* Center content horizontally */
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  height: 250px; /* Optional height for better layout */
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%; /* Adjust form width as needed */
`;

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd; /* Light gray border */
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const SubscribeButton = styled.button`
  background-color: #3BB771; /* More vibrant green */
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #32A060; /* Darken on hover */
  }

  &:active {
    background-color: #2EBC54;
  }
`;

function Newsletter() {
  return (
    <div className='newsletter relative before:absolute before:top-0 before:left-0 bg-gray-100 mt-2
    before:w-full before:h-full before:bg-center before:bg-cover before:opacity-70 before:z-index-0'>
      <NewsletterContainer>
      <NewsletterForm>
        <h2 className="text-xl font-semibold decoration-transparent">Subscribe to our weekly newsletter</h2>
        <InputField type="number" placeholder="+254 7xx xxx xxx" aria-label="Phone number" />
        <SubscribeButton>Subscribe</SubscribeButton>
      </NewsletterForm>
    </NewsletterContainer>
    </div>
  );
}

export default Newsletter;
