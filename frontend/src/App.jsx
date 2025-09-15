// Componente principal da aplicação Poetry Creator
// Main component of Poetry Creator application
import React, { useEffect, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import Home from './pages/Home'
import './i18n/index.js' // Importar configurações do i18n
import './styles/tailwind.css' // Importar estilos Tailwind

// Componente de Loading
const AppLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
      <p className="text-white text-xl font-lato">
        🎭 Carregando Poetry Creator...
      </p>
    </div>
  </div>
)

// Componente principal protegido
const AppContent = () => {
  const { i18n, t, ready } = useTranslation()

  // Log de estado do i18n para debug
  useEffect(() => {
    console.log('🔍 i18n Debug:', {
      ready,
      isInitialized: i18n?.isInitialized,
      language: i18n?.language,
      hasResources: i18n?.hasResourceBundle?.(i18n.language, 'translation')
    })
  }, [i18n, ready])

  useEffect(() => {
    // Só executar quando i18n estiver pronto E inicializado
    if (!ready || !i18n || !i18n.isInitialized) {
      console.log('⏳ Aguardando i18n inicializar...', {
        ready,
        initialized: i18n?.isInitialized
      })
      return
    }

    console.log('✅ i18n pronto, configurando aplicação...')

    // Log de inicialização da aplicação - Application initialization log
    console.log('🎭 Poetry Creator - Aplicação iniciada')
    console.log('🌍 Idioma atual:', i18n.language)
    console.log('🚀 Modo de desenvolvimento:', import.meta.env.DEV)

    // Configurar título da página dinamicamente - Configure page title dynamically
    const updateTitle = () => {
      try {
        const title = t('app.title', 'Poetry Creator')
        const subtitle = t('app.subtitle', 'Gerador de Poesias')
        if (
          title &&
          subtitle &&
          title !== 'app.title' &&
          subtitle !== 'app.subtitle'
        ) {
          document.title = `${title} - ${subtitle}`
        } else {
          document.title = '🎭 Poetry Creator - Gerador de Poesias'
        }
        console.log('📝 Título atualizado:', document.title)
      } catch (error) {
        console.warn('⚠️ Erro ao atualizar título:', error)
        document.title = '🎭 Poetry Creator'
      }
    }

    // Configurar meta description - Configure meta description
    const updateMetaDescription = () => {
      try {
        const description = t(
          'app.description',
          'Gerador de poemas com inteligência artificial'
        )
        const metaDescription = document.querySelector(
          'meta[name="description"]'
        )

        if (
          metaDescription &&
          description &&
          description !== 'app.description'
        ) {
          metaDescription.setAttribute('content', description)
          console.log('📄 Meta description atualizada:', description)
        }
      } catch (error) {
        console.warn('⚠️ Erro ao atualizar meta description:', error)
      }
    }

    // Atualizar título e descrição inicialmente
    updateTitle()
    updateMetaDescription()

    // Listener para mudança de idioma
    const handleLanguageChange = (lng) => {
      console.log('🌍 Idioma alterado para:', lng)
      updateTitle()
      updateMetaDescription()
    }

    // Verificar se i18n tem o método 'on' antes de usar
    if (typeof i18n.on === 'function') {
      i18n.on('languageChanged', handleLanguageChange)
    } else {
      console.warn('⚠️ i18n.on não está disponível')
    }

    // Cleanup - Limpeza
    return () => {
      if (typeof i18n.off === 'function') {
        i18n.off('languageChanged', handleLanguageChange)
      }
    }
  }, [i18n, t, ready])

  // Log de renderização para debug - Render log for debug
  if (import.meta.env.VITE_SHOW_DEBUG === 'true') {
    console.log('🔄 AppContent renderizando...', {
      ready,
      initialized: i18n?.isInitialized
    })
  }

  // Se i18n não estiver pronto, mostrar loading
  if (!ready) {
    console.log('⏳ Mostrando loading - i18n não pronto')
    return <AppLoading />
  }

  console.log('🎯 Renderizando conteúdo principal')

  return (
    <div className="App">
      {/* Configurações de acessibilidade - Accessibility settings */}
      <div className="sr-only">
        <h1>{t('app.title', '🎭 Poetry Creator')}</h1>
        <p>{t('app.description', 'Gerador de poemas com IA')}</p>
      </div>

      {/* Página principal - Main page */}
      <main
        role="main"
        aria-label={t('accessibility.mainContent', 'Conteúdo principal')}
      >
        <Home />
      </main>
    </div>
  )
}

// Componente principal com Suspense e Error Boundary
function App() {
  console.log('🚀 App principal renderizando...')

  return (
    <div className="app-wrapper">
      <Suspense fallback={<AppLoading />}>
        <AppContent />
      </Suspense>
    </div>
  )
}

export default App
