"use client"

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import CryptoJS from "crypto-js";

type NewPasswordProps = {
    vault: string;
    id: string;
    setDisplay : Dispatch<SetStateAction<string>>;
}

export default async function NewPassword({ vault, id, setDisplay } : NewPasswordProps) {
    const key = localStorage?.getItem('vaultKey') ?? "";
    if (key == "") {
        console.log("need vault key");
    }

    var decrypted = "";
    var passwords = JSON.parse("{}");
    if (vault !== "{}") {
        decrypted = CryptoJS.AES.decrypt(vault, key).toString(CryptoJS.enc.Utf8);;
        passwords = JSON.parse(decrypted);
    }

    const router = useRouter();

    const addPassword = async (formData: FormData) => {
        const website = String(formData.get("website"));
        const username = String(formData.get("username"));
        const password = String(formData.get("password"));

        passwords[website] = {username: username, password: password}

        // Encrypt vault
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(passwords), key).toString();

        await fetch(location.origin + '/passwords', {
            method: 'put',
            body: JSON.stringify({ type: "update", vault: encrypted, id: id})
        })

        setDisplay("main");
        router.refresh();
    }

    return (
        <form action={addPassword} className="w-screen max-w-[600px] bg-black text-white rounded flex flex-col">
            <button onClick={() => setDisplay("main")} className="bg-transparent text-violet-400 rounded text-left ml-6 mb-4 mt-4">Close</button>
            <b className="text-3xl ml-6 mb-4 text-left">New Password</b>
            <div className="flex flex-col mb-4">
                <b className="w-28 ml-6 text-left">Website</b>
                <input name="website" className="bg-violet-600 dark:text-white mr-6 ml-6 p-3 rounded" required/>
            </div>
            <div className="flex flex-col mb-4">
                <b className="w-28 ml-6 text-left">Username</b>
                <input name="username" className="bg-violet-600 dark:text-white mr-6 ml-6 p-3 rounded" required/>
            </div>
            <div className="flex flex-col mb-10">
                <b className="w-28 ml-6 text-left">Password</b>
                <input name="password" type="password" className="bg-violet-600 dark:text-white mr-6 ml-6 p-3 rounded" required/>
            </div>
            <div className="flex justify-between ml-6 pr-5 pb-3">
                <button type="submit" className="bg-violet-600 text-white p-3 rounded font-bold">Submit</button>
            </div>
        </form>
    )
}