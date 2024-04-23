import React from 'react'
import { useNavigate } from 'react-router-dom';

function SalesLogin() {
    const navigate = useNavigate();

    const  handleSubmit = (event) => {
        event.preventDefault();

        navigate('/Shop');

        console.log('The form was submitted: ', event);}
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Phone number'/>
            <input type='text' placeholder='Password' />
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default SalesLogin