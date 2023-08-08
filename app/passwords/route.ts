"use server"

import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const { type, vault, id } = await request.json();

    const supabase = createRouteHandlerClient<Database>({ cookies });

    if (type === "update") {
        const { data, error } = await supabase.from("passwords").update({ vault: vault }).match({ user_id: id });
        if (error) {
            redirect("/error");
        }
        return NextResponse.json(data);
    }
    else {
        redirect("/error");
    }
}