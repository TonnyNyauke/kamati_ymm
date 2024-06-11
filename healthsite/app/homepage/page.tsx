'use client'

import React from 'react'
import Navigation from './navigation'
import Shopping from './shopping'
import styled from 'styled-components';
import { FaSearch} from 'react-icons/fa';
import '@fortawesome/fontawesome-free/css/all.min.css';
import WithAuth from '../WithAuth';

const HeaderContainer = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
padding: 14px;
background-color: #fff;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
position: fixed;
top: 0px;
left: 10px;
right: 10px;
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

const Spacer = styled.div`
height: 80px;
`;

function Page() {
  
  return (
    <div className='flex justify-center items-center flex-col space-y-2'>
      <HeaderContainer>
        <h3>logo</h3>
        <div style={{ position: 'relative', width: '70%' }}>
          {/* Adding search icon inside the input field */}
          <FaSearch size={16} style={{ position: 'absolute', left: '12px', top: '50%',
           transform: 'translateY(-50%)' }} />
          <SearchInput type="text" placeholder="Search for items" />
        </div>
        <i className='fas fa-list'></i>
        </HeaderContainer>
        <Spacer />
        <div className='border rounded-md w-11/12 flex flex-col m-4 text-white mt-32
        bg-gradient-to-r from-green-500 to-blue-500'>
          <h1 className='text-2xl font-semibold ml-2'>Afya Best</h1>
          <h2 className='text-xl  ml-6'>Ideal for:</h2>
          <ul className='ml-16 text-sm'>
            <li>{'>'} Health and healthy products</li>
            <li className='ml-4'>{'>'} Meal and health plans</li>
            <li className='ml-6'>{'>'} Free consultations (upto 30 minutes)</li>
          </ul>
        </div>
        <Shopping />
        <Navigation />
    </div>
  )
}

export default WithAuth(Page)