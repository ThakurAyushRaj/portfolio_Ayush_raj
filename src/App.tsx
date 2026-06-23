import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 text-center transform transition-all hover:scale-105">
        <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Ayush Raj
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          Portfolio successfully set up with React, TypeScript, and Tailwind CSS.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default App
