'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Database } from '../types/supabase'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [displayType, setDisplayType] = useState("signIn");

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    if (error) {
      console.log(error);
    }
    router.refresh()
  }

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error !== null) {
      setLoginError(true);
    }
    router.refresh()
  }

  return (
      <div className="mt-24 botom-0 z-10">
        {displayType === "signIn" ? 
        <div className="w-fit flex flex-col justify-center items-center text-center p-10 bg-white text-black rounded">
          <h1 className="text-2xl mb-6 font-bold">Log In</h1>
          <h2>Email</h2>
          <input name="email" onChange={(e) => setEmail(e.target.value)} value={email} className="bg-black text-white w-52 text-center ml-auto mr-auto mb-5 p-1"/>
          <h2>Password</h2>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="bg-black text-white w-52 text-center ml-auto mr-auto mb-7 p-1"
          />
          {loginError ? <h3 className="text-red-600 mb-5 loginErrorMessage">Incorrect email or password</h3> : null }

          <button onClick={handleSignIn} className="bg-black text-white p-3 rounded ml-auto mr-auto mb-5 w-24">Sign In</button>
          <button onClick={() => setDisplayType("signUp")} className="w-[260px]">Don't have an account? Sign Up</button>
        </div> : displayType === "signUp" ?
        <div className="w-fit flex flex-col justify-center items-center text-center p-10 bg-white text-black rounded">
          <h1 className="text-2xl mb-6 font-bold">Create New Account</h1>
          <h2>Email</h2>
          <input name="email" onChange={(e) => setEmail(e.target.value)} value={email} className="bg-black text-white w-52 text-center ml-auto mr-auto mb-5 p-1"/>
          <h2>Password</h2>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="bg-black text-white w-52 text-center ml-auto mr-auto mb-7 p-1"
          />

          <button onClick={handleSignUp} className="bg-black text-white p-3 rounded ml-auto mr-auto mb-5 w-24">Sign Up</button>
          <button onClick={() => setDisplayType("signIn")} className="w-[260px]">Already have an account? Sign In</button>
        </div> : null}
      </div>
  )
}