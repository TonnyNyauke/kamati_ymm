import React from 'react'
import { useNavigate } from 'react-router-dom'

function HumanResource() {
    const login = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        login('/LandingPage');
    }
  return (
    <div>
        <form onSubmit={handleFormSubmit}>
            <input type='text' placeholder='phone number'/>
            <input type='password' placeholder='password' />
            <button>Login</button>
        </form>
    </div>
  )
}

export default HumanResource