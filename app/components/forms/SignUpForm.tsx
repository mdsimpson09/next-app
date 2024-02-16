'use client';
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '@radix-ui/themes';
import { Input } from "../ui/input";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Router, { useRouter } from 'next/navigation';
import Link from 'next/link';
import GoogleSignInButton from '../ui/GoogleSignInButton';
import { toast, useToast } from '@/components/ui/use-toast';




const FormSchema = z.object({
  email: z.string().min(2, 'Email is required').email('Invalid Email'),
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().min(2, 'Last name is required'),
  password: z.string().min(1, 'Passowrd is required').min(8, 'Password must have 8 characters'),
  username: z.string().min(1, 'Username is required').min(8),
  confirmPassword: z.string().min(1, 'Password confirmation is required'),
  image: z.string().url('Invalid URL format')
})
.refine((data)=> data.password === data.confirmPassword,{
  path: ['confirmPassword'],
  message: 'Passowords so not match'
})

const SignUpForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name:"",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword:"",
      image:""
    },
  });
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username,
        email: values.email,
        password: values.password,
        image: values.image,
      }),
    })
    if(response.ok) {
      setIsSubmitted(true);
    } else {
      toast({
        title: "Error",
        description: "Oops! Something went wrong!",
        variant: "destructive",
      })      
    }

    // if (response.ok) {
    //   router().push("/home");
    // } else {
    //   console.error("Registration failed");
    // }
  }
  useEffect(() => {
    if(isSubmitted) {
      router.push("/login");
    }
  }, [isSubmitted]);

  return (
    <div className='flex justify-center items-center bg-indigo-200 p-10 rounded-xl min-w-7 w-[475px] h-[650px]'>
        <div className='max-w-3xl py-6 px-6 bg-white shadow-md rounded-md my-8 w-[375px] h-[550px] overflow-y-auto hide-scrollbar'>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
       <div>
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name:</FormLabel>
              <FormControl>
              <input className= 'border indigo-200 rounded-sm flex w-full items-center justify-evenly' placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
               <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name:</FormLabel>
              <FormControl>
                <input className= 'border indigo-200 rounded-sm flex w-full items-center justify-evenly' placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
              <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username:</FormLabel>
              <FormControl>
              <input className= 'border indigo-200 rounded-sm flex w-full items-center justify-evenly' placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
  
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
              className= 'border indigo-200 rounded-sm flex w-full items-center justify-evenly' placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
              <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Re-Enter your password</FormLabel>
              <FormControl>
              <input 
              type= "password"
              className= 'border indigo-200 rounded-sm flex w-full items-center justify-evenly' placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
           <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image:</FormLabel>
                  <FormControl>
                    <input 
                      type="text" 
                      className='border border-indigo-200 rounded-md w-full p-2' 
                      placeholder="Image URL" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        <br></br>
      </div>
        <Button className='w-full' type="submit">Register</Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:bloack after:h-px after:flex-grow after:bg-stone-400'>
       or
      </div>
       <GoogleSignInButton>Sign-in with Google</GoogleSignInButton>
    <p className= "text-center text-sm text-gray-600 mt-2">
          If you really don&apos;t want to sign up, you can return&nbsp; 
          <Link className='text-blue-500 hover:underline' href= '/'>Home</Link>.
    </p>
    </Form>
    </div>  
    </div>

  );
};
export default SignUpForm
