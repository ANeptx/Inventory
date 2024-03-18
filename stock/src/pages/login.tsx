import { useState } from 'react';
import SignInForm from '@/components/form/SignInForm';
import { Toaster } from '@/components/ui/toaster';


export default function Login() {
    return (
        <div className="h-screen flex justify-center items-center bg-slate-100">
            <SignInForm name="Sign In"/>
            <Toaster/>
        </div>
    )

}