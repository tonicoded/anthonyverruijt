'use client'

import { useState } from 'react'

export function ProfileImage() {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-stone-100 dark:bg-stone-800 hover:scale-105 transition-transform duration-500">
      {!imageError ? (
        <img
          src="/foto.jpg"
          alt="Anthony Verruijt"
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-4xl font-bold text-stone-600 dark:text-stone-300">
            AV
          </div>
        </div>
      )}
    </div>
  )
}