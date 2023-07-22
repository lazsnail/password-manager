"use server"

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import PasswordListDisplay from "@/components/PasswordListDisplay";
import Header from "@/components/Header";
import { Database } from "@/types/supabase";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: {session} } = await supabase.auth.getSession();
  
  if (!session) {
      redirect('/unauthenticated')
  }

  const { data, error } = await supabase.from("passwords").select().single();
  const vault = data ? data["vault"] : "{}";
  const id = data ? data["user_id"] : "";

  return (
    <div className="flex justify-center">
      <div className="w-[600px] min-w-[300px] p-3">
          <h1 className="text-3xl mb-2 font-bold">Passwords</h1>
          <Header vault={vault} id={id}/>
          <PasswordListDisplay data={vault} id={id}/>
      </div>
    </div>
  )
}