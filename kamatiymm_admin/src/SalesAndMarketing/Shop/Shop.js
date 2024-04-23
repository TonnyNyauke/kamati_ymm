import React from 'react'
import { Link } from 'react-router-dom'
import './Shop.css'

function Shop() {
  return (
    <div className='shop-page'>
      <Link to='/Groceries'>Groceries</Link>
      <Link to='/Grains'>Grains</Link>
      <Link to='/Herbals'>Herbals</Link>
      <Link to='/Nuts'>Nuts</Link>
      <Link to='/Oils'>Oils</Link>
      <Link to='Utensils'>Utensils</Link>
      <Link to='/ExerciseAndGymEquipment'>Exercise Equipment</Link>
      <Link to='/Electronics'>Electronics</Link>
      <Link to='/AddProducts'>Add Product</Link>
    </div>
  )
}

export default Shop