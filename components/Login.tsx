"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Database } from "../types/supabase";
import { pbkdf2Sync } from "crypto";
import { handleClientScriptLoad } from "next/script";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [displayType, setDisplayType] = useState("signIn");
  const [signedUp, setSignedUp] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignUp = async () => {
    console.log(location.origin);

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
        emailRedirectTo: location.origin + '/',
      },
    });
    if (error) {
      console.log(error);
    }
    setSignedUp(true);
    router.refresh();
  };

  const handleSignIn = async () => {
    var derived_password = pbkdf2Sync(
      password,
      email.toLocaleLowerCase(),
      5000,
      32,
      "sha512"
    ).toString();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLocaleLowerCase(),
      password: derived_password,
    });
    if (error !== null) {
      setLoginError(true);
    }

    localStorage.setItem("vaultKey", derived_password);

    router.refresh();
  };

  return (
    <>
      {signedUp ? (
        <div className="text-center">
          Please verify the email sent to <b>{email}</b>
        </div>
      ) : displayType === "signIn" ? (
        <form action={handleSignIn} className="w-80 flex flex-col items-center p-10 bg-violet-600 text-white rounded">
          <h1 className="w-80 text-center text-2xl mb-6 font-bold underline">Log In</h1>
          <h2 className="w-80 ml-28 text-left">Email</h2>
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="text-black w-52 text-left ml-auto mr-auto mb-5 p-2 border-black border-2"
            required
          />
          <h2 className="w-80 ml-28 text-left">Password</h2>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="text-black w-52 text-left ml-auto mr-auto mb-5 p-2 border-black border-2"
            required
          />
          {loginError ? (
            <h3 className="text-red-600 mb-5 loginErrorMessage">
              Incorrect email or password
            </h3>
          ) : null}

          <button
            type="submit"
            className="bg-black text-white pt-3 pb-3 rounded ml-auto mr-auto mb-5 w-20"
          >
            Sign In
          </button>
          <button onClick={() => setDisplayType("signUp")}>
            Don&apos;t have an account?
            <br />
            <b>Sign Up</b>
          </button>
        </form>
      ) : displayType === "signUp" ? (
        <form action={handleSignUp} className="w-80 flex flex-col justify-center items-center text-center p-10 bg-violet-600 text-white rounded">
          <h1 className="w-80 text-2xl mb-6 font-bold underline">Create New Account</h1>
          <h2 className="w-80 ml-28 text-left">Email</h2>
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="text-black w-52 text-left ml-auto mr-auto mb-5 p-2 border-black border-2"
            required
          />
          <h2 className="w-80 ml-28 text-left">Password</h2>
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
          <button onClick={() => setDisplayType("signIn")}>
            Already have an account?
            <br />
            <b>Sign In</b>
          </button>
        </form>
      ) : null}
    </>
  );
}
