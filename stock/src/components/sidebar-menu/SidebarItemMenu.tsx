'use client';

import React from 'react'
import { useEffect } from 'react'
import { Button } from '../ui/button'
import sideBar from '@/constant/sidebar.constant';
import Link from 'next/link';
import { useRouter } from 'next/router';


export const SidebarItemMenu = () => {
    const router = useRouter()

    return (

        <div className='flex flex-col gap-2 '>
            {sideBar.map((item) => (
                <Link href={item.link}>
                    <button
                        className={`p-2 w-full text-left font-lexend font-light px-8 hover:translate-x-1.5 duration-100 rounded-md 
                        ${router.pathname === item.link ? 'bg-cyan-400 text-white font-semibold shadow-md shadow-cyan-500/50'
                                : 'bg-white text-gray-500'
                            }`}
                    >
                        {item.label}
                    </button>
                </Link>
            ))}
        </div>
    )
}
