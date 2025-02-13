// src/lib/server/appwrite.js
"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client();
    client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) //identify the project
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);


    const cookiesStore = await cookies(); // ✅ Await cookies() first
    const session = cookiesStore.get("appwrite-session"); // ✅ Now call .get()
    
    if (!session || !session.value) {
      throw new Error("No session");
    }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_SECRET!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client)
    },

    get user() {
      return new Users(client)
    }
  };
}
