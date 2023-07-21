"use client";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import CryptoJS from "crypto-js";

type PasswordEditProps = {
  info: {
    website: string;
    username: string;
    password: string;
  };
  vault: string;
  id: string;
  setEdit: Dispatch<SetStateAction<boolean>>;
};

export default function PasswordEdit({
  info,
  vault,
  id,
  setEdit,
}: PasswordEditProps) {
  const website = info["website"];
  const username = info["username"];
  const password = info["password"];

  const key = localStorage.getItem("vaultKey") ?? "";
  if (key == "") {
    console.log("need vault key");
  }

  var decrypted = "";
  if (vault !== "{}") {
    decrypted = CryptoJS.AES.decrypt(vault, key).toString(CryptoJS.enc.Utf8);
  }

  var passwords = JSON.parse(decrypted);

  const router = useRouter();

  const deletePassword = async () => {
    delete passwords[website];

    console.log(passwords);

    // Encrypt vault
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(passwords),
      key
    ).toString();

    await fetch("http://localhost:3000/passwords", {
      method: "put",
      body: JSON.stringify({ type: "update", vault: encrypted, id: id }),
    });

    setEdit(false);
    router.refresh();
  };

  const updatePassword = async (formData: FormData) => {
    const newWebsite = String(formData.get("website"));
    const newUsername = String(formData.get("username"));
    const newPassword = String(formData.get("password"));

    if (website !== newWebsite) {
      console.log("here");
      delete passwords[website];
    }

    passwords[newWebsite] = { username: newUsername, password: newPassword };

    // Encrypt vault
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(passwords),
      key
    ).toString();

    await fetch("http://localhost:3000/passwords", {
      method: "put",
      body: JSON.stringify({ type: "update", vault: encrypted, id: id }),
    });

    setEdit(false);
    router.refresh();
  };

  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-slate-500/[.4] flex justify-center items-center">
      <div
        onClick={() => setEdit(false)}
        className="fixed left-0 w-screen h-screen"
      ></div>
      <form
        action={updatePassword}
        className="fixed bg-white w-1/3 min-w-[375px] text-black text-center rounded flex flex-col"
      >
        <b className="text-3xl pt-10 pb-10 mb-10 bg-gray-100">Edit Password</b>
        <div className="flex flex-col mb-4">
          <b className="w-28 ml-6 text-left">Website</b>
          <input
            name="website"
            type="text"
            defaultValue={website}
            className="text-black mr-6 ml-6 pl-2 rounded border-black border-2"
          ></input>
        </div>
        <div className="flex flex-col mb-4">
          <b className="w-28 ml-6 text-left">Username</b>
          <input
            name="username"
            type="text"
            defaultValue={username}
            className="text-black mr-6 ml-6 pl-2 rounded border-black border-2"
          ></input>
        </div>
        <div className="flex flex-col mb-10">
          <b className="w-28 ml-6 text-left">Password</b>
          <input
            name="password"
            type="password"
            defaultValue={password}
            className="text-black mr-6 ml-6 pl-2 rounded border-black border-2"
          ></input>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(password)}
            className="font-bold mt-1 ml-6 border-black border-2 rounded w-12"
          >
            Copy
          </button>
        </div>
        <button
          type="submit"
          className="mb-10 bg-gray-200 p-3 rounded w-20 mr-auto ml-auto"
        >
          Submit
        </button>
        <div className="flex justify-between pl-5 pr-5 pb-3">
          <button onClick={deletePassword} className="bg-gray-200 p-3 rounded">
            Delete
          </button>
          <button
            onClick={() => setEdit(false)}
            className="bg-gray-200 p-3 rounded"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
