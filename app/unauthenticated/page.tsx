import Login from "@/components/Login";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import { useState } from "react";

export default async function Unauthenticated() {
    const supabase = createServerComponentClient<Database>({ cookies })
    const { data: { session }} = await supabase.auth.getSession();

    if (session) {
        redirect('/');
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col">
            <h1 className="text-4xl mb-10">WELCOME TO <i>LOCKBOX</i></h1>
            <Login />
        </div>
    )
}