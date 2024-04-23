import React from 'react'
import { Link } from 'react-router-dom'
import mealplan from '../Photos/Meal_Planners.jpeg'
import tasty_food from '../Photos/tasty_food.jpg'
import './MealPlanner.css'

function MealPlanner() {
  return (
    <div>
        <Link to="/HomePage">Kamati YMM</Link>
      <AboutUs />
      <CulinarySkills />
      </div>
  )
}

export default MealPlanner

function AboutUs(){
  return(
    <div className='about-meals'>
      
        <div>
        <h2>What we are about</h2>
        <p>We are revolutionizing the way you plan and enjoy meals. We believe that every meal should be a delightful experience,
          blending flavors, nutrition, convenience, and health seamlessly. Our platform empowers you with meal plans tailored to your tastes,
          healthful diet, and budget.
        </p>
        <button className='button'>Explore Now</button>
        </div>
        <img src={mealplan} alt="mealplan" />
      </div>
  )
}
function CulinarySkills(){
  return(<div className='culinary-skills'>
    <img  src={tasty_food} alt="Tasty Food"/>
    <div>
    <h2>Improve your culinary skills</h2>
    <p>With a vast collection of recipes, intuitive tools, and a supportive community, Kamati YMM makes cooking effortless and enjoyable.
       Whether you're a seasoned chef or just starting your culinary journey, we're here to inspire you, simplify your kitchen routines, 
       and elevate your dining experiences.</p>
       <button className='button'>Sign up Now</button>
    </div>
  </div>)
}