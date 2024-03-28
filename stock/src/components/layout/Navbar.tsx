import React from 'react'
import { Card } from '../ui/card'
import { NavbarItem } from '../nav-menu/NavbarItem'
import Image from 'next/image'
import Link from 'next/link'

export const Navbar = () => {
    return (
        <div className='flex h-[62px] border items-center shadow justify-between '>
            <div className='p-4 flex items-center'>
                <Image src="/assets/images/logo/PHOENIX_60x60.png" alt='Logo' width={38} height={38} />
                <Link href="/"><span className='pl-2 text-2xl text-cyan-400 font-lexend 
                hover:text-cyan-500'>PHOENIX</span></Link>
            </div>
            <div className='pr-8'>
                <NavbarItem />
            </div>
        </div>
    )
}
