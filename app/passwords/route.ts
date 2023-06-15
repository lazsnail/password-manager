import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const {id, newWebiste, newUsername, newPassword} = await request.json();

    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { data, error } = await supabase.from("passwords").update({"website": newWebiste, "username": newUsername, "password": newPassword}).match({ id })
    return NextResponse.json(data);
}