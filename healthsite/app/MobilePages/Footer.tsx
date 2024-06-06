import React from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const ContactInfoContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;

  p {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;

  a {
    color: #333;
  }
`;

const LegalLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  a {
    color: #333;
  }
`;

const FooterContainer = styled.footer`
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 14px;

  .text-black {
    color: #000;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <ContactInfoContainer>
        <p>
          <i className='fas fa-envelope'></i>
          customerservice@kamatiymm.com
        </p>
        <p>
          <i className='fas fa-phone'></i>
          +254 742-065-623 / +254 795-063-917
        </p>
        <p>
          <i className='fas fa-map-marker-alt'></i>
          Moi University, Eldoret
        </p>
      </ContactInfoContainer>
      <SocialMediaContainer>
        <a href='https://www.facebook.com/kamatiymm/' target="_blank" rel="noreferrer">
          <i className='fab fa-facebook-f'></i>
        </a>
        <a href='https://www.instagram.com/kamatiymm/' target="_blank" rel="noreferrer">
          <i className='fab fa-instagram'></i>
        </a>
        <a href='https://wa.me/254742065623' target="_blank" rel="noreferrer">
          <i className='fab fa-whatsapp'></i>
        </a>
      </SocialMediaContainer>
      <LegalLinksContainer>
        <a href='privacy-policy' target="_blank" rel="noreferrer">Privacy Policy</a>
        <a href='terms-of-service' target="_blank" rel="noreferrer">Terms of Service</a>
      </LegalLinksContainer>
      <div className="text-black">&copy; 2024 AyfaBest. All rights reserved.</div>
    </FooterContainer>
  );
}

export default Footer;