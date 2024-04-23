import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div>
        <div>
            <Link to="/AddNewAdmin">Add new Admin</Link>
            <Link to='/EmployeeDatabase'>Employee Database</Link>
            <Link to="/Departments">Departments</Link>
        </div>
    </div>
  )
}

export default LandingPage