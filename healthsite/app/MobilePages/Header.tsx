'use client'
import React from 'react';
import styled from 'styled-components';
import { FaBars, FaSearch } from 'react-icons/fa';

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

function Header() {
  return (
    <HeaderContainer>
      <h3>logo</h3>
      <div style={{ position: 'relative', width: '70%' }}>
        {/* Adding search icon inside the input field */}
        <FaSearch size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        <SearchInput type="text" placeholder="Search for items" />
      </div>
      <button>
        {/* Using FaBars icon instead of <i> tag */}
        {/* Adding padding to the button for better UX */}
        <FaBars size={20} />
      </button>
    </HeaderContainer>
  );
}

export default Header;