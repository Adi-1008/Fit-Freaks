import React from 'react'
import { FloatingDock } from "./ui/floating-dock";
import logo from '../assets/Logo.png';
import {
    IconBrandInstagram,
    IconBrandX,
    IconBrandFacebook,
    IconHome,
    IconLink,
    IconUser,
    IconBrandBlogger,
} from "@tabler/icons-react";

function Footer() {

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

    return (
        <footer className='flex mt-4 flex-col justify-center items-center align-middle bg-gradient-to-r from-slate-950 via-gray-950 to-zinc-950 min-h-40'>
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
    )
}

export default Footer
