"use client";
import React from 'react'
import img1 from '../assets/image1.jpg';
import logo from '../assets/Logo.png';
import { TypeAnimation } from 'react-type-animation';
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import img2 from '../assets/image2.jpg'
import diet from '../assets/diet-plan.jpg'
import track from '../assets/track.png'
import merch from '../assets/merch.jpg'
import { TextRevealCard, } from "./ui/text-reveal-card";
import { HoverBorderGradient } from './ui/hover-border-gradient';
import { Link } from 'react-router-dom';
import { FloatingDock } from "./ui/floating-dock";
import {
  IconBrandInstagram,
  IconBrandX,
  IconBrandFacebook,
  IconHome,
  IconLink,
  IconUser,
  IconBrandBlogger,
} from "@tabler/icons-react";


function Landing() {

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Blog",
      icon: (
        <IconBrandBlogger className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "About Us",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Let's Connect",
      icon: (
        <IconLink className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "FaceBook",
      icon: (
        <IconBrandFacebook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "X",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram stroke={2} className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  const content = [
    {
      title: "Your Diet Plan",
      description:
        "Craft a diet plan tailored to your unique goals. Whether aiming to lose weight, build muscle, or maintain a healthy lifestyle, our platform offers personalized nutrition plans. Gain access to balanced meal suggestions, portion control tips, and food combinations that work best for you.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <img
            src={diet}
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Your Workout plan",
      description:
        "Design your ideal workout plan that aligns with your fitness aspirations. Whether you're looking to build muscle, enhance endurance, or maintain a balanced routine, our platform offers workout schedules. Access a variety of exercises, track your progress to stay motivated. Transform your fitness journey into a structured, achievable plan tailored just for you.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <img
            src={img2}
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Fitness Tracker",
      description:
        "With our intuitive design, monitor your workouts, track progress, and set new targets seamlessly. View detailed analytics, compare performance over time, and stay motivated with personalized insights. Our user-friendly interface ensures all your fitness data is just a tap away, making it easy to stay engaged and committed to your fitness journey.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <img
            src={track}
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Our Merchandise",
      description:
        "Discover our exclusive merchandise collection, designed to complement your active lifestyle. From stylish bags and sippers to durable gloves and trendy t-shirts, we’ve got you covered. Each item is crafted with quality in mind, ensuring comfort and functionality. Stand out with gear that supports your fitness journey and shows off your personal style. Elevate your experience with our premium merchandise selection.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <img
            src={merch}
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
  ];

  return (
    <div className='w-screen h-full bg-amber-50'>
      <div className='flex justify-around py-1'>
        <div className='relative w-min'>
          <img
            src={img1}
            className='max-h-96 max-sm:h-52 max-w-lg max-md:max-w-sm max-sm:w-52 rounded-3xl transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl mx-2'
            alt='Image description'
          />
          <TypeAnimation
            className='absolute top-1/3 text-white left-3 font-bold text-5xl max-md:text-xl max-sm:text-sm max-sm:font-semibold'
            sequence={[
              'Hey You!',
              1000,
              'Yeah You!',
              1000,
              'Wanna Be...\n A Fit-Freak?',
              1000,
              'Come Join Us!',
              1000,
            ]}
            style={{ whiteSpace: 'pre-line' }}
            speed={50}
            repeat={Infinity}
          />
        </div>
        <div className='flex flex-col justify-center items-center mx-3 w-full max-sm:h-auto mt-3'>
          <div className='max-h-16 overflow-y-scroll w-full'>
            <h1 className='max-md:text-xl text-5xl font-bold max-sm:text-lg text-center animate-glow'>
              Have That Geeky Itch In You?
            </h1>
          </div>
          <div className='mt-2 text-center overflow-y-scroll max-h-20'>
            <p className='max-md:text-base text-xl font-mono font-medium max-sm:text-sm'>
              We are here to take care for all your fitness needs.
            </p>
            <p className='max-md:text-base text-xl font-mono font-medium max-sm:text-sm'>
              Let it be Your diet plan...Your Workout plan...
            </p>
            <p className='max-md:text-base text-xl font-mono font-medium max-sm:text-sm'>
              Or Maybe if you're interested in tracking your daily fitness plans..!!
            </p>
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-3 w-screen'>
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl sm:text-5xl xs:text-4xl"
          >
            What we Have... <br /> Right For You..!!
          </motion.h1>
        </LampContainer>
      </div>
      <div className='mt-3'>
        <StickyScroll content={content} />
      </div>
      <div className="flex max-sm:flex-col gap-3 mt-3 items-center justify-evenly bg-gradient-to-r from-zinc-400 to-slate-900 py-5">
        <div>
          <TextRevealCard
            text="Don't just Scroll Away"
            revealText="Transform Yourself Today"
          >
          </TextRevealCard>
        </div>
        <div className='flex flex-col bg-gradient-to-r from-stone-700 to-neutral-900 py-10 px-16 rounded-2xl gap-6 max-md:py-6 max-md:px-9 max-md:gap-4'>
          <button className='flex justify-center text-center'>
            <HoverBorderGradient
              as='button'
              containerClassName='rounded-full'
              className='dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-4 py-2'
            >
              <Link to={"/login"}><span>Login</span></Link>
            </HoverBorderGradient>
          </button>
          <button className='flex justify-center text-center'>
            <HoverBorderGradient
              as='button'
              containerClassName='rounded-full'
              className='dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-4 py-2'
            >
              <Link to={"/signup"}><span>Sign Up</span></Link>
            </HoverBorderGradient>
          </button>
        </div>
      </div>
      <footer className='flex flex-col justify-center items-center align-middle bg-gradient-to-r from-slate-950 via-gray-950 to-zinc-950 min-h-40'>
        <div className="flex items-center justify-around w-full">
          <div>
            <img src={logo} className='h-28 w-46 max-sm:h-20 max-sm:w-32' alt="" />
          </div>
          <div>
          <FloatingDock
            mobileClassName="translate-y-20"
            items={links}
          />
          </div>
        </div>
        <div className="flex p-4 text-center text-white bg-black bg-opacity-20">
          © 2024 Copyright : Fit-Freaks™ . All Rights Reserved .
        </div>
      </footer>
    </div>
  )
}

export default Landing
