import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import CanvasJSReact from "@canvasjs/react-charts";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";


const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Dashboard() {

  const [name, setname] = useState('')
  const [age, setage] = useState()
  const [height, setheight] = useState()
  const [weight, setweight] = useState()
  const [email, setemail] = useState('')
  const [error, seterror] = useState()
  const [run, setrun] = useState()
  const [strength, setstrength] = useState()
  const [cardio, setcardio] = useState()
  const [runtoday, setruntoday] = useState(0)
  const [strengthtoday, setstrengthtoday] = useState(0)
  const [cardiotoday, setcardiotoday] = useState(0)
  const [streakData, setStreakData] = useState([])

  const [dataPoints, setDataPoints] = useState([]);

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
    setemail(data.email)
    setname(data.name)
  }

  const fetchUserStats = async () => {

    try {
      const response = await fetch('http://localhost:5000/api/auth/userstats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setheight(data.height)
        setweight(data.weight)
        setage(data.age)
        setrun(data.running)
        setstrength(data.muscletrain)
        setcardio(data.cardio)

        // Process streak data
        const formattedStreakData = data.streakDates
          ? data.streakDates.map((date) => ({
            date: new Date(date).toISOString().slice(0, 10),
            count: 1,
          }))
          : [];
        setStreakData(formattedStreakData);

        console.log(streakData);


      } else {
        console.error('Failed to save user stats');
      }
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const updateUserStats = async () => {

    try {
      const response = await fetch('http://localhost:5000/api/auth/userstats/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, age, height, weight, run, strength, cardio }),
      });
      const data = await response.json();

      if (response.ok) {
        if (response.status == 200) {
          seterror(data.message)
          setTimeout(() => {
            seterror()
          }, 2000);
        }
      } else {
        console.error('Failed to save user stats');
      }
    }
    catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchUserStats()
  }, [email]);


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

  useEffect(() => {
    // Calculate percentages
    const runPercentage = ((runtoday / run) * 100).toFixed(2) || 0;
    const strengthPercentage = ((strengthtoday / strength) * 100).toFixed(2) || 0;
    const cardioPercentage = ((cardiotoday / cardio) * 100).toFixed(2) || 0;

    // Update dataPoints
    setDataPoints([
      { y: parseFloat(runPercentage), label: `Run (${runPercentage}%)` },
      { y: parseFloat(strengthPercentage), label: `Strength (${strengthPercentage}%)` },
      { y: parseFloat(cardioPercentage), label: `Cardio (${cardioPercentage}%)` },
    ]);
  }, [run, strength, cardio, runtoday, strengthtoday, cardiotoday]);

  const options = {
    theme: "light2",
    animationEnabled: true,
    backgroundColor: "#FFFBEB",
    title: {
      text: "Today's Goal Completion (%)",
    },
    data: [
      {
        type: "pie",
        showInLegend: true,
        legendText: "{label}",
        toolTipContent: "{label}: <strong>{y.toFixed(2)}%</strong>",
        indexLabel: "{label}: {y.toFixed(2)}%",
        dataPoints: dataPoints,
      },
    ],
  };


  return (
    <div>
      {error && <div className='flex w-full justify-center'><p className='bg-slate-600 md:text-xl text-center w-2/3 md:w-1/3 z-50 text-green-500 font-semibold rounded-xl px-2 py-1'>*{error}</p></div>}
      <header className='flex md:rounded-b-[4cm] max-md:rounded-b-[1cm] py-3 items-center shadow-xl shadow-slate-700 justify-evenly'>
        <div className='text-3xl text-center w-1/3 font-bold bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]'>{name}</div>
        <div className='flex gap-2 flex-wrap w-2/3 justify-evenly'>
          <div className='flex gap-3'>
            <div className='text-lg font-bold'>Age</div>
            <input type="number" value={age} onChange={(e) => { setage(e.target.value) }} className='hide-arrows max-sm:w-12 outline-none cursor-default rounded-xl shadow-inner shadow-zinc-600 font-semibold w-20 px-2' />
            <div className='flex items-center'>
              <button onClick={updateUserStats}>
                <FaEdit />
              </button>
            </div>
          </div>
          <div className='flex gap-3'>
            <div className='text-lg font-bold'>Height(cm)</div>
            <input type="number" value={height} onChange={(e) => { setheight(e.target.value) }} className='max-sm:w-12 hide-arrows outline-none cursor-default rounded-xl shadow-inner shadow-zinc-600 font-semibold w-20 px-2' />
            <div className='flex items-center'>
              <button onClick={updateUserStats}>
                <FaEdit />
              </button>
            </div>
          </div>
          <div className='flex gap-3'>
            <div className='text-lg font-bold'>Weight(lbs)</div>
            <input type="number" value={weight} onChange={(e) => { setweight(e.target.value) }} className='max-sm:w-12 hide-arrows outline-none cursor-default rounded-xl shadow-inner shadow-zinc-600 font-semibold w-20 px-2' />
            <div className='flex items-center'>
              <button onClick={updateUserStats}>
                <FaEdit />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="p-4 mt-9 bg-slate-700 rounded-b-[2cm] max-sm:rounded-b-3xl shadow-xl shadow-gray-700">
        <h3 className="text-2xl animate-glow text-center font-semibold text-white mb-4">
          Your Daily Streak
        </h3>
        <CalendarHeatmap
          startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))} // One year ago
          endDate={new Date()} // Today
          values={streakData} // Array of dates with activities
          classForValue={(value) => {
            if (!value) return "fill-gray-400"; // Tailwind fill class for empty cells
            if (value.count >= 4) return "fill-green-700";
            if (value.count === 3) return "fill-green-600";
            if (value.count === 2) return "fill-green-500";
            if (value.count === 1) return "fill-green-400";
            return "fill-gray-400"; // Fallback
          }}
          gutterSize={4} // Adjust spacing between squares
          showWeekdayLabels={true} // Show weekday labels if needed
        />
      </div>
      <div className='flex w-full justify-center mt-4'>
      <button onClick={updateUserStats} className="inline-flex text-lg font-semibold mt-3 animate-shimmer items-center justify-center rounded-2xl border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 py-1 text-slate-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:scale-105 duration-300">
            Tap for Streak
          </button>
      </div>
      <div className='flex justify-evenly max-sm:justify-between max-sm:gap-5 w-full py-5 mt-5'>
        <div className='flex flex-col'>
          <h1 className="text-2xl max-sm:text-lg font-bold bg-gradient-to-r from-gray-800 via-gray-500 to-gray-800 bg-clip-text text-transparent">
            Daily Goals (min)
          </h1>
          <div className='flex flex-col gap-3 mt-2'>
            <div className='flex gap-3'>
              <h1 className='text-xl font-bold max-sm:text-sm'>
                Running :
              </h1>
              <input type="number" value={run} onChange={(e) => { setrun(e.target.value) }} className='max-sm:w-12 hide-arrows outline-none cursor-default rounded-xl shadow-inner shadow-zinc-600 font-semibold w-16 px-2' />
              <div className='flex items-center'>
                <button onClick={updateUserStats}>
                  <FaEdit />
                </button>
              </div>
            </div>
            <div className='flex gap-3'>
              <h1 className='text-xl font-bold max-sm:text-sm'>
                Gym :
              </h1>
              <input type="number" value={strength} onChange={(e) => { setstrength(e.target.value) }} className='max-sm:w-12 hide-arrows outline-none cursor-default rounded-xl shadow-inner shadow-zinc-600 font-semibold w-16 px-2' />
              <div className='flex items-center'>
                <button onClick={updateUserStats}>
                  <FaEdit />
                </button>
              </div>
            </div>
            <div className='flex gap-3'>
              <h1 className='text-xl font-bold max-sm:text-sm'>
                Cardio :
              </h1>
              <input type="number" value={cardio} onChange={(e) => { setcardio(e.target.value) }} className='max-sm:w-12 hide-arrows outline-none cursor-default rounded-xl shadow-inner shadow-zinc-600 font-semibold w-16 px-2' />
              <div className='flex items-center'>
                <button onClick={updateUserStats}>
                  <FaEdit />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <h1 className="text-2xl max-sm:text-lg font-bold bg-gradient-to-r from-gray-800 via-gray-500 to-gray-800 bg-clip-text text-transparent">
            Completed Today (min)
          </h1>
          <div className='flex flex-col gap-3 mt-2'>
            <div className='flex gap-3'>
              <h1 className='text-xl font-bold max-sm:text-sm'>
                Running :
              </h1>
              <input type="number" value={runtoday} onChange={(e) => { setruntoday(e.target.value) }} className='max-sm:w-12 hide-arrows outline-none cursor-default rounded-xl shadow-inner shadow-zinc-600 font-semibold w-16 px-2' />
            </div>
            <div className='flex gap-3'>
              <h1 className='text-xl font-bold max-sm:text-sm'>
                Gym :
              </h1>
              <input type="number" value={strengthtoday} onChange={(e) => { setstrengthtoday(e.target.value) }} className='max-sm:w-12 hide-arrows outline-none cursor-default rounded-xl shadow-inner shadow-zinc-600 font-semibold w-16 px-2' />
            </div>
            <div className='flex gap-3'>
              <h1 className='text-xl font-bold max-sm:text-sm'>
                Cardio :
              </h1>
              <input type="number" value={cardiotoday} onChange={(e) => { setcardiotoday(e.target.value) }} className='max-sm:w-12 hide-arrows outline-none cursor-default rounded-xl shadow-inner shadow-zinc-600 font-semibold w-16 px-2' />
            </div>
          </div>
        </div>
      </div>
      <div>
        <CanvasJSChart options={options} />
      </div>
    </div>
  )
}

export default Dashboard
