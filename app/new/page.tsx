"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import NewPassword from "@/components/NewPassword";
import { redirect } from "next/navigation";
import { StrictMode } from "react";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login')
  }

  const { data, error } = await supabase.from("passwords").select().single();
  if (error) {
    redirect('/error');
  }

  const vault = data ? data["vault"] : "{}";
  const id = data ? data["user_id"] : "";

  return (
    <div className="flex justify-center">
        <NewPassword vault={vault} id={id} />
    </div>
  );
}
