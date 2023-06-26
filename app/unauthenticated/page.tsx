import Login from "@/components/Login";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default async function Unauthenticated() {
    const supabase = createServerComponentClient<Database>({ cookies })
    const { data: {session}} = await supabase.auth.getSession();

    if (session) {
        redirect('/')
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex justify-center">
                <Login />
                <div className="absolute z-5 rounded-full w-48 h-48 mt-1 bg-white"></div>
                <div className="absolute z-0 rounded-full w-32 h-32 mt-8 bg-black "></div>
            </div>
        </div>
    )
}