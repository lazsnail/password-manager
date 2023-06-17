'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Database } from '../types/supabase'

export default function SignOut() {
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <div className="flex items-center">
          <button onClick={handleSignOut} className="mr-2">Sign out</button>
        </div>
      )
}