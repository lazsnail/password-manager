import { IoIosLock } from 'react-icons/io'
import { AiOutlineUser } from 'react-icons/ai'

export default function Sidebar() {
    return (
        <div className="h-screen w-14 bg-green-100 outline-2 text-black flex items-center flex-col">
            <div className="mt-10 h-12 w-full flex justify-center items-center cursor-pointer hover:bg-green-200">
                <IoIosLock size="1.5em"/>
            </div>
            <div className="h-12 w-full flex justify-center items-center cursor-pointer hover:bg-green-200">
                <AiOutlineUser size="1.5em"/>
            </div>
        </div>
    )
}