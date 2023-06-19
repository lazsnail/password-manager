'use client'

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type PasswordDisplayProps = {
    password: Password;
    setCurrentPassword: Dispatch<SetStateAction<Password>>;
    setEdit: Dispatch<SetStateAction<boolean>>;
}

export default function PasswordDisplay({password, setCurrentPassword, setEdit} : PasswordDisplayProps) {
    const router = useRouter();
    
    const deletePassword = async () => {
        await fetch('http://localhost:3000/passwords', {
            method: 'put',
            body: JSON.stringify({ type: "delete", id: password.id, website: "", username: "", password: "" })
        });

        router.refresh();
    }

    const edit = () => {
        setCurrentPassword(password);
        setEdit(true);
    }

    return (
        <div className="w-full bg-white text-black rounded mb-4">
            <p>Website: <b>{password.website}</b></p>
            <p>Username: {password.username}</p>
            <p>Password: {password.password}</p>
            <button onClick={edit}>Edit</button>
            <button onClick={deletePassword}>Delete</button>
        </div>
    )
}