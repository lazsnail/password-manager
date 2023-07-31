"use client"

import { useState } from "react";
import Header from "./Header"
import PasswordListDisplay from "./PasswordListDisplay"
import NewPassword from "./NewPassword";
import PasswordEdit from "./PasswordEdit";

type MainScreenProps = {
    vault: string;
    id: string;
}

export default function MainScreen({vault, id} : MainScreenProps) {
    var [display, setDisplay] = useState("main");
    var [info, setInfo] = useState({
        website: "",
        username: "",
        password: "",
      });

    return (
        display === "main" ? 
        <div className="w-screen max-w-[600px] p-3">
            <h1 className="text-3xl mb-2 font-bold">Passwords</h1>
            <Header vault={vault} id={id} setDisplay={setDisplay}/>
            <PasswordListDisplay data={vault} id={id} setInfo={setInfo} setDisplay={setDisplay}/>
        </div>
        : display === "edit" ?
        <PasswordEdit info={info} vault={vault} id={id} setDisplay={setDisplay} />
        : display === "new" ?
        <NewPassword vault={vault} id={id} setDisplay={setDisplay}/>
        : null
    )
}