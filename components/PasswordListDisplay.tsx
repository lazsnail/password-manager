"use client";

import PasswordDisplay from "@/components/PasswordDisplay";
import PasswordEdit from "@/components/PasswordEdit";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type PasswordListDisplayProps = {
  data: string;
  id: string;
};

export default function PasswordListDisplay({
  data, id
}: PasswordListDisplayProps) {
  var [edit, setEdit] = useState(false);
  var [info, setInfo] = useState({
    website: "",
    username: "",
    password: "",
  });

  const vaultKey = localStorage.getItem('vaultKey') ?? "";

  if (vaultKey == "") {
    console.log("no key");
    return (<>no key</>)
  }
  else {
    const decrypted = CryptoJS.AES.decrypt(data, vaultKey).toString(CryptoJS.enc.Utf8);

    console.log(decrypted);

    const map = new Map<string, JSON>(Object.entries(JSON.parse(decrypted)));

    var elements:any[] = [];
    map.forEach((value, key) => {
      const values = new Map(Object.entries(value));
      const username = values.get("username");
      const password = values.get("password");
      elements.push(
        <PasswordDisplay key={key} website={key} username={username} password={password} setEdit={setEdit} setInfo={setInfo}/>
      )
    })

    return (
      <div>
        {edit ? (
          <PasswordEdit info={info} vault={data} id={id} setEdit={setEdit} />
        ) : null}
        {elements}
      </div>      
    );


    /*
    var [currentPassword, setCurrentPassword] = useState<Password>(passwords[0]);

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
