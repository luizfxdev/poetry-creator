import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PoetryForm from '../components/PoetryForm'
import PoetryDisplay from '../components/PoetryDisplay'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { poetryApi } from '../services/api'
import backgroundVideo from '../assets/background.mp4'

const Home = () => {
  const { t } = useTranslation()
  const [currentView, setCurrentView] = useState('form')
  const [poemData, setPoemData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCreatePoem = async (formData) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log('🎭 Enviando dados para API:', formData)

      // Usar a API correta com os parâmetros corretos
      const poemData = await poetryApi.generatePoem(
        formData.keyword,
        formData.language // 'pt' ou 'en'
      )

      console.log('✅ Poema recebido:', poemData)
      setPoemData(poemData)
      setCurrentView('display')
    } catch (error) {
      console.error('❌ Erro ao criar poema:', error)
      setError(error.message || 'Erro inesperado ao gerar poema')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewPoem = () => {
    setCurrentView('form')
    setPoemData(null)
    setError(null)
  }

  const handleReturn = () => {
    setCurrentView('form')
    setPoemData(null)
    setError(null)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Vídeo de fundo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-label={t('accessibility.videoBackground')}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* Seletor de idioma */}
      <LanguageSwitcher />

      {/* Container principal */}
      <div className="relative z-10 min-h-screen flex pb-16">
        <div className="flex-1 flex items-center justify-start pl-8 md:pl-16 lg:pl-24 pr-8">
          <div className="w-full max-w-md">
            {/* Mostrar erro se houver */}
            {error && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg animate-shake">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {currentView === 'form' && (
              <PoetryForm
                onSubmit={handleCreatePoem}
                onReturn={handleReturn}
                loading={isLoading}
              />
            )}
            {currentView === 'display' && poemData && (
              <PoetryDisplay
                poemData={poemData}
                onNewPoem={handleNewPoem}
                onReturn={handleReturn}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-sm py-3">
        <div className="text-center">
          <p className="text-white/70 text-sm font-lato">
            Developed by @luizfx.dev
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
