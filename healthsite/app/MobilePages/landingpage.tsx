'use client'

import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';
import Sidebar from './Sidebar';
import Promotion from './Promotion';
import Welcome from './Welcome';
import BMI from './BMI';
import Testimonials from './Testimonials';
import Newsletter from './Newsletter';
import Footer from './Footer';

const SeparatorLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #413333; /* Adjust color as needed */
  margin: 20px 0; /* Adjust spacing as needed */
`;


const SearchInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 13px;
  width: 100%;
  padding-left: 30px;

  &:focus {
    outline: none;
    box-shadow: 0 0 2px 1px #333;
  }
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

function Landingpage() {
  const [toggle, setToggle] = useState(false);

  const toggleSideBar = () => {
    setToggle(!toggle);
  }

  return (
    <div className="landing space-y-2 max-w-96">
      <HeaderContainer>
        <h3>logo</h3>
        <div style={{ position: 'relative', width: '70%' }}>
          {/* Adding search icon inside the input field */}
          <FaSearch size={16} style={{ position: 'absolute', left: '12px', top: '50%',
           transform: 'translateY(-50%)' }} />
          <SearchInput type="text" placeholder="Search for items" />
        </div>

        <button onClick={toggleSideBar}>
          {/* Using FaBars icon instead of <i> tag */}
          {/* Adding padding to the button for better UX */}
          {toggle ? '' : <FaBars size={20} />}

        </button>
      </HeaderContainer>
      {toggle && <Sidebar isOpen={toggle} onClose={toggleSideBar} />}
      
      <Welcome />
      <SeparatorLine />
      <Promotion />
      <BMI />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Landingpage;