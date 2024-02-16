import React from 'react'
import './AboutUs.css'
import nyauke_ceo from '../Photos/nyauke_ceo.jpg'
import ochanda from '../Photos/ochanda.jpg'
import claire from '../Photos/claire.jpg'
import ian from '../Photos/ian_kiptoo.jpg'
import { Link } from 'react-router-dom'
import '../HomePage/HomePage.css'

function AboutUs() {
  return (
    <div className='about-us'>
      <nav className='back-to-home'>
        <Link to="/HomePage">Kamati YMM</Link>
      </nav>
      <div>
      <h2>Who We Are</h2>
      <p>Welcome to Kamati YMM, your partner in holistic health and wellbeing. Kamati YMM, which stands for Kamati Ya Medical Missionaries (Panel of Medical Missionaries),
         is dedicated to ensuring our clients achieve optimal health through comprehensive and personalized health care.
      </p>
      <h2>Our Mission</h2>
      <p>At Kamati YMM, we believe in addressing health challenges at their roots. Our mission is to empower individuals to take control of their health by providing holistic solutions that encompass diet and lifestyle changes,
        natural remedies, and a wholistic approach to healing.
      </p>
      <h2>Our Vision</h2>
      <p>At Kamati YMM, our vision is to inspire a world where everyone with chronic illnesses and diseases realizes the transformative power of good health, 
        takes proactive control of their wellbeing, and embarks on a journey to regain vitality and health.
      </p>
      <h2>Our Commitment</h2>
      <p>We are committed to fostering a culture of empowerment, education, and support, where individuals are equipped with the knowledge,
             tools, and resources they need to make informed decisions about their health.
      </p>
      <h2>Empowering Wellness</h2>
      <p>Through innovative solutions, compassionate care, and a commitment to excellence, we empower individuals to break free from the shackles of chronic illness and disease,
               reclaiming their lives and embracing a future filled with vitality, joy, and fulfillment.
      </p>
      <h2>Building Community</h2>
      <p>We believe in the power of community and the strength that comes from shared experiences and collective support. We strive to foster a community of healing and wellbeing, where individuals find solace,
         encouragement, and inspiration as they navigate their personal health journeys.</p>
      <h2>Embracing Diversity</h2>
      <p>We celebrate the rich tapestry of human diversity and honor the unique needs, backgrounds, and perspectives of every individual we serve. Our inclusive approach ensures that everyone feels valued,
         respected, and supported on their path to wellness.</p>
      <h2>Transforming Lives</h2>
      <p>Ultimately, our vision is to transform lives, one person at a time, by instilling hope, restoring health, and inspiring a renewed sense of purpose and possibility. Together, we can create a world where health is not just the absence of illness, but the presence of vitality, joy, and abundant life.

Join us as we embark on this transformative journey towards a brighter, healthier future for all.</p>
      </div>

      <h2>Our Team</h2>
      <div className='ceo'>
        <div>
          <img src={nyauke_ceo} alt='ceo'/>
          <h3>Tonny Blair Nyauke - Cofounder & CEO</h3>
          <p>Tonny Nyauke brings his expertise in Electronics Engineering, and Software Engineering,
             coupled with a passion for health and technology.
             His vision drives Kamati YMM forward, making innovative solutions accessible to all.</p>
        </div>
        <div>
          <img src={ochanda} alt='ceo'/>
          <h3>Ochanda David - Co-founder</h3>
          <p>With a background in Mathematics and Chemistry, Ochanda David is not just a scientist; he's a compassionate advocate for medical missionary work.
             His commitment to health and wellness shapes our approach to healing.
          </p>
        </div>
        <div>
          <img src={claire} alt='ceo'/>
          <h3>Claire Atieno - Co-founder</h3>
          <p>
          Claire Atieno's background in Linguistics, Media, and Communication underscores her dedication to improving lives through medical missionary work.
           She is driven by a heartfelt desire to alleviate suffering and promote wellbeing.
          </p>
        </div>
        <div>
          <img src={ian} alt='ceo'/>
          <h3>Ian Kiptoo - Co-founder</h3>
          <p>
          Ian Kiptoo is driven by his passion for business, investing, and financial freedom. His enthusiasm for health
           and medical missionary work fuels our mission to bring healing and hope to those in need.
          </p>
        </div>
        
      </div>
      <h2>Our Approach</h2>
        <p>
        At Kamati YMM, we believe in addressing the root causes of illness and disease. Through personalized care and a holistic approach, we help individuals identify and eliminate barriers to health, empowering them to regain vitality and vitality.

Join us on the journey to optimal health and wellbeing. Together, we can achieve wellness that lasts a lifetime.
        </p>
        <footer className="footer">
            <div className="contact-info">
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
            </div>
            <div className="social-links">
                {/* Add social media icons and links */}
                <a href='https://www.facebook.com/kamatiymm/' target="_blank" rel="noreferrer">
                    <i className='fab fa-facebook-f'></i>
                </a>
                <a href='https://www.instagram.com/kamatiymm/' target="_blank" rel="noreferrer">
                    <i className='fab fa-instagram'></i>
                </a>
                <a href='https://wa.me/254742065623' target="_blank" rel="noreferrer">
                    <i className='fab fa-whatsapp'></i>
                </a>
            </div>
            <div className="legal-links">
                <a href='privacy-policy' target="_blank" rel="noreferrer">Privacy Policy</a>
                <a href='terms-of-service' target="_blank" rel="noreferrer">Terms of Service</a>
            </div>
            <div className="copyright">
                &copy; 2024 Kamati YMM. All rights reserved.
            </div>
    </footer>
    </div>
  )
}

export default AboutUs