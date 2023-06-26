import { Dispatch, SetStateAction } from "react"

export default function Header({ setPopup } : { setPopup: Dispatch<SetStateAction<boolean>> }) {
    const edit = () => {
        setPopup(true)
    }

    return (
        <div onClick={edit} className="bg-white text-black p-4 rounded">New Password</div>
    )
}
