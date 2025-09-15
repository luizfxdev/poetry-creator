// Definição das rotas da API de poesia
// Poetry API routes definition

const express = require('express')
const poetryController = require('../controllers/poetryController')

// Criar router
const router = express.Router()

// Middleware para log de requisições nas rotas de poesia
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
  console.log('Body:', req.body)
  next()
})

// Middleware para validação de Content-Type em POST
const validateContentType = (req, res, next) => {
  if (req.method === 'POST') {
    const contentType = req.get('Content-Type')
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        success: false,
        error: 'Content-Type deve ser application/json',
        code: 'INVALID_CONTENT_TYPE'
      })
    }
  }
  next()
}

router.use(validateContentType)

// ROTAS PRINCIPAIS
router.post('/generate', poetryController.generateSinglePoem)
router.post('/generate-multiple', poetryController.generateMultiplePoems)
router.get('/info', poetryController.getGeneratorInfo)
router.get('/health', poetryController.healthCheck)

// Rota de teste
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Poetry API funcionando corretamente!',
    timestamp: new Date().toISOString(),
    routes: {
      'POST /generate': 'Gerar poema único',
      'POST /generate-multiple': 'Gerar múltiplos poemas',
      'GET /info': 'Informações do gerador',
      'GET /health': 'Status da API',
      'GET /test': 'Teste de funcionamento'
    }
  })
})

// Handler para rotas não encontradas
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada',
    code: 'ROUTE_NOT_FOUND',
    availableRoutes: [
      'POST /api/poetry/generate',
      'POST /api/poetry/generate-multiple',
      'GET /api/poetry/info',
      'GET /api/poetry/health',
      'GET /api/poetry/test'
    ]
  })
})

// Handler de erro geral
router.use((error, req, res, next) => {
  console.error('Erro no router de poetry:', error)
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor nas rotas de poesia',
    code: 'POETRY_ROUTES_ERROR',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  })
})

module.exports = router
