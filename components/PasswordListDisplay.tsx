"use client";

import PasswordDisplay from "@/components/PasswordDisplay";
import PasswordEdit from "@/components/PasswordEdit";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type PasswordListDisplayProps = {
  data: string;
};

export default function PasswordListDisplay({
  data,
}: PasswordListDisplayProps) {

  const vaultKey = localStorage.getItem('vaultKey') ?? "";

  if (vaultKey == "") {
    console.log("no key");
    return (<>no key</>)
  }
  else {
    const decrypted = CryptoJS.AES.decrypt(data, vaultKey).toString(CryptoJS.enc.Utf8);

    const map = new Map(Object.entries(JSON.parse(decrypted)));

    var elements:any[] = [];
    map.forEach((values, keys) => {
      elements.push(<div className="bg-white text-black mb-5 max-w-md text-center" key={keys}>{keys}</div>)
    })

    return elements;


    /*
    var [currentPassword, setCurrentPassword] = useState<Password>(passwords[0]);
    var [edit, setEdit] = useState(false);
    const length = passwords.length;
    console.log(length);

    return (
      <div>
        {edit ? (
          <PasswordEdit password={currentPassword} setEdit={setEdit} />
        ) : null}
        {passwords?.map((password) => (
          <PasswordDisplay
            key={password.id}
            password={password}
            setCurrentPassword={setCurrentPassword}
            setEdit={setEdit}
          />
        ))}
        {length === 0 ? (
          <div className="w-full h-96 flex justify-center items-center">
          <h1>Add your first password</h1>
          </div> 
        ) : null}
      </div>
    );
    */
  }
}
