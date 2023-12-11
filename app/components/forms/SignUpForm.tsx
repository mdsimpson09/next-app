'use client';
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '@radix-ui/themes';
import { Input } from "../ui/input";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import GoogleSignInButton from '../ui/GoogleSignInButton';



const FormSchema = z.object({
  email: z.string().min(2, 'Email is required').email('Invalid Email'),
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().min(2, 'Last name is required'),
  password: z.string().min(1, 'Passowrd is required').min(8, 'Password must have 8 characters'),
  username: z.string().min(1, 'Username is required').min(8),
  confirmPassword: z.string().min(1, 'Password confirmation is required')
})
.refine((data)=> data.password === data.confirmPassword,{
  path: ['confirmPassword'],
  message: 'Passowords so not match'
})
const SignUpForm = () => {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name:"",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword:""
    },
  });
  function onSubmit(values:z.infer<typeof FormSchema>) {
    console.log(values);
  }
  return (
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
                <input className= 'rounded-sm flex w-full items-center justify-evenly' placeholder="" {...field} />
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
                <input className= 'rounded-sm flex w-full items-center justify-evenly' placeholder="" {...field} />
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
                <input className= 'rounded-sm flex w-full items-center justify-evenly' placeholder="" {...field} />
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
                <input className= 'rounded-sm flex w-full items-center justify-evenly' placeholder="mail@example.com" type='email'{...field} />
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
                <input className= 'flex mb-2 rounded-sm w-full items-center justify-center' type='password' placeholder="Password" {...field} />
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
                <input className= 'flex mb-2 rounded-sm w-full items-center justify-center' type='password' placeholder="Re-Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
      </div>
        <Button className='w-full' type="submit">Register</Button>
        <GoogleSignInButton>Sign-in with Google</GoogleSignInButton>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:bloack after:h-px after:flex-grow after:bg-stone-400'>
       or
      </div>
      
    <p className= "text-center text-sm text-gray-600 mt-2">
          If you really don't want to sign up, you can return&nbsp; 
          <Link className='text-blue-500 hover:underline' href= '/'>Home</Link>.
    </p>
    </Form>
  );
};
export default SignUpForm
