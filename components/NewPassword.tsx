import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function NewPassword() {
    const addPassword = async (formData: FormData) => {
        'use server'
        const website = String(formData.get("website"));
        const username = String(formData.get("username"));
        const password = String(formData.get("password"));
        const supabase = createServerActionClient<Database>({ cookies });
        const { error } = await supabase.from("passwords").insert({website: website, username: username, password: password});
        console.log(error);
        revalidatePath('/');
    }

    return (
        <form action={addPassword} className="mb-2">
            <h1>Add New Password</h1>
            <input name="website" className="text-black mr-2"/>
            <input name="username" className="text-black mr-2"/>
            <input name="password" className="text-black mr-2"/>
            <button type="submit">Submit</button>
        </form>
    )
}