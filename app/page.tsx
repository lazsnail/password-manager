import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import PasswordListDisplay from "@/components/PasswordListDisplay";
import Header from "@/components/Header";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: {session} } = await supabase.auth.getSession();
  
  if (!session) {
      redirect('/unauthenticated')
  }

  const { data, error } = await supabase.from("passwords").select().single();
  const vault = data ? data["vault"] : "empty";

  console.log(vault);

  return (
    <>
        <h1 className="text-2xl">Hello {session.user.email}</h1>
        <Header vault={vault} />
        <PasswordListDisplay data={vault}/>
    </>
  )
}