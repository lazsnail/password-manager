"use client";

import { redirect, useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";
import CryptoJS from "crypto-js";
import { BiAddToQueue } from "react-icons/bi";
import { IconContext } from "react-icons";
import Link from "next/link";

type NewPasswordProps = {
  vault: string;
  id: string;
};

export default function NewPassword({ vault, id }: NewPasswordProps) {
  var [passwordInput, setPasswordInput] = useState("");

  const key = localStorage?.getItem("vaultKey") ?? "";
  if (key == "") {
    console.log("need vault key");
  }
  var decrypted = "";
  var passwords = JSON.parse("{}");

  if (vault !== "{}") {
    decrypted = CryptoJS.AES.decrypt(vault, key).toString(CryptoJS.enc.Utf8);
    passwords = JSON.parse(decrypted);
  }

  const router = useRouter();

  function generatePassword() {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
            'abcdefghijklmnopqrstuvwxyz0123456789@#$';
        
    for (let i = 1; i <= 16; i++) {
        var char = Math.floor(Math.random()
                    * str.length + 1);
            
        pass += str.charAt(char)
    }
        
    setPasswordInput(pass);
  }

  const addPassword = async (formData: FormData) => {
    const website = String(formData.get("website"));
    const username = String(formData.get("username"));
    const password = String(formData.get("password"));

    passwords[website] = { username: username, password: password };

    // Encrypt vault
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(passwords),
      key
    ).toString();

    await fetch(location.origin + "/passwords", {
      method: "put",
      body: JSON.stringify({ type: "update", vault: encrypted, id: id }),
    });

    router.refresh();
    redirect("/");
  };

  const form = () => (
    <form
      action={addPassword}
      className="w-screen max-w-[600px] p-3 bg-black text-white rounded flex flex-col"
    >
      <Link
        href="/"
        className="bg-transparent text-violet-400 rounded text-left mt-2 mb-4"
      >
        Close
      </Link>
      <b className="text-3xl mb-4 text-left">New Password</b>
      <div className="flex flex-col mb-4">
        <b className="w-28 text-left">Website</b>
        <input
          name="website"
          className="bg-violet-600 dark:text-white w-full mr-6 p-3 rounded"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <b className="w-28 text-left">Username</b>
        <input
          name="username"
          className="bg-violet-600 dark:text-white w-full mr-6 p-3 rounded"
          required
        />
      </div>
      <div className="flex flex-col mb-2">
        <b className="w-28 text-left">Password</b>
        <input
          name="password"
          value={passwordInput}
          onChange={(e) => {
            setPasswordInput(e.currentTarget.value);
          }}
          type="password"
          className="bg-violet-600 dark:text-white w-full mr-6 p-3 rounded"
          required
        />
      </div>
      <button
        type="button"
        onClick={generatePassword}
        className="flex items-center font-bold text-left mb-10 w-fit"
      >
        <IconContext.Provider
          value={{ color: "white", className: "global-class-name" }}
        >
          <BiAddToQueue />
        </IconContext.Provider>
        <b className="ml-1">Generate Password</b>
      </button>
      <div className="flex justify-between pr-5 pb-3">
        <button
          type="submit"
          className="bg-violet-600 text-white p-3 rounded font-bold"
        >
          Submit
        </button>
      </div>
    </form>
  );

  return <div>{form()}</div>;
}
