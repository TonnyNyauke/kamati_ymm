import React from 'react'
import '../firebase'
import './AdminLogin.css'
import { Link } from 'react-router-dom'

function AdminLogin() {

  return (
    <div className='loginContainer'>
          <Link to="/HumanResource">Human Resource</Link>
          <Link to="/Newslogin">Media And Communication</Link>
          <Link to="/Medical">Medical</Link>
          <Link to="/SalesLogin">Sales and Marketing</Link>
          <Link to="/Softwares">Softwares</Link>
    </div>
  )
}

export default AdminLogin