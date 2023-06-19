import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import NewPassword from "../components/NewPassword";
import Password from "../components/PasswordDisplay";
import PasswordEdit from "../components/PasswordEdit";
import PasswordListDisplay from "@/components/PasswordListDisplay";
import SignOut from "@/components/SignOut";
import Header from "@/components/Header";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: {session} } = await supabase.auth.getSession();
  
  if (!session) {
      redirect('/unauthenticated')
  }

  const { data: passwords, error } = await supabase.from("passwords").select();

  return (
    <>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Hello {session.user.email}</h1>
          <SignOut />
        </div>
        <Header />
        <PasswordListDisplay passwords={passwords ?? []}/>
    </>
  )
}