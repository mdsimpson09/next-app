"use client";
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/editer';
import { Button } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Router, { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast, useToast } from '@/components/ui/use-toast';




const FormSchema = z.object({
  //   first_name: z.string().min(2),
  //   last_name: z.string().min(2),
  username: z.string().min(2).or(z.string().optional()),
  bio: z.string().optional(),
  looking_for: z.string().optional(),
  image: z.string().optional()
});


const EditForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
    //   first_name:"",
    //   last_name: "",
      // username: "",
      bio:"",
      looking_for:"",
      image:""
     
    },
  });
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const payload = {
      // Include only the fields that are not undefined.
      ...values.bio && { bio: values.bio },
      ...values.looking_for && { looking_for: values.looking_for },
      ...values.image && { image: values.image }
    };
    const response = await fetch("/api/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
      // {username:values.username,
      //   bio: values.bio || "",
      //   looking_for: values.looking_for || "",
      //     image: values.image || ""}
        payload
      ),
    })
    if(response.ok) {
      setIsSubmitted(true);
      toast({
        title: "Success",
        description: "Profile updated successfully!",
        variant: "default",
      })
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
      router.push("/profile");
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
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About You:</FormLabel>
              <FormControl>
              <textarea 
                      className='border border-indigo-200 rounded-md w-full p-2 resize-none' 
                      placeholder="Tell us about yourself..." 
                      {...field} 
                    />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
  
  <FormField
          control={form.control}
          name="looking_for"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Looking For:</FormLabel>
              <FormControl>
              <textarea 
                      className='border border-indigo-200 rounded-md w-full p-2 resize-none' 
                      placeholder="What are you hoping to find on Gamer Date?" 
                      {...field} 
                    />
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
              <FormLabel>Update your photo:</FormLabel>
              <FormControl>
              <input className= 'border indigo-200 rounded-sm flex w-full items-center justify-evenly' placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
 
        />
      </div>
      <div>
            <br></br>
      </div>
        <Button className='w-full' type="submit">Update Profile</Button>
      </form>
      
      
    </Form>
    </div>
    </div>
  );
};
export default EditForm;