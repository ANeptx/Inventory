import React, { ReactNode } from "react"
import { Navbar } from "./Navbar"
import { SideBar} from "./SideBar"
type Props = { children: ReactNode }

export default function Layout({ children }:Props) {
    return (
        <>
            <Navbar />
            <main className='h-screen flex flex-row justify-start bg-red-200'>
            
                <div className='flex-1 p-4'>
                    <SideBar ></SideBar>
                </div>
                <div>
                    {children}
                </div>
            </main>
            {/* <Footer /> */}
        </>
    )
}