"use server"

import Login from "@/components/Login";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Unauthenticated() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <h1 className="text-center text-4xl mb-8">
        WELCOME TO <br></br><i className="text-violet-500 text-5xl underline">LOCKBOX</i>
      </h1>
      <Login />
    </div>
  );
}
