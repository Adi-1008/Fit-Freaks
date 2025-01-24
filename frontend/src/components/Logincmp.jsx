"use client";
import React from "react";
import { Label } from "./ui/label";
import { cn } from "../lib/utils";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuroraBackground } from "./ui/aurora-background";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Logincmp() {

  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const [error, seterror] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "id",
      callback: handleGoogleSignIn,
    });
    google.accounts.id.renderButton(
      document.getElementById('googleSignInDiv'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  const handleGoogleSignIn = (response) => {
    // Send token to backend for verification and user creation
    fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: response.credential }),
    })
      .then(res => {
        if (!res.ok) {
          seterror("Authentication failed..!")
          setTimeout(() => {
            seterror();
          }, 2000);
        }
        return res.json()
      })
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          seterror("Redirecting...");
          setTimeout(() => {
            seterror();
            navigate("/workoutplan");
          }, 2000);
        }
        else {
          seterror("Authentication failed..!")
          setTimeout(() => {
            seterror();
          }, 2000);
        }
      })
      .catch(error => {
        seterror(error.message)
        setTimeout(() => {
          seterror();
        }, 2000);
      })
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    var authUser = {email, password};
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(authUser)
      });
      const data = await response.json();
      
      if (response.status === 201) {
        localStorage.setItem('token', data.token);
        seterror(data.message);
        setTimeout(() => {
          seterror();
          setemail();
          setpassword();
          navigate("/workoutplan");
        }, 2000);

      } else if (response.status === 400) {
        seterror(data.message);
        setTimeout(() => seterror(), 2000);
      } else {
        seterror(data.error || "An unknown error occurred");
        setTimeout(() => seterror(), 2000);
      }
  } catch (error) {
      console.error('Login error:', error);
  }
  };
  return (
    <AuroraBackground className={"m-0"}>
      <button className="absolute top-4 max-sm:top-20 max-sm:right-10 z-50 text-white right-6">
          <Link to={"/"}><MdOutlineCancel size={40} /></Link>
        </button>
      {error && <p className='bg-teal-300 z-50 text-red-500 font-semibold rounded-xl px-2 py-1 top-5 absolute'>*{error}</p>}
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div
          className="border-2 border-white max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome Back Fit-Freak
          </h2>
          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
              <div className="absolute inset-x-0 h-[1px] w-2/3 mx-auto shadow-2xl  bg-gradient-to-r from-transparent via-[#cc0000] to-transparent" />
                <input onChange={(e)=>{setemail(e.target.value)}} className="flex h-10 w-full border-none dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
        file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
        focus-visible:outline-none focus-visible:ring-[0]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
         disabled:cursor-not-allowed disabled:opacity-50
         dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
         group-hover/input:shadow-none" placeholder="fit-freaks@gmail.com" type="email" id="email" />
              </div>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <div className="absolute inset-x-0 h-[1px] w-2/3 mx-auto shadow-2xl bg-gradient-to-r from-transparent via-[#cc0000] to-transparent" />
                <input onChange={(e)=>{setpassword(e.target.value)}} className="flex h-10 w-full border-none dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
        file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
        focus-visible:outline-none focus-visible:ring-[0]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
         disabled:cursor-not-allowed disabled:opacity-50
         dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
         group-hover/input:shadow-none" placeholder="*******" type="password" id="password" />
              </div>
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit">
            Login &rarr;
            <BottomGradient />
          </button>
          <span className="text-white mt-3 -mb-5 text-center w-full font-bold flex justify-center">OR</span>
        </form>
        <div id="googleSignInDiv"></div>
      </div>
    </motion.div>
    </AuroraBackground >
  );
}

const BottomGradient = () => {
  return (<>
    <span
      className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span
      className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>);
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    (<div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>)
  );
};
