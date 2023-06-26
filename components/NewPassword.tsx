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
        <div className="fixed w-screen h-screen top-0 left-0 bg-slate-500/[.4] flex justify-center items-center">
            <div onClick={() => setPopup(false)} className="fixed left-0 w-2/3 h-screen"></div>
            <form action={addPassword} className="fixed right-0 bg-white w-1/3 h-screen text-black text-center rounded flex flex-col">
                <b className="text-3xl pt-10 pb-10 mb-10 bg-gray-100">New Password</b>
                <div className="flex items-center mb-4">
                    <h2 className="w-28 text-right pr-4">Website</h2>
                    <input name="website" className="text-black mr-2 pl-2 rounded border-black border-2"/>
                </div>
                <div className="flex items-center mb-4">
                    <h2 className="w-28 text-right pr-4">Username</h2>
                    <input name="username" className="text-black mr-2 pl-2 rounded border-black border-2"/>
                </div>
                <div className="flex items-center mb-10">
                    <h2 className="w-28 text-right pr-4">Password</h2>
                    <input name="password" className="text-black mr-2 pl-2 rounded border-black border-2"/>
                </div>
                <div className="flex justify-between pl-5 pr-5 pb-3">
                    <button type="submit" className="bg-red-500 text-white p-2 rounded">Submit</button>
                    <button onClick={() => setPopup(false)} className="bg-gray-200 p-3 rounded">Close</button>
                </div>
            </form>
        </div>
    )
}