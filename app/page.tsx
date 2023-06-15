import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import NewPassword from "./new-password";
import Password from "./password";
import PasswordEdit from "./password-edit";
import PasswordListDisplay from "@/components/PasswordDisplay";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: {session} } = await supabase.auth.getSession();
  
  if (!session) {
      redirect('/unauthenticated')
  }

  const { data: passwords, error } = await supabase.from("passwords").select();

  return (
    <>
        <h1>Hello {session.user.email}</h1>
        <NewPassword />
        <PasswordListDisplay passwords={passwords ?? []}/>
    </>
  )
}