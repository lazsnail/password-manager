"use client"

import NewPassword from "./NewPassword";
import { useState } from "react";


export default function Header() {
    var [popup, setPopup] = useState(false);

    return (
        <header className="mt-8">
            {popup ? <NewPassword setPopup={setPopup}/> : null}
            <button onClick={() => setPopup(true)}>New Password</button>
        </header>
    )
}