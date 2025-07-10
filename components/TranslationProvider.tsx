"use client"

import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import '../lib/i18n' // Import and initialize i18n

interface TranslationProviderProps {
  children: ReactNode
}

export default function TranslationProvider({ children }: TranslationProviderProps) {
  const { i18n } = useTranslation();
  
  // Update the HTML lang attribute when language changes
  useEffect(() => {
    if (document && document.documentElement) {
      document.documentElement.lang = i18n.language || 'ja';
    }
  }, [i18n.language])

  return <>{children}</>
}
