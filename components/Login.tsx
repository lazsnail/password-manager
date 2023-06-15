'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Database } from '../types/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className="flex items-center">
      <input name="email" onChange={(e) => setEmail(e.target.value)} value={email} className="text-black w-40 mr-2"/>
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="text-black w-40 mr-2"
      />
      <button onClick={handleSignUp} className="mr-2">Sign up</button>
      <button onClick={handleSignIn} className="mr-2">Sign in</button>
      <button onClick={handleSignOut} className="mr-2">Sign out</button>
    </div>
  )
}