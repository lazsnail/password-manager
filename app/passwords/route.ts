import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { error } from "console";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const {type, id, website, username, password} = await request.json();

    const supabase = createRouteHandlerClient<Database>({ cookies });

    if (type === "insert") {
        const { data, error } = await supabase.from("passwords").insert({"website": website, "username": username, "password": password});
        if (error) {
            console.log(error);
        }
        return NextResponse.json(data);
    }
    else if (type === "update") {
        const { data, error } = await supabase.from("passwords").update({"website": website, "username": username, "password": password}).match({ id });
        if (error) {
            console.log(error);
        }
        return NextResponse.json(data);
    }
    else if (type === "delete") {
        const { data, error } = await supabase.from("passwords").delete().match({ id });
        if (error) {
            console.log(error);
        }
        return NextResponse.json(data);
    }
    else {
        console.log("bad request %s", type);
    }
}