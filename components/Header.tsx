"use client"

import NewPassword from "./NewPassword";
import { useState } from "react";
import SignOut from "./SignOut";


export default function Header() {
    var [popup, setPopup] = useState(false);

    return (
        <header className="flex justify-between mt-2 mb-2">
            {popup ? <NewPassword setPopup={setPopup}/> : null}
            <button onClick={() => setPopup(true)} className="bg-white text-black p-4 rounded">New Password</button>
            <SignOut />
        </header>
    )
}