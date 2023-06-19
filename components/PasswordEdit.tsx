"use client"

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type PasswordEditProps = {
    password: Password;
    setEdit: Dispatch<SetStateAction<boolean>>;
}

export default function PasswordEdit({ password, setEdit } : PasswordEditProps) {
    const router = useRouter();

    const updatePassword = async (formData: FormData) => {
        const newWebsite = String(formData.get("website"));
        const newUsername = String(formData.get("username"));
        const newPassword = String(formData.get("password"));

        await fetch('http://localhost:3000/passwords', {
            method: 'put',
            body: JSON.stringify({ id: password.id, website: newWebsite, username: newUsername, password: newPassword })
        });
        
        setEdit(false);
        router.refresh();
    }

    return (
        <div className="fixed w-screen h-screen top-0 left-0 bg-slate-500/[.4] flex justify-center items-center z-0">
            <form action={updatePassword} className="bg-white w-1/3 h-2/3 text-black text-center rounded z-1 flex flex-col">
                <b>Edit Password</b>
                <h2>Website</h2>
                <input name="website" type="text" defaultValue={password.website} ></input>
                <h2>Username</h2>
                <input name="username" type="text" defaultValue={password.username}></input>
                <h2>Password</h2>
                <input name="password" type="text" defaultValue={password.password}></input>
                <button type="submit" className="mb-10">Submit</button>
                <button onClick={() => setEdit(false)}>Close</button>
            </form>
        </div>
    )
}