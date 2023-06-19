import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const {id, website, username, password} = await request.json();

    const supabase = createRouteHandlerClient<Database>({ cookies });


    if (id === "new") {
        const { data, error } = await supabase.from("passwords").insert({"website": website, "username": username, "password": password});
        if (error) {
            console.log(error);
        }
        return NextResponse.json(data);
    }
    else {
        const { data, error } = await supabase.from("passwords").update({"website": website, "username": username, "password": password}).match({ id });
        if (error) {
            console.log(error);
        }
        return NextResponse.json(data);
    }
}