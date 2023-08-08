"use client";

import PasswordDisplay from "@/components/PasswordDisplay";
import CryptoJS from "crypto-js";
import { Dispatch, SetStateAction, useState } from "react";
import NoPassword from "./NoPassword";
import { redirect } from "next/navigation";

type PasswordListDisplayProps = {
  data: string;
  setInfo: Dispatch<
    SetStateAction<{
      website: string;
      username: string;
      password: string;
    }>
  >;
  setDisplay: Dispatch<SetStateAction<string>>;
};

export default function PasswordListDisplay({
  data,
  setInfo,
  setDisplay,
}: PasswordListDisplayProps) {
  var [search, setSearch] = useState("");

  function handleSearch(event: { target: { value: SetStateAction<string> } }) {
    setSearch(event.target.value);
  }

  const vaultKey = localStorage?.getItem("vaultKey") ?? redirect("/error");

  if (vaultKey == "") {
    console.log("no key");
    return <>no key</>;
  }
  // Check if user hasn't submitted a password yet
  else if (data == "{}") {
    return <NoPassword />;
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
    if (
      key.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      username.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    ) {
      elements.push(
        <PasswordDisplay
          key={key}
          website={key}
          username={username}
          password={password}
          setDisplay={setDisplay}
          setInfo={setInfo}
        />
      );
    }
  });

  // Check if user has no passwords currently stored
  if (length === 0) {
    return <NoPassword />;
  }

  return (
    <div>
      <input
        placeholder="Search"
        onChange={handleSearch}
        className="text-black mb-4 p-2 w-full rounded"
      ></input>
      {elements}
    </div>
  );
}
