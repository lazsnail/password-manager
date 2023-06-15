'use client'

import { Dispatch, SetStateAction } from "react";

type PasswordDisplayProps = {
    password: Password;
    setCurrentPassword: Dispatch<SetStateAction<{
        created_at: string;
        id: string;
        password: string;
        user_id: string;
        username: string;
        website: string;
    }>>;
    setEdit: Dispatch<SetStateAction<boolean>>;
}

export default function PasswordDisplay({password, setCurrentPassword, setEdit} : PasswordDisplayProps) {
    function edit() {
        setCurrentPassword(password);
        setEdit(true);
    }

    return (
        <div className="w-full bg-white text-black rounded mb-4">
            <p>Website: <b>{password.website}</b></p>
            <p>Username: {password.username}</p>
            <p>Password: {password.password}</p>
            <button onClick={edit}>Edit</button>
        </div>
    )
}