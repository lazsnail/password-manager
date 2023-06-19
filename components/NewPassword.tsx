"use client"

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type NewPasswordProps = {
    setPopup : Dispatch<SetStateAction<boolean>>;
}

export default async function NewPassword({ setPopup } : NewPasswordProps) {
    const router = useRouter();

    const addPassword = async (formData: FormData) => {
        const website = String(formData.get("website"));
        const username = String(formData.get("username"));
        const password = String(formData.get("password"));

        await fetch('http://localhost:3000/passwords', {
            method: 'put',
            body: JSON.stringify({ type: "insert", id: "new", website: website, username: username, password: password})
        })

        setPopup(false);
        router.refresh();
    }

    return (
        <div className="fixed w-screen h-screen top-0 left-0 bg-slate-500/[.4] flex justify-center items-center z-0">
            <form action={addPassword} className="bg-white w-1/3 h-2/3 text-black text-center rounded z-1 flex flex-col">
                <h1>Add New Password</h1>
                <h2>Website</h2>
                <input name="website" className="text-black mr-2"/>
                <h2>Username</h2>
                <input name="username" className="text-black mr-2"/>
                <h2>Password</h2>
                <input name="password" className="text-black mr-2"/>
                <button type="submit">Submit</button>
                <button onClick={() => setPopup(false)}>Close</button>
            </form>
        </div>
    )
}