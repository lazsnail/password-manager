'use client'

import { Dispatch, SetStateAction } from "react";

type PasswordDisplayProps = {
    password: Password;
    setCurrentPassword: Dispatch<SetStateAction<Password>>;
    setEdit: Dispatch<SetStateAction<boolean>>;
}

export default function PasswordDisplay({password, setCurrentPassword, setEdit} : PasswordDisplayProps) {
    const edit = () => {
        setCurrentPassword(password);
        setEdit(true);
    }

    return (
        <div onClick={edit} className="w-full bg-white text-black rounded mb-4 pt-2 pb-2 pl-3 pr-3 flex justify-between items-center hover:bg-slate-100 cursor-pointer">
            <div className="text-left">
                <b className="text-lg">{password.website}</b>
                <p>{password.username}</p>
            </div>
        </div>
    )
}