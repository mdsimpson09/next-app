'use client' 
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/editer';
import { Button } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation'; // Corrected import
import { toast, useToast } from '@/components/ui/use-toast';

type ProfileData = {
  first_name?: string | null;
  username?: string | null;
  bio?: string | null;
  favorite_games?: string | null;
  favorite_device?: string | null;
  looking_for?: string | null;
  twitch?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  discord?: string | null;
  facebook?: string | null;
  image?: string | null;
  player_id?: number;
};

const FormSchema = z.object({
  bio: z.string().optional(),
  looking_for: z.string().optional(),
  favorite_games: z.string().optional(),
  favorite_device: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  twitch: z.string().optional(),
  discord: z.string().optional(),
  image: z.string().optional(),
});

const EditForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({});
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        if (data.player) {
          setProfileData(data.player);
          form.reset({
            bio: data.player.bio || '',
            looking_for: data.player.looking_for || '',
            favorite_games: data.player.favorite_games || '',
            favorite_device: data.player.favorite_device || '',
            image: data.player.image || '',
          });
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load profile data',
          variant: 'destructive',
        });
      }
    };

    fetchProfile();
  }, [form, toast]);

 

  const onSubmit = async (values: ProfileData) => {
    try {
      const response = await fetch('/api/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setIsSubmitted(true);
      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      router.push('/profile');
    }
  }, [isSubmitted]);
  return (
    <div className='flex justify-center items-center bg-indigo-200 p-10 rounded-xl'>
      <div className='max-w-3xl py-6 px-6 bg-white shadow-md rounded-md'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
           
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
              name="favorite_games"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favorite Games:</FormLabel>
                  <FormControl>
                    <textarea 
                      className='border border-indigo-200 rounded-md w-full p-2 resize-none' 
                      placeholder="Tell us what your favorite games are..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="favorite_device"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Gaming Device:</FormLabel>
                  <FormControl>
                    <textarea 
                      className='border border-indigo-200 rounded-md w-full p-2 resize-none' 
                      placeholder="Tell us how you play..." 
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
                      placeholder="What are you hoping to find?" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram:</FormLabel>
                  <FormControl>
                  <input 
                      type="text" 
                      className='border border-indigo-200 rounded-md w-full p-2' 
                      placeholder="Link your Instagram Account" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="discord"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discord:</FormLabel>
                  <FormControl>
                  <input 
                      type="text" 
                      className='border border-indigo-200 rounded-md w-full p-2' 
                      placeholder="Link your Discord Account" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="twitch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitch:</FormLabel>
                  <FormControl>
                  <input 
                      type="text" 
                      className='border border-indigo-200 rounded-md w-full p-2' 
                      placeholder="Link your Twitch Account" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook:</FormLabel>
                  <FormControl>
                  <input 
                      type="text" 
                      className='border border-indigo-200 rounded-md w-full p-2' 
                      placeholder="Link your Facebook Account" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

        <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>X:</FormLabel>
                  <FormControl>
                  <input 
                      type="text" 
                      className='border border-indigo-200 rounded-md w-full p-2' 
                      placeholder="Link your X account" 
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
            <Button type="submit">Update Profile</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditForm;