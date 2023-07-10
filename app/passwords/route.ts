import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { error } from "console";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const {type, vault, id} = await request.json();

    const supabase = createRouteHandlerClient<Database>({ cookies });

    if (type === "update") {
        const { data, error } = await supabase.from("passwords").update({vault: vault}).match({ user_id: id });
        if (error) {
            console.log(error);
        }
        return NextResponse.json(data);
    }
    else {
        console.log("bad request %s", type);
    }
}