"use client";

import PasswordDisplay from "@/components/PasswordDisplay";
import PasswordEdit from "@/components/PasswordEdit";
import CryptoJS from "crypto-js";

import { SetStateAction, useState } from "react";

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
  var [search, setSearch] = useState("");

  function handleSearch(event: { target: { value: SetStateAction<string>; }; }) {
    setSearch(event.target.value)
  }

  console.log(search);

  const vaultKey = localStorage?.getItem("vaultKey") ?? "";

  if (vaultKey == "") {
    console.log("no key");
    return <>no key</>;
  }
  // Check if user hasn't submitted a password yet
  else if (data == "{}") {
    return <h1 className="text-left text-xl mt-5 font-bold">Add a new password to get started</h1>;
  }
  // Decrypt vault and return list of passwords
  const decrypted = CryptoJS.AES.decrypt(data, vaultKey).toString(
    CryptoJS.enc.Utf8
  );

  const map = new Map<string, JSON>(Object.entries(JSON.parse(decrypted)));
  
  var length = 0;
  var elements: any[] = [];
  map.forEach((value, key) => {
    length += 1;
    const values = new Map(Object.entries(value));
    const username = values.get("username");
    const password = values.get("password");
    if (key.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || username.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
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
    }
  });

  // Check if user has no passwords currently stored
  if (length === 0) {
    return <h1 className="text-left text-xl mt-5 font-bold">Add a new password to get started</h1>;
  }

  return (
    <div>
      {edit ? (
        <PasswordEdit info={info} vault={data} id={id} setEdit={setEdit} />
      ) : null}
      <input placeholder="Search" onChange={handleSearch} className="text-black mb-4 p-2 w-full rounded"></input>
      {elements}
    </div>
  );
}
