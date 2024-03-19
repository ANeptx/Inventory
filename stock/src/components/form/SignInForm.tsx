import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

interface SignInProps {
    name: string;
}
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

const SignInForm = (props: SignInProps) => {
    const router = useRouter();
    const { name } = props;
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const { toast } = useToast()
    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        await axios.post(`${process.env.NEXT_PUBLIC_HOST}/auth/signin/`, {
            username: values.username,
            password: values.password,
        }).then(res => {
            if(res.data){
                router.push('/warehouses/');
            } 
        }).catch(error => (

            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        ))
    }
    function checkSign() {
        if (name === "Sign In") {
            const num = 1;
            console.log(num)
            return num
        }
        else if (name === "Sign Up") {
            const num = 2;
            console.log(num)
            return num
        }
    };
    return (

        <Card className="w-[450px]">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button className="bg-sky-800 size-full" type='submit'>Login</Button>
                        </div>

                    </form>
                </Form>
            </CardContent>

        </Card>
    )
}

export default SignInForm