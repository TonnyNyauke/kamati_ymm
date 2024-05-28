import React from 'react';
import styled from 'styled-components';

const NewsletterContainer = styled.section`
  background-color: #166534; /* green color */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const SubscribeButton = styled.button`
  background-color: #34C759;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:active {
    background-color: #2EBC54;
  }
`;

function Newsletter() {
  return (
    <NewsletterContainer>
      <NewsletterForm>
        <h2 className='font-bold text-white'>Subscribe to our weekly newsletter</h2>
        <InputField
          type="text"
          placeholder="Phone number"
          aria-label="Phone number"
        />
        <SubscribeButton>Subscribe</SubscribeButton>
      </NewsletterForm>
    </NewsletterContainer>
  );
}

export default Newsletter;