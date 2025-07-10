"use client"

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('ja');
  const [mounted, setMounted] = useState(false);
  
  // Initialize language on client-side
  useEffect(() => {
    setCurrentLanguage(i18n.language || 'ja');
    setMounted(true);
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'ja' ? 'en' : 'ja';
    i18n.changeLanguage(newLang);
    setCurrentLanguage(newLang);
  };

  return (
    <div className="flex flex-col">
      <div className="text-sm text-gray-500 mb-1 font-medium">
        {mounted ? t('language') : 'Language'}: 
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={() => i18n.changeLanguage('ja')}
          className={`flex items-center px-3 py-1.5 rounded-md transition-colors ${currentLanguage === 'ja' ? 'bg-primary-100 text-primary-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
          aria-label="Switch to Japanese"
        >
          <span className="text-sm">🇯🇵 日本語</span>
        </button>
        <button 
          onClick={() => i18n.changeLanguage('en')}
          className={`flex items-center px-3 py-1.5 rounded-md transition-colors ${currentLanguage === 'en' ? 'bg-primary-100 text-primary-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
          aria-label="Switch to English"
        >
          <span className="text-sm">🇺🇸 English</span>
        </button>
      </div>
    </div>
  );
}
