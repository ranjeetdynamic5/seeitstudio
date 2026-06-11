'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/cartStore'

export default function LogoutButton() {
  const supabase = createClient()
  const router = useRouter()
  const clearCart = useCartStore((s) => s.clearCart)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    clearCart()
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
    >
      Logout
    </button>
  )
}