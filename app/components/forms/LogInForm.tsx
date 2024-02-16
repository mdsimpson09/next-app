'use client';
import React, { useEffect, useState } from 'react'
import { NextRequest, NextResponse } from 'next/server';

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '@radix-ui/themes';
import { Input } from "../ui/input";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleSignInButton from '../ui/GoogleSignInButton';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"




const FormSchema = z.object({
  email: z.string().min(2, 'Email is required').email('Invalid Email'),
  password: z.string().min(1, 'Passowrd is required').min(8, 'Password must have 8 characters'),
})

const LogInForm = () => {
  // const [isSubmitted, setIsSubmitted] = useState(false);
///////////////
  

  const router = useRouter();
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

   async function onSubmit(values:z.infer<typeof FormSchema>) {
    const signInData = await signIn('credentials',{
      email: values.email, 
      password: values.password,
      redirect:false,
    });
    //////sign in information console ///////
    // console.log(signInData);

    if(signInData?.error){
      toast({
        title: "Error",
        description: "Oops! Something went wrong!",
        variant: "destructive",
      })      
      return;
    } 
    else {
       
        router.push('/main');
        router.refresh()
    }
  }

  return (
    <div className='flex justify-center items-center bg-indigo-200 p-10 rounded-xl min-w-7 w-[475px] h-[650px]'>
    <div className='max-w-3xl py-6 px-6 bg-white shadow-md rounded-md my-8 w-[375px] h-[550px] overflow-y-auto hide-scrollbar'>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
       <div className= 'space-y-2'>
 
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
              <input className= 'border indigo-200 rounded-sm flex w-full items-center justify-evenly' placeholder="" {...field} />
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
              <FormLabel>Password:</FormLabel>
              <FormControl>
              <input 
              type= "password"
              className= 'border indigo-200 rounded-sm flex w-full items-center justify-evenly' 
              placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <br></br>
      </div>
        <Button className='w-full my-6' type="submit">Login</Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:bloack after:h-px after:flex-grow after:bg-stone-400'>
       or
      </div>
      <GoogleSignInButton>Login with Google</GoogleSignInButton>
    <p className= "text-center text-sm text-gray-600 mt-2">
          If you don&apos;t have an account, please&nbsp; 
          <Link className='text-blue-500 hover:underline' href= '/sign-up'>Sign up</Link>.
    </p>
    </Form>
    </div>
    </div>
  );
};
export default LogInForm