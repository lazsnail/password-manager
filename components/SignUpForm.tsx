"use client";

import { Database } from "@/types/supabase";
import { Tooltip } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { pbkdf2Sync } from "crypto";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignUp = async () => {
    var derived_password = pbkdf2Sync(
      password,
      email.toLocaleLowerCase(),
      5000,
      32,
      "sha512"
    ).toString();

    const { error } = await supabase.auth.signUp({
      email: email.toLocaleLowerCase(),
      password: derived_password,
      options: {
        emailRedirectTo: location.origin + "/",
      },
    });
    if (error) {
      redirect("/error");
    }
    setSignedUp(true);
    router.refresh();
  };

  return signedUp ? (
    <div className="text-center">
      Please verify the email sent to <b className="font-lg">{email}</b>
    </div>
  ) : (
    <form
      action={handleSignUp}
      className="w-80 flex flex-col items-center p-10 bg-violet-600 text-white rounded"
    >
      <h1 className="w-70 text-3xl mt-3 mb-6 font-bold underline text-center">
        Create New Account
      </h1>
      <h2 className="w-80 ml-28 text-left">Email</h2>
      <input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="text-black w-52 text-left ml-auto mr-auto mb-5 p-2 border-black border-2"
        required
      />

      <div className="flex w-80 ml-28 text-left">
        <h2 className="mr-2">Password</h2>
        <Link
          href="/faq"
          className="mb-1 mt-1 w-fit text-left flex items-center"
        >
          <Tooltip
            content={"Password Manager FAQ"}
            rounded
            color="invert"
            className="text-center"
          >
            <BsFillInfoCircleFill />
          </Tooltip>
        </Link>
      </div>
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="text-black w-52 text-left ml-auto mr-auto mb-5 p-2 border-black border-2"
        required
      />
      <button
        type="submit"
        className="bg-black text-white pt-3 pb-3 rounded ml-auto mr-auto mb-5 w-20"
      >
        Sign Up
      </button>
      <Link href="/login" className="text-center">
        Already have an account?
        <br />
        <b>Sign In</b>
      </Link>
    </form>
  );
}
