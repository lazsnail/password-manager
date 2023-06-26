"use client"

import NewPassword from "./NewPassword";
import { useState } from "react";
import SignOut from "./SignOut";
import NewPasswordButton from "./NewPasswordButton";


export default function Header() {
    var [popup, setPopup] = useState(false);

    return (
        <div className="flex justify-between mt-2 mb-2">
            {popup ? (
                <NewPassword setPopup={setPopup}/> 
            ) : null}
            <NewPasswordButton setPopup={setPopup}/>
            <SignOut />
        </div>
    )
}