// Serviço de comunicação com a API do backend
// Backend API communication service
import axios from 'axios'

// Configuração base do Axios - Axios base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001', // ✅ CORRIGIDO: 3001 ao invés de 3333
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// Log da URL da API para debug
console.log(
  '🔗 API Base URL:',
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001' // ✅ CORRIGIDO: 3001 ao invés de 3333
)
console.log('🔧 DEBUG API Configuration:')
console.log('📍 VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL)
console.log('📍 Final baseURL:', api.defaults.baseURL)

// Interceptor para requisições - Request interceptor
api.interceptors.request.use(
  (config) => {
    // Log da requisição para debug - Request logging for debug
    if (import.meta.env.VITE_SHOW_DEBUG === 'true') {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        fullURL: `${config.baseURL}${config.url}`,
        data: config.data,
        timestamp: new Date().toISOString()
      })
    }
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Interceptor para respostas - Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log da resposta para debug - Response logging for debug
    if (import.meta.env.VITE_SHOW_DEBUG === 'true') {
      console.log('✅ API Response:', {
        status: response.status,
        data: response.data,
        timestamp: new Date().toISOString()
      })
    }
    return response
  },
  (error) => {
    // Log de erro para debug - Error logging for debug
    console.error('❌ API Error:', {
      status: error.response?.status,
      message: error.response?.data?.error || error.message,
      url: error.config?.url,
      fullURL: error.config
        ? `${error.config.baseURL}${error.config.url}`
        : 'N/A',
      timestamp: new Date().toISOString()
    })

    // Padronizar estrutura de erro - Standardize error structure
    const standardError = {
      status: error.response?.status || 500,
      message:
        error.response?.data?.error ||
        error.message ||
        'Erro de comunicação com servidor',
      code: error.response?.data?.code || 'UNKNOWN_ERROR',
      details: error.response?.data?.details
    }

    return Promise.reject(standardError)
  }
)

// Classe principal do serviço de API - Main API service class
class ApiService {
  constructor() {
    this.endpoints = {
      poetry: '/api/poetry',
      health: '/health'
    }
  }

  // Método para gerar um único poema - Method to generate single poem
  async generatePoem(keyword, language = 'portuguese') {
    try {
      // Validações básicas - Basic validations
      if (
        !keyword ||
        typeof keyword !== 'string' ||
        keyword.trim().length === 0
      ) {
        throw new Error('Palavra-chave é obrigatória')
      }

      if (keyword.trim().length < 2) {
        throw new Error('Palavra deve ter pelo menos 2 caracteres')
      }

      if (keyword.trim().length > 50) {
        throw new Error('Palavra deve ter no máximo 50 caracteres')
      }

      // Fazer requisição para API - Make API request
      const response = await api.post(`${this.endpoints.poetry}/generate`, {
        keyword: keyword.trim(),
        language: language === 'pt' ? 'portuguese' : 'english'
      })

      // Verificar se resposta é válida - Check if response is valid
      if (!response.data.success) {
        throw new Error(response.data.error || 'Erro ao gerar poema')
      }

      return response.data.data
    } catch (error) {
      // Re-lançar erro padronizado - Re-throw standardized error
      if (error.status) {
        throw error // Erro já padronizado pelo interceptor
      } else {
        throw {
          status: 400,
          message: error.message,
          code: 'VALIDATION_ERROR'
        }
      }
    }
  }

  // Método para gerar múltiplos poemas - Method to generate multiple poems
  async generateMultiplePoems(keyword, language = 'portuguese', count = 3) {
    try {
      // Validações básicas - Basic validations
      if (
        !keyword ||
        typeof keyword !== 'string' ||
        keyword.trim().length === 0
      ) {
        throw new Error('Palavra-chave é obrigatória')
      }

      const poemCount = parseInt(count)
      if (isNaN(poemCount) || poemCount < 1 || poemCount > 10) {
        throw new Error('Quantidade deve ser entre 1 e 10 poemas')
      }

      // Fazer requisição para API - Make API request
      const response = await api.post(
        `${this.endpoints.poetry}/generate-multiple`,
        {
          keyword: keyword.trim(),
          language: language === 'pt' ? 'portuguese' : 'english',
          count: poemCount
        }
      )

      // Verificar se resposta é válida - Check if response is valid
      if (!response.data.success) {
        throw new Error(response.data.error || 'Erro ao gerar poemas')
      }

      return response.data.data
    } catch (error) {
      // Re-lançar erro padronizado - Re-throw standardized error
      if (error.status) {
        throw error
      } else {
        throw {
          status: 400,
          message: error.message,
          code: 'VALIDATION_ERROR'
        }
      }
    }
  }

  // Método para obter informações do gerador - Method to get generator info
  async getGeneratorInfo() {
    try {
      const response = await api.get(`${this.endpoints.poetry}/info`)

      if (!response.data.success) {
        throw new Error(response.data.error || 'Erro ao obter informações')
      }

      return response.data.data
    } catch (error) {
      if (error.status) {
        throw error
      } else {
        throw {
          status: 500,
          message: 'Erro ao conectar com servidor',
          code: 'CONNECTION_ERROR'
        }
      }
    }
  }

  // Método para verificar saúde da API - Method to check API health
  async checkHealth() {
    try {
      const response = await api.get(this.endpoints.health)
      return response.data
    } catch (error) {
      throw {
        status: error.status || 503,
        message: 'Serviço indisponível',
        code: 'SERVICE_UNAVAILABLE'
      }
    }
  }

  // Método para verificar saúde do serviço de poesia - Method to check poetry service health
  async checkPoetryHealth() {
    try {
      const response = await api.get(`${this.endpoints.poetry}/health`)
      return response.data
    } catch (error) {
      throw {
        status: error.status || 503,
        message: 'Serviço de poesia indisponível',
        code: 'POETRY_SERVICE_UNAVAILABLE'
      }
    }
  }
}

// Instância única do serviço - Service singleton instance
const apiService = new ApiService()

// Métodos utilitários para facilitar uso - Utility methods for easier use
export const poetryApi = {
  // Gerar poema único - Generate single poem
  generatePoem: (keyword, language) =>
    apiService.generatePoem(keyword, language),

  // Gerar múltiplos poemas - Generate multiple poems
  generateMultiple: (keyword, language, count) =>
    apiService.generateMultiplePoems(keyword, language, count),

  // Obter informações - Get information
  getInfo: () => apiService.getGeneratorInfo(),

  // Verificar saúde - Check health
  checkHealth: () => apiService.checkHealth(),
  checkPoetryHealth: () => apiService.checkPoetryHealth()
}

// Exportar instância principal - Export main instance
export default apiService
