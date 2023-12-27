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
      // image:""
     
    },
  });
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const response = await fetch("/api/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // username:values.username,
        bio: values.bio,
        looking_for: values.looking_for,
        image: values.image
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
      router.push("/player");
    }
  }, [isSubmitted]);

  return (
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
                <input className= 'rounded-sm flex w-full items-center justify-evenly' placeholder="Tell others about yourself! favorite games, consoles, etc" {...field} />
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
                <input className= 'rounded-sm flex w-full items-center justify-evenly' placeholder="Why are you using Gamer-Date?" type='text'{...field} />
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
                <input className= 'rounded-sm flex w-full items-center justify-evenly' placeholder="Photo URL" type='URL'{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
 
        />
      </div>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:bloack after:h-px after:flex-grow after:bg-stone-400'>

      </div>
        <Button className='w-full' type="submit">Update Profile</Button>
      </form>
      
      
    </Form>
  );
};
export default EditForm;