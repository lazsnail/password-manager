"use server"

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import { Database } from "@/types/supabase";
import MainScreen from "@/components/MainScreen";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: {session} } = await supabase.auth.getSession();
  
  if (!session) {
      redirect('/login')
  }

  const { data, error } = await supabase.from("passwords").select().single();
  const vault = data ? data["vault"] : "{}";
  const id = data ? data["user_id"] : "";

  return (
    <div className="flex justify-center">
      <MainScreen vault={vault} id={id}/>
    </div>
  )
}