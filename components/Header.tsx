"use client"

import NewPassword from "./NewPassword";
import { Dispatch, SetStateAction, useState } from "react";
import SignOut from "./SignOut";
import Link from "next/link";

type HeaderProps = {
    vault: string;
    id: string;
    setDisplay: Dispatch<SetStateAction<string>>;
}

export default function Header({ vault, id, setDisplay } : HeaderProps) {
    var [popup, setPopup] = useState(false);

    return (
        <header className="flex justify-between mt-2 mb-4">
            <Link href="/new" className="bg-violet-600 text-white font-bold p-4 rounded">New Password</Link>
            <SignOut />
        </header>
    )
}