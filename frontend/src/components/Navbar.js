import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css';

const Navbar = () => {
  return (
    <header>
      <nav>
        <div className='head'>
            <Link to="/" className='color'>
                <h1 className='color'>To Do List Website</h1>
            </Link>
            <div>
              <Link to = "/">
                <button className='select'>
                  Home
                </button>
              </Link>
              <Link to = "/update">
                <button className='select'
                href="/update">
                  Update
                </button>
              </Link>
            </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar