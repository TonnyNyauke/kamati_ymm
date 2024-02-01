import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className='homepage'>
      <Link to="/NewslettersPage">Newsletters</Link>
    </div>
  )
}

export default HomePage