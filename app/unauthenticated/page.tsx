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
        <div>
            Please sign in
            <Login />
        </div>
    )
}