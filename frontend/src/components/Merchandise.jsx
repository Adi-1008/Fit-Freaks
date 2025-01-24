import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { FocusCards } from "./ui/focus-cards";

function Merchandise() {
  const navigate = useNavigate()
  const [name, setname] = useState()
  const [email, setemail] = useState()


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
    setname(data.name)
    setemail(data.email)
  }

  const token = localStorage.getItem('token');
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

  const handlePayment = async (amount) => {
    let mob = prompt("Enter Your Phone number")

    if (mob.length !== 10 || isNaN(mob)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    const response = await fetch('http://localhost:5000/api/auth/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const order = await response.json();

    const options = {
      key: 'key',
      amount: order.amount,
      currency: 'INR',
      name: 'Fit-Freaks',
      description: 'Test Transaction',
      order_id: order.id,
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: name,
        email: email,
        contact: mob
      },
      theme: {
        color: '#F37254'
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const cards = [
    {
      title: "Sipper Bottle",
      src: "https://m.media-amazon.com/images/I/81VvR-6eI4L._AC_UF1000,1000_QL80_.jpg",
      body:
      <div className='flex flex-col h-40 gap-4 justify-end text-white'>
      <div className='text-xl font-bold'>₹ 179</div>
      <button className='bg-blue-600 rounded-xl py-1 hover:bg-blue-900 transition duration-500 font-semibold' onClick={() => {
        handlePayment(179)
      }
      }>
        Buy Now
      </button>
    </div>
    },
    {
      title: "Slim-Fit T-Shirt",
      src: "https://wisetrolley.com/wp-content/uploads/2020/10/Push-Harder-Than-Yesterday-Gym-T-shirts-Black.jpg",
      body:
      <div className='flex flex-col h-40 gap-4 justify-end text-white'>
      <div className='text-xl font-bold'>₹ 199</div>
      <button className='bg-blue-600 rounded-xl py-1 hover:bg-blue-900 transition duration-500 font-semibold' onClick={() => {
        handlePayment(199)
      }
      }>
        Buy Now
      </button>
    </div>
    },
    {
      title: "Gym Gloves",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRttdwiWPzDxBNRLFOSFoyM729tffT7jznTpQ&s",
      body:
      <div className='flex flex-col h-40 gap-4 justify-end text-white'>
      <div className='text-xl font-bold'>₹ 349</div>
      <button className='bg-blue-600 rounded-xl py-1 hover:bg-blue-900 transition duration-500 font-semibold' onClick={() => {
        handlePayment(349)
      }
      }>
        Buy Now
      </button>
    </div>
    },
    {
      title: "Gym-Bag",
      src: "https://contents.mediadecathlon.com/p2426985/bbcddd9478ef14df6702955943051249/p2426985.jpg?format=auto&quality=70&f=2520x0",
      body:
      <div className='flex flex-col h-40 gap-4 justify-end text-white'>
      <div className='text-xl font-bold'>₹ 1099</div>
      <button className='bg-blue-600 rounded-xl py-1 hover:bg-blue-900 transition duration-500 font-semibold' onClick={() => {
        handlePayment(1099)
      }
      }>
        Buy Now
      </button>
    </div>
    },
    {
      title: "Lifting Straps",
      src: "https://image.made-in-china.com/202f0j00jWGcVOlPrikK/Weightlifting-Gym-Weight-Lifting-Straps-Fitness-Training-Wrist-Wraps-Padded-Hand-Bands.webp",
      body:
      <div className='flex flex-col h-40 gap-4 justify-end text-white'>
      <div className='text-xl font-bold'>₹ 259</div>
      <button className='bg-blue-600 rounded-xl py-1 hover:bg-blue-900 transition duration-500 font-semibold' onClick={() => {
        handlePayment(259)
      }
      }>
        Buy Now
      </button>
    </div>
    },
    {
      title: "Whey Protein 1kg",
      src: "https://naturaltein.in/wp-content/uploads/2022/05/33-servings-conc-chocolate.webp",
      body:
      <div className='flex flex-col h-40 gap-4 justify-end text-white'>
      <div className='text-xl font-bold'>₹ 1499</div>
      <button className='bg-blue-600 rounded-xl py-1 hover:bg-blue-900 transition duration-500 font-semibold' onClick={() => {
        handlePayment(1499)
      }
      }>
        Buy Now
      </button>
    </div>
    },
    {
      title: "Creatine 100g",
      src: "https://www.ascentprotein.com/cdn/shop/files/on_black4_zoom.jpg?v=1726809120&width=640",
      body:
      <div className='flex flex-col h-40 gap-4 justify-end text-white'>
      <div className='text-xl font-bold'>₹ 699</div>
      <button className='bg-blue-600 rounded-xl py-1 hover:bg-blue-900 transition duration-500 font-semibold' onClick={() => {
        handlePayment(699)
      }
      }>
        Buy Now
      </button>
    </div>
    },
    {
      title: "Pre-Workout 150g",
      src: "https://m.media-amazon.com/images/I/81LEQvbGVsL.jpg",
      body:
        <div className='flex flex-col h-40 gap-4 justify-end text-white'>
          <div className='text-xl font-bold'>₹ 649</div>
          <button className='bg-blue-600 rounded-xl py-1 hover:bg-blue-900 transition duration-500 font-semibold' onClick={() => {
            handlePayment(649)
          }
          }>
            Buy Now
          </button>
        </div>
    },
    {
      title: "Mass Gainer 5kg",
      src: "https://26inchesnutrition.com/wp-content/uploads/2023/10/Kong-mass-3kg.webp",
      body:
      <div className='flex flex-col h-40 gap-4 justify-end text-white'>
      <div className='text-xl font-bold'>₹ 2599</div>
      <button className='bg-blue-600 rounded-xl py-1 hover:bg-blue-900 transition duration-500 font-semibold' onClick={() => {
        handlePayment(2599)
      }
      }>
        Buy Now
      </button>
    </div>
    },
  ];

  return (
    <div>
      <div className='w-full flex justify-center bg-[#A10404] hover:bg-red-500 transition duration-300 border-b-2 border-white'>
        <div className='w-2/3 text-center md:text-lg text-sm text-white'>Note : We are not offering delivery services right at the moment. Kindly consider placing the order from our website and pickup the order from our store.
          <br/>Thank You!</div>
      </div>
      <FocusCards cards={cards} />
    </div>
  )
}

export default Merchandise
