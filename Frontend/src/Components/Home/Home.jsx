import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
     <div className="text-center flex flex-col items-center justify-center h-[90vh] bg-gray-100">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Organize Your Work Life, Finally.
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600">
            Become focused, organized and calm with TODO App. The World's No.1 Task Manager App 
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-2"></div>
            <Link to={"/todo"}>
            <button className='bg-orange-500 p-2 rounded-md text-white px-3 hover:bg-orange-400'>Make Todo</button>
            </Link>
            </div>
    </>
  )
}

export default Home