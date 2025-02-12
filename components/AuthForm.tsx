'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'
 


const AuthForm = ({ type }: {type : string}) => {
   const router = useRouter()
   const [isLoading, setIsLoading] = useState(false)


   const formSchema = authFormSchema(type)
   //define form
 const form = useForm<z.infer<typeof formSchema>>({
   resolver: zodResolver(formSchema),
   defaultValues: {
     email: "",
     password: '',
     firstName: "",
     lastName: "",
     address1: '',
     state: "",
     postalCode: "",
     dateOfBirth: "",
     ssn: "",
     city: '',
   },
 })

const onSubmit = async (data: z.infer<typeof formSchema>) => {
   // Do something with the form values.
   // ✅ This will be type-safe and validated.
   setIsLoading(true)
   
   try {
      //sign up with appwrite & create plain link token

      if(type === 'sign-up') {
         const newUser = await signUp(data);
          
         setUser(newUser)

      } else if(type === 'sign-in') {
         const res = await signIn({
            email: data.email,
            password: data.password
         })

         if(res) {
            router.push('/')
         }
      }
   } catch (error) {
      console.error(error)
      
   } finally {
      setIsLoading(false)
   }
 }
   const [user, setUser] = useState(null)
  return (
    <section className='auth-form'>
         <header className='flex flex-col gap-5 md:gap-8'>
            <Link href='/' className=' flex  cursor-pointer items-center gap-1'>
               <Image
               src='/icons/logo.svg' 
               width={34} 
               height={34} 
               alt='zilo finance - logo'
               
               />
               <h1 
                  className='text-24 font-ibm-Fplex-serif font-bold text-black-1'
               >
                  Zeel Finance
               </h1>
            </Link>
            <div className="flex flex-col gap:1  md:gap-3">
               <h1 className="text-24 lg:text-26 font-semibold text-gray-900">
                  {user
                     ? 'Link Account'
                     : type === 'sign-in'
                        ? 'Sign In'
                        : 'Sign Up'
                  }
               </h1>
               <p className="text-16 font-normal text-gray-600">
                  {
                     user
                     ? 'Link Your Account To Get Started'
                     : 'Please enter your details'
                  }
               </p>
            </div>
         </header>
         {user ? (
            <div className="flex flex-col gap-4">
            {/* PlaidLink */}
            </div>
            ) : (
               <>
                 <Form {...form}>
                   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     {type === 'sign-up' && (
                       <>
                         <div className="flex gap-4">
                           <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' type='text' />
                           <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your first name' type='text' />
                         </div>
                         <CustomInput control={form.control} name='address1' label="Address" placeholder='Enter your specific address' type='text' />
                         <CustomInput control={form.control} name='city' label="City" placeholder='Enter your city' type='text' />
                         <div className="flex gap-4">
                           <CustomInput control={form.control} name='state' label="State" placeholder='Example: NY'type='text' />
                           <CustomInput control={form.control} name='postalCode' label="Postal Code" placeholder='Example: 11101' type='text'/>
                         </div>
                         <div className="flex gap-4">
                           <CustomInput control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='MM-DD-YYYY'type='date' />
                           <CustomInput control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' type='text'/>
                         </div>
                       </>
                     )}
       
                     <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' type='email'/>
       
                     <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' type='password' />
       
                     <div className="flex flex-col gap-4">
                       <Button type="submit" disabled={isLoading} className="form-btn">
                         {isLoading ? (
                           <>
                             <Loader2 size={20} className="animate-spin" /> &nbsp;
                             Loading...
                           </>
                         ) : type === 'sign-in' 
                           ? 'Sign In' : 'Sign Up'}
                       </Button>
                     </div>
                   </form>
                 </Form>
       
                 <footer className="flex justify-center gap-1">
                   <p className="text-14 font-normal text-gray-600">
                     {type === 'sign-in'
                     ? "Don't have an account?"
                     : "Already have an account?"}
                   </p>
                   <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
                     {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                   </Link>
                 </footer>
               </>
             )
            }
   </section>
  )
}

export default AuthForm