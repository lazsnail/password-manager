"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Database } from "../types/supabase";
import { pbkdf2Sync } from "crypto";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async () => {
    // Generate vault key -> H(email | password)
    var vault_key = pbkdf2Sync(
      password,
      email.toLocaleLowerCase(),
      5000,
      32,
      "sha512"
    ).toString();

    // Generate auth -> H(vault key | password)
    var auth = pbkdf2Sync(
      vault_key,
      password,
      5000,
      32,
      "sha512"
    ).toString();

    const { error } = await supabase.auth.signInWithPassword({
      email: email.toLocaleLowerCase(),
      password: auth,
    });
    if (error !== null) {
      setLoginError(true);
    }

    localStorage.setItem("vaultKey", vault_key);

    router.refresh();
  };

  return (
    <form
      action={handleSignIn}
      className="w-80 flex flex-col items-center p-10 bg-violet-600 text-white rounded"
    >
      <h1 className="w-80 text-center text-3xl mb-6 font-bold underline">
        Log In
      </h1>
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
        <h3 className="text-red-700 font-bold mb-5 loginErrorMessage">
          Incorrect email or password
        </h3>
      ) : null}

      <button
        type="submit"
        className="bg-black text-white pt-3 pb-3 rounded ml-auto mr-auto mb-5 w-20"
      >
        Sign In
      </button>
      <Link href="/signup" className="text-center">
        Don&apos;t have an account?
        <br />
        <b>Sign Up</b>
      </Link>
    </form>
  );
}
