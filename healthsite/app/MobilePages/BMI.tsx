import React from 'react'

function BMI() {
  return (
    <section className="section-bmi border border-grey-100 rounded-lg
     space-y-2 flex justify-center items-center h-56">
        <div className='animate-pulse'>
            <form className='flex flex-col'>
              <h2 className="text-2xl font-semibold text-center mb-4">Know your BMI</h2>
              <input type="number" placeholder="Enter your weight in Kg"
              className="border border-gray-300 p-2 rounded-lg mb-2"
              />
              <input type="number" placeholder="Enter your height in cm"
              className="border border-gray-300 p-2 rounded-lg mb-4"
              />

              <button className='bg-orange-400 text-white
              py-2 px-4 rounded-lg hover:bg-orange-500 transition-colors duration-300
              '>Calculate</button>
            </form>
        </div>
    </section>
  )
}

export default BMI