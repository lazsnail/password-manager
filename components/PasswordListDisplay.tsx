"use client";

import PasswordDisplay from "@/components/PasswordDisplay";
import PasswordEdit from "@/components/PasswordEdit";
import CryptoJS from "crypto-js";

import { useState } from "react";

type PasswordListDisplayProps = {
  data: string;
  id: string;
};

export default function PasswordListDisplay({
  data,
  id,
}: PasswordListDisplayProps) {
  var [edit, setEdit] = useState(false);
  var [info, setInfo] = useState({
    website: "",
    username: "",
    password: "",
  });

  const vaultKey = localStorage?.getItem("vaultKey") ?? "";

  if (vaultKey == "") {
    console.log("no key");
    return <>no key</>;
  }
  // Check if user hasn't submitted a password yet
  else if (data == "{}") {
    return <h1 className="text-left text-lg mt-12">Add your first password</h1>;
  }
  // Decrypt vault and return list of passwords
  const decrypted = CryptoJS.AES.decrypt(data, vaultKey).toString(
    CryptoJS.enc.Utf8
  );

  const map = new Map<string, JSON>(Object.entries(JSON.parse(decrypted)));

  var elements: any[] = [];
  map.forEach((value, key) => {
    const values = new Map(Object.entries(value));
    const username = values.get("username");
    const password = values.get("password");
    elements.push(
      <PasswordDisplay
        key={key}
        website={key}
        username={username}
        password={password}
        setEdit={setEdit}
        setInfo={setInfo}
      />
    );
  });

  return (
    <div>
      {edit ? (
        <PasswordEdit info={info} vault={data} id={id} setEdit={setEdit} />
      ) : null}
      {elements}
    </div>
  );
}
