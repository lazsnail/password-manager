'use client'

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineDelete } from "react-icons/ai"

type PasswordDisplayProps = {
    website: string,
    username: string,
    password: string,
    setDisplay: Dispatch<SetStateAction<string>>;
    setInfo: Dispatch<SetStateAction<{
        website: string;
        username: string;
        password: string;
    }>>
}

export default function PasswordDisplay({website, username, password, setDisplay, setInfo} : PasswordDisplayProps) {
    const router = useRouter();

    const edit = () => {
        //setCurrentPassword(password);
        setInfo({website: website, username: username, password: password});
        setDisplay("edit");
    }

    return (
        <div onClick={edit} className="w-full bg-violet-600 text-white rounded mb-4 pt-2 pb-2 pl-3 pr-3 flex justify-between items-center hover:bg-slate-100 hover:text-violet-600 cursor-pointer transition-all">
            <div className="text-left">
                <b className="text-lg">{website}</b>
                <p>{username}</p>
            </div>
        </div>
    )
}