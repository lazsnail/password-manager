"use client"

import NewPassword from "./NewPassword";
import { Dispatch, SetStateAction, useState } from "react";
import SignOut from "./SignOut";
import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-between mt-2 mb-4">
            <Link href="/new" className="bg-violet-600 text-white font-bold p-4 rounded">New Password</Link>
            <SignOut />
        </header>
    )
}