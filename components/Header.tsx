import { Dispatch, SetStateAction } from "react"

import NewButton from "./NewButton"

type HeaderProps = {
    set_title: Dispatch<SetStateAction<string>>;
    set_email: Dispatch<SetStateAction<string>>
    set_popup : Dispatch<SetStateAction<boolean>>;
}

export default function Header({set_title, set_email, set_popup} : HeaderProps) {
    return(
        <header className="mt-8">
            <NewButton set_title={set_title} set_email={set_email} set_popup={set_popup}/>
        </header>
    )
}