import React from 'react'

function Testimonials() {
  return (
    <section className="bg-gray-100 py-10 rounded-lg">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Customer testimonials</h2>
        <div>Images</div>
        <div className="flex flex-row justify-center mb-4">
          <button className="w-full bg-orange-500 text-white font-semibold py-1 px-3 rounded-md text-sm
          mr-2
          ">Book Consultation</button>
          <button className="w-full bg-gray-200 text-gray-800 font-semibold py-1 px-3 rounded-md">Shop</button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials