'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Database } from '../types/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  var [loginError, setLoginError] = useState(false);
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className="w-fit flex flex-col justify-center items-center text-center p-10 bg-white text-black rounded">
      <h1 className="text-2xl mb-6 font-bold">Log In</h1>
      <h2>Email</h2>
      <input name="email" onChange={(e) => setEmail(e.target.value)} value={email} className="text-black w-52 text-center ml-auto mr-auto mb-5 border-black border-2"/>
      <h2>Password</h2>
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="text-black w-52 text-center ml-auto mr-auto mb-5 border-black border-2"
      />
      {loginError ? <h3 className="text-red-600 mb-5 loginErrorMessage">Incorrect email or password</h3> : null }

      <button onClick={handleSignIn} className="bg-black text-white p-3 rounded ml-auto mr-auto w-20">Sign In</button>
    </div>
  )
}