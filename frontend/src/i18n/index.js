// Configuração do i18next para suporte multilíngue
// i18next configuration for multilingual support
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Traduções inline - CORRIGIDAS para serem consistentes
const resources = {
  pt: {
    translation: {
      'app.title': 'Poetry Creator',
      'app.subtitle': 'Crie poemas únicos com IA',
      'app.description':
        'Digite uma palavra-chave e deixe a IA criar um poema único para você',
      'form.title': 'Criador de Poemas',
      'form.keyword.label': 'Insira a palavra principal que deseja um poema',
      'form.keyword.placeholder': 'Digite uma palavra...',
      'form.keyword.helper': 'Digite uma palavra que inspire seu poema',
      'form.language.label': 'Informe o idioma que deseja o poema',
      'form.language.options.pt': 'Português',
      'form.language.options.en': 'English',
      'form.buttons.create': 'Criar Poema',
      'form.buttons.creating': 'Criando...',
      'form.buttons.return': 'Voltar',
      'messages.validation.required': 'Este campo é obrigatório',
      'messages.validation.minLength': 'Mínimo de {{count}} caracteres',
      'messages.validation.maxLength': 'Máximo de {{count}} caracteres',
      'accessibility.videoBackground': 'Vídeo de fundo decorativo',
      'accessibility.poemForm': 'Formulário para criar poemas com IA',
      'accessibility.mainContent': 'Conteúdo principal da aplicação',
      'display.title': 'Poema Criado',
      'display.newPoem': 'Criar Novo Poema',
      'display.backToForm': 'Voltar ao Formulário',
      'footer.attribution': '@luizfx.dev'
    }
  },
  en: {
    translation: {
      'app.title': 'Poetry Creator',
      'app.subtitle': 'Create unique poems with AI',
      'app.description':
        'Enter a keyword and let AI create a unique poem for you',
      'form.title': 'Poetry Creator',
      'form.keyword.label': 'Enter the main word for the poem',
      'form.keyword.placeholder': 'Type a word...',
      'form.keyword.helper': 'Enter a word to inspire your poem',
      'form.language.label': 'Select the language for your poem',
      'form.language.options.pt': 'Português',
      'form.language.options.en': 'English',
      'form.buttons.create': 'Create Poetry',
      'form.buttons.creating': 'Creating...',
      'form.buttons.return': 'Return',
      'messages.validation.required': 'This field is required',
      'messages.validation.minLength': 'Minimum {{count}} characters',
      'messages.validation.maxLength': 'Maximum {{count}} characters',
      'accessibility.videoBackground': 'Decorative background video',
      'accessibility.poemForm': 'Form to create poems with AI',
      'accessibility.mainContent': 'Main application content',
      'display.title': 'Poem Created',
      'display.newPoem': 'Create New Poem',
      'display.backToForm': 'Back to Form',
      'footer.attribution': '@luizfx.dev'
    }
  }
}

// INICIALIZAÇÃO SÍNCRONA - sem async/await
console.log('🔧 Inicializando i18n...')

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources, // Usar traduções inline diretamente
    lng: 'pt',
    fallbackLng: 'pt',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'poetry-creator-language',
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    },
    debug: import.meta.env.VITE_SHOW_DEBUG === 'true',
    react: {
      useSuspense: false // Importante: não usar Suspense
    },
    // Configurações para inicialização imediata
    initImmediate: false,
    load: 'languageOnly'
  })
  .then(() => {
    console.log('✅ i18n inicializado com sucesso')
    console.log('🌍 Idioma:', i18n.language)
    console.log('📦 Recursos:', Object.keys(i18n.services.resourceStore.data))
  })
  .catch((error) => {
    console.error('❌ Erro ao inicializar i18n:', error)
  })

export default i18n
