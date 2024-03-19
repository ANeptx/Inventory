import React from 'react'
import { SidebarItemMenu } from '../sidebar-menu/SidebarItemMenu'

export const SideBar = () => {
    return (
        <div className='h-screen w-fit px-4 flex-1 border-r hidden md:flex shadow-lg justify-center mt-4'>
            <SidebarItemMenu />
        </div>
    )
}
