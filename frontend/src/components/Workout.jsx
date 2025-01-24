import React from 'react'
import { Vortex } from "./ui/vortex";
import { FlipWords } from "./ui/flip-words";
import Card from './Card';
import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


function Workout() {

  const navigate = useNavigate()

  const token = localStorage.getItem('token');

  useEffect(() => {

    if (!token) {
      navigate('/signup');
      return;
    }
    try {
      const decoded = jwtDecode(token)
    } catch (error) {
      navigate('/signup');
    }
  }, []);

  const words = ["Workout Plan", "Goal", "Muscle"];

  const [Muscle, setMuscle] = useState("")
  const [Level, setLevel] = useState("")
  const [Error, setError] = useState()
  const [Data, setData] = useState([])

  const handleSubmit = async () => {
    if (Muscle == "" || Level == "") {
      setError("Both Fields Are Required")
      return;
    }
    const url = "API URL";
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
      if (!result || (typeof result === 'object' && Object.keys(result).length === 0)) {
        setError("Choose Another Difficulty Level")
        return;
      }
      setError()
      setData(result)
    } catch (error) {
      setError(error)
    }

  }

  return (
    <div className='w-full h-full bg-amber-50'>
      <div className="rounded-md  h-[30rem] max-md:h-[20rem] overflow-hidden">
        <Vortex
          backgroundColor="black"
          className="flex items-center flex-col justify-center px-2 md:px-10 w-full h-full"
        >
          <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
            Ready To Begin?
          </h2>
          <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
            Choose Your Goal Now. We&apos;ll Get You The Perfect Workout Plan, Designed For Your Goal.
          </p>
        </Vortex>
      </div>
      <div className='flex w-full justify-around items-center'>
        <div className='flex items-center w-1/2 h-40'>
          <div className="text-4xl max-sm:text-2xl mx-auto font-bold text-black">
            Pick Up Your
            <FlipWords words={words} />
          </div>
        </div>
        <div>
          <select className='cursor-pointer w-72 hover:shadow-zinc-700 hover:shadow-lg max-sm:w-40 rounded-xl bg-black text-slate-300 h-8 text-center transition duration-300' onChange={(e) => { setMuscle(e.target.value) }}>
            <option value="">--Select an option--</option>
            <option value="chest">Chest</option>
            <option value="biceps">Biceps</option>
            <option value="triceps">Triceps</option>
            <option value="forearms">Forearms</option>
            <option value="traps">Traps</option>
            <option value="lats">Lats</option>
            <option value="middle_back">Middle Back</option>
            <option value="lower_back">Lower Back</option>
            <option value="abdominals">Abdominals</option>
            <option value="glutes">Glutes</option>
            <option value="quadriceps">Quadriceps</option>
            <option value="hamstrings">Hamstrings</option>
            <option value="calves">Calves</option>
          </select>
        </div>
      </div>
      <div className='flex w-full justify-around items-center'>
        <div className='flex items-center w-1/2'>
          <div className="text-4xl max-sm:text-2xl mx-auto font-bold text-black">
            Pick Up Your Difficulty Level
          </div>
        </div>
        <div>
          <select className='w-72 cursor-pointer hover:shadow-zinc-700 hover:shadow-lg max-sm:w-40 rounded-xl bg-black text-slate-300 h-8 text-center transition duration-300' onChange={(e) => { setLevel(e.target.value) }}>
            <option value="">--Select an option--</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      </div>
      <div className='flex w-full mt-7 justify-center'>
        <button onClick={handleSubmit} className="p-[3px] w-44 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl" />
          <div className="px-8 py-2  bg-black rounded-2xl relative group transition duration-200 text-white hover:bg-transparent hover:scale-105">
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
          Data && Data.length > 0 ? 
          <div className='grid shadow-slate-200 shadow-inner mt-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 bg-black gap-5 max-h-[60vh] overflow-y-scroll w-full p-5'>
            {Data.map((props, index) => (
              <Card key={index} props={props} />
            ))}
          </div>
          :
          <></>
      }
    </div>
  )
}

export default Workout
