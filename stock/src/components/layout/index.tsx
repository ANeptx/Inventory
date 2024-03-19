import React, { ReactNode } from "react"
import { Navbar } from "./Navbar"
import { SideBar} from "./SideBar"
type Props = { children: ReactNode }

export default function Layout({ children }:Props) {
    return (
        <>
            <Navbar />
            <main className='h-screen flex flex-row'>
                <div className='flex'>
                    <SideBar/>
                </div>
                <div className="p-8 w-full bg-gray-100">
                    {children}
                </div>
            </main>
            {/* <Footer /> */}
        </>
    )
}