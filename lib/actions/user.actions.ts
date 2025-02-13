'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../server/appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"

export const signIn = async ({email, password} : signInProps) => {
   try {

      //Mutation / database / Make Fetch
      const { account } = await createAdminClient();

      const res = await account.createEmailPasswordSession(email, password)
      return parseStringify(res)
      
   } catch (error) {
      console.error(`Error:`, error)
      return null
   }
}

export const signUp = async (userData : SignUpParams) => {
   const {email, password, firstName, lastName} = userData;
   try {

      //Mutation / database / Make Fetch
      const adminClient = await createAdminClient();
      if (!adminClient || !adminClient.account) {
      throw new Error("Failed to initialize admin client.");
      }
      const { account } = adminClient;
      console.log(adminClient)

      const newUserAccount = await account.create(
         ID.unique(), 
         email, 
         password, 
         `${firstName} ${lastName}`
      );
      const session = await account.createEmailPasswordSession(
         email, 
         password
      );

      const cookiesStore = await cookies()
      cookiesStore.set("appwrite-session", session.secret, {
         path: "/",
         httpOnly: true,
         sameSite: "strict",
         secure: true,
      });
      console.log("New User Account:", newUserAccount);
      return parseStringify(newUserAccount)
      
   } catch (error) {
      console.error(`Error:`, error)
      return null; // or throw error;

   }
}

// ... your initilization functions

export async function getLoggedInUser() {
   try {
     const { account } = await createSessionClient();
     const user =  await account.get();

     return parseStringify(user)
   } catch (error) {
      console.error("Failed to fetch logged-in user:", error);
     return null;
   }
 }
 
 export  async function logoutAccount () {
   try {
      const { account } = await createSessionClient();

      const cookieStore = await cookies();
      cookieStore.delete('appwrite-session');

      await account.deleteSession('current')
   } catch (error) {
      return null
   }
 }