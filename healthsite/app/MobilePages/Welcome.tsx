import Link from 'next/link'
import React from 'react'

function Welcome() {
  return (
    <div className="border border-green-600 p-4 space-y-4 bg-gradient-to-b from-green-200 to-green-500">
      <h2 className="text-2xl font-bold text-center">Welcome to AfyaBest</h2>
      <p className="text-center">
        We are on a mission to transform people's health in a natural, and easy way.
      </p>
      <div className="text-center">
        <Link href="/AboutUs" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
          Read more...
        </Link>
      </div>
    </div>
  )
}

export default Welcome