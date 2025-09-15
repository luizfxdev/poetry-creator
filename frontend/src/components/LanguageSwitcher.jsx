// Componente para alternância de idiomas - Language switcher component
import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  // Apenas Português e Inglês
  const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0]

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode)
    console.log(`🌍 Idioma alterado para: ${languageCode}`)
  }

  return (
    <div className="absolute top-6 right-6 z-20">
      <div className="relative group">
        {/* Botão principal do idioma - Main language button */}
        <button className="glass-container px-4 py-3 flex items-center space-x-3 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-golden">
          <span className="text-xl">{currentLanguage.flag}</span>
          <span className="text-white text-sm font-medium font-lato tracking-wide">
            {currentLanguage.code.toUpperCase()}
          </span>
          <svg
            className="w-4 h-4 text-poetry-golden-400 transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown de idiomas - Language dropdown */}
        <div className="absolute top-full right-0 mt-3 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="glass-container py-2 shadow-golden border border-poetry-golden-400/30">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-all duration-200 hover:bg-gradient-to-r hover:from-poetry-golden-500/20 hover:to-poetry-golden-600/20 ${
                  i18n.language === language.code
                    ? 'bg-gradient-to-r from-poetry-golden-500/30 to-poetry-golden-600/30 border-l-2 border-l-poetry-golden-400'
                    : 'hover:translate-x-1'
                }`}
              >
                <span className="text-xl drop-shadow-sm">{language.flag}</span>
                <div className="flex flex-col flex-grow">
                  <span className="text-white text-sm font-medium font-lato">
                    {language.name}
                  </span>
                  <span className="text-poetry-golden-200 text-xs font-lato tracking-wider">
                    {language.code.toUpperCase()}
                  </span>
                </div>
                {i18n.language === language.code && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-poetry-golden-400 rounded-full animate-pulse"></div>
                    <svg
                      className="w-4 h-4 text-poetry-golden-400 animate-fade-in"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguageSwitcher
