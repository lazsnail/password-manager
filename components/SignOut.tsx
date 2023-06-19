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

    return (<button onClick={handleSignOut} className="flex items-center bg-white text-black rounded p-4">Sign out</button>)
}