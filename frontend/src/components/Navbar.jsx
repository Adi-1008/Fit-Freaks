import React from 'react'
import Logo from '../assets/Logo.png';
import { IconUserCircle } from '@tabler/icons-react';
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { IconLogout2 } from '@tabler/icons-react';
import { motion } from "framer-motion";
import { IconMenu2 } from '@tabler/icons-react';
import { MdOutlineCancel } from "react-icons/md";

function Navbar() {

  const [dropmenu, setdropmenu] = useState(false)

  return (
    <div className='flex w-full justify-center text-white bg-amber-50'>
      <nav className='flex relative border-b-2 border-b-white bg-black w-2/3 rounded-3xl mt-4 justify-around'>
        <div className='flex-shrink-0'>
          <img src={Logo} className='h-20 w-32' alt='Logo' />
        </div>
        <div className='flex align-middle items-center max-sm:hidden'>
          <ul className='flex list-none gap-10'>
            <li className='hover:animate-glow max-md:text-sm font-semibold hover:underline underline-offset-4 transition duration-300 hover:scale-105'><NavLink to={"/workoutplan"} className={({ isActive }) => isActive ? "border-b-2 border-gray-300" : "border-0"}>Workout Plan</NavLink></li>
            <li className='hover:animate-glow max-md:text-sm font-semibold hover:underline underline-offset-4 hover:scale-105 transition duration-300'><NavLink to={"/dietplan"} className={({ isActive }) => isActive ? "border-b-2 border-gray-300" : "border-0"}>Diet Plan</NavLink></li>
            <li className='hover:animate-glow max-md:text-sm font-semibold hover:underline underline-offset-4 hover:scale-105 transition duration-300'><NavLink to={"/merchandise"} className={({ isActive }) => isActive ? "border-b-2 border-gray-300" : "border-0"}>Our Merchandise</NavLink></li>
          </ul>
        </div>
        <div className='flex align-middle items-center'>
          <button onClick={() => { setdropmenu(!dropmenu) }}>
            <IconUserCircle className='max-sm:hidden' stroke={2} size={36} />
            <IconMenu2 stroke={2} className='sm:hidden' />
          </button>
        </div>
        {
          dropmenu ?
            <motion.div initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className='absolute max-sm:hidden top-20 bg-black p-3 rounded-xl border-2 border-white right-3 flex flex-col gap-3 z-10'>
              <button className='hover:underline underline-offset-4 hover:scale-105 transition duration-300'><NavLink className={({ isActive }) => isActive ? "animate-glow" : ""} to={"/mydashboard"}>My Dashboard</NavLink></button>
              <button onClick={
                () => {
                  localStorage.removeItem('token')
                }
              }><Link className='flex gap-4 items-center text-red-600' to={"/"}> <span>Logout</span> <IconLogout2 stroke={2} /></Link></button>
            </motion.div>
            : <></>
        }
        {
          dropmenu ?
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className='sm:hidden flex rounded-s-3xl border-s-2 border-white flex-col justify-around fixed right-0 bg-black text-white h-screen z-50 w-1/3 -top-1'>
              <button onClick={() => { setdropmenu(!dropmenu) }} className='absolute left-1 top-2'><MdOutlineCancel size={26} /></button>
              <div>
                <ul className='flex flex-col items-center gap-10 list-none'>
                  <li className='animate-glow'><Link to={"/mydashboard"}>My Dashboard</Link></li>
                  <li><Link to={"/workoutplan"}>Workout Plan</Link></li>
                  <li><Link to={"/dietplan"}>Diet Plan</Link></li>
                  <li><Link to={"/merchandise"}>Merchandise</Link></li>
                </ul>
              </div>
              <div className='flex flex-col items-center'>
                <button onClick={
                () => {
                  localStorage.removeItem('token')
                }
              }><Link className='flex gap-4 text-red-600'> <span>Logout</span> <IconLogout2 stroke={2} /> </Link></button>
              </div>
            </motion.div>
            : <></>
        }
      </nav>
    </div>
  )
}

export default Navbar
