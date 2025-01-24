"use client";

import React from 'react';
import Logo from '../assets/Logo.png';
import { HoverBorderGradient } from './ui/hover-border-gradient';
import {Link} from 'react-router-dom';

function Navbar() {


  return (
    <div className='flex items-center w-full justify-center h-full bg-amber-50'>
      <nav className='flex max-sm:flex-col bg-black rounded-3xl mt-2 justify-between items-center w-11/12 lg:w-3/5 px-4 py-1'>
        {/* Logo Section */}
        <div className='flex-shrink-0'>
          <img src={Logo} className='h-20 w-32' alt='Logo' />
        </div>

        {/* Menu Section */}
        <div className='w-full sm:w-auto mt-4 sm:mt-0'>
          <ul className='flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center'>
            <li>
              <button className='flex justify-center text-center'>
                <HoverBorderGradient
                  as='button'
                  containerClassName='rounded-full'
                  className='dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-4 py-2'
                >
                  <Link to={"/login"}><span>Login</span></Link>
                </HoverBorderGradient>
              </button>
            </li>
            <li>
              <button className='flex justify-center text-center'>
                <HoverBorderGradient
                  as='button'
                  containerClassName='rounded-full'
                  className='dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-4 py-2'
                >
                  <Link to={"/signup"}><span>Sign Up</span></Link>
                </HoverBorderGradient>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>

  );
}

export default Navbar;
