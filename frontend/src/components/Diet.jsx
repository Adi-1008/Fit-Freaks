"use client";
import React from "react";
import { Boxes } from "./ui/background-boxes";
import { cn } from "../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "./ui/canvas-reveal-effect";
import img3 from "../assets/image3.png"
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import Nutri_Card from './Nutri_Card'

function Diet() {


  const [hovered, setHovered] = useState(false);

  const [Gender, setGender] = useState()
  const [Age, setAge] = useState(0)
  const [Weight, setWeight] = useState()
  const [Activity, setActivity] = useState()
  const [HeightFt, setHeightFt] = useState()
  const [HeightIn, setHeightIn] = useState()
  const [Error, setError] = useState()
  const [Data, setData] = useState({})

  const navigate = useNavigate()

  const token = localStorage.getItem('token');

  const fetchUserData = async (userId) => {
    const res = await fetch(`http://localhost:5000/api/auth/userdata/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      console.log('Network response was not ok');
    }
    const data = await res.json();
    setAge(data.age)
  }

  useEffect(() => {

    if (!token) {
      navigate('/signup');
      return;
    }
    try {
      const decoded = jwtDecode(token)
      const userId = decoded.userId
      fetchUserData(userId)
    } catch (error) {
      navigate('/signup');
    }
  }, []);

  const handleSubmit = async () => {
    const url = `url`;

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': "key",
        'x-rapidapi-host': ""
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if(!response.ok)
      {
        setError("Check Your Inputs and Try Again!")
        return
      }
      if (Object.keys(result).length === 0) {
        setError("No data found. Please check your inputs and try again.");
        return;
      }
      setError()
      setData(result)
      
    } catch (error) {
      setError(error.message)
    }

  }

  useEffect(() => {
    console.log(Data);
  }, [Data]);

  return (
    <div className="w-full h-full bg-amber-50">
      <div className="w-full h-full bg-black pt-4">
        <div className="flex w-full">
          <div className="h-96 relative w-1/2 overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-[400px] max-sm:rounded-[200px]">
            <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

            <Boxes />
            <h1 className={cn("md:text-4xl text-xl text-center text-white relative z-20")}>
              Got Yourself A Workout Plan?
            </h1>
            <p className="text-center mt-2 text-neutral-300 relative z-20">
              What Are You Waiting For..? Take The Next Leap..!!
            </p>
          </div>
          <div className="relative flex items-center justify-center max-w-[50%]">
            <TypeAnimation
              className='absolute top-1/3 animate-glow text-white font-bold text-3xl max-md:text-xl max-sm:text-sm max-sm:font-semibold'
              sequence={[
                "Don't Quit!",
                1000,
                "You're Closure \n Than You Think!",
                1000,
                "Let's Do This..!",
                1000,
              ]}
              style={{ whiteSpace: 'pre-line' }}
              speed={50}
              repeat={Infinity}
            />
            <img src={img3} alt="" />
          </div>
        </div>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="h-[20rem] flex flex-col lg:flex-row overflow-hidden items-center justify-center bg-black w-full gap-4 mx-auto px-8 relative"
        >
          <p className="md:text-2xl text-2xl font-medium text-center text-white relative z-20 max-w-2xl mx-auto">
            Get Your Daily Nutrition Requirements <br /> In Just A Few Clicks..!!
          </p>
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full w-full absolute inset-0"
              >
                <CanvasRevealEffect
                  animationSpeed={5}
                  containerClassName="bg-transparent"
                  colors={[
                    [59, 130, 246],
                    [139, 92, 246],
                  ]}
                  opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
                  dotSize={2}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
        </div>
      </div>
      <div>
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-yellow-800 to-amber-400 dark:from-amber-700 dark:to-yellow-400 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Just Tell Us A Couple Things, <br /> About Yourself!
        </h2>
      </div>
      <div className="grid grid-cols-3 max-md:grid-cols-2 p-10 gap-5 gap-y-10 place-items-center">
        <div className="flex flex-col">
          <label className="text-center font-semibold" htmlFor="age">Your Age</label>
          <input type="number" className="hide-arrows w-24 bg-black rounded-lg text-white text-center hover:shadow-zinc-700 hover:shadow-lg hover:scale-105 transition duration-200" id="age" value={Age} onChange={(e) => { setAge(e.target.value) }} />
        </div>
        <div className="flex flex-col">
          <label className="text-center font-semibold" htmlFor="htft">Your Height</label>
          <div className="flex gap-3 max-sm:flex-col justify-center items-center">
            <input className="hide-arrows w-24 bg-black rounded-lg text-white text-center hover:shadow-zinc-700 hover:shadow-lg hover:scale-105 transition duration-200" type="number" placeholder="ft" id="htft" onChange={(e) => { setHeightFt(e.target.value) }} />
            <input className="hide-arrows w-24 bg-black rounded-lg text-white text-center hover:shadow-zinc-700 hover:shadow-lg hover:scale-105 transition duration-200" type="number" placeholder="in" id="htin" onChange={(e) => { setHeightIn(e.target.value) }} />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-center font-semibold" htmlFor="wt">Your Weight</label>
          <input className="hide-arrows w-24 bg-black rounded-lg text-white text-center hover:shadow-zinc-700 hover:shadow-lg hover:scale-105 transition duration-200" type="number" placeholder="lbs" id="wt" onChange={(e) => { setWeight(e.target.value) }} />
        </div>
        <div className="flex flex-col">
          <label className="text-center font-semibold" htmlFor="gender">Your Gender</label>
          <select onChange={(e) => { setGender(e.target.value) }} id="gender" className='w-60 cursor-pointer hover:shadow-zinc-700 hover:shadow-lg max-sm:w-40 rounded-xl bg-black text-slate-300 h-7 text-center transition duration-200'>
            <option value="">--Select an option--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-center font-semibold" htmlFor="activity">Your Activity Level</label>
          <select onChange={(e) => { setActivity(e.target.value) }} id="activity" className='w-60 cursor-pointer hover:shadow-zinc-700 hover:shadow-lg max-sm:w-40 rounded-xl bg-black text-slate-300 h-7 text-center transition duration-200'>
            <option value="">--Select an option--</option>
            <option value="Inactive">Inactive</option>
            <option value="Low Active">Low Active</option>
            <option value="Active">Active</option>
            <option value="Very Active">Very Active</option>
          </select>
        </div>
      </div>
      <div className='flex w-full justify-center'>
        <button onClick={handleSubmit} className="p-[3px] w-44 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl" />
          <div className="py-2 bg-black rounded-2xl relative group transition duration-200 text-white hover:bg-transparent hover:scale-105">
            Submit
          </div>
        </button>
      </div>
      {
        Error ?
          <div className='flex justify-center mt-4 w-full'>
            <div className=' bg-gray-950 bg-opacity-80 rounded-xl px-7 text-center text-lg text-red-500 hover:text-red-300 font-bold tracking-wide shadow-md shadow-red-500/50'>
              * {Error}
            </div>
          </div>
          :
          Object.keys(Data).length > 0?
          
            <div className="w-full flex justify-center bg-black p-10 mt-4">
              <Nutri_Card props={Data} />
            </div>
            
            :
            <></>
      }
    </div>
  )
}

export default Diet
