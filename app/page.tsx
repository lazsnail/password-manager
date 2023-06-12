import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Login from "./login";

export default async function Home() {

  const supabase = createServerComponentClient({cookies})
  const { data } = await supabase.from("profiles").select();
  return ( 
    <div className="flex flex-col">
      <div className="w-full mb-10">
        <Login />
      </div>
      <div>
        {JSON.stringify(data, null, 2)}
      </div>
    </div>
  )
}