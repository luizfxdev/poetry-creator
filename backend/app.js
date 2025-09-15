// Aplicação principal do backend Poetry Creator
// Main backend application for Poetry Creator

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const morgan = require('morgan')
require('dotenv').config()

// Importar rotas - Import routes
const poetryRoutes = require('./routes/poetryRoutes')

// Criar aplicação Express - Create Express application
const app = express()

// ==================== CONFIGURAÇÕES ====================
// ==================== CONFIGURATIONS ====================

// Porta do servidor - Server port
const PORT = process.env.PORT || 3001

// Configurar CORS para permitir frontend - Configure CORS to allow frontend
const corsOptions = {
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:5173', 'http://127.0.0.1:5173'], // Corrigido para 5173 (Vite)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}

// ==================== MIDDLEWARES GLOBAIS ====================
// ==================== GLOBAL MIDDLEWARES ====================

// Segurança com Helmet - Security with Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false // Desabilitar CSP para desenvolvimento
  })
)

// CORS - Cross Origin Resource Sharing
app.use(cors(corsOptions))

// Logging de requisições - Request logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

// Parse JSON bodies
app.use(
  express.json({
    limit: '10mb',
    type: 'application/json'
  })
)

// Parse URL-encoded bodies
app.use(
  express.urlencoded({
    extended: true,
    limit: '10mb'
  })
)

// Rate Limiting - Limitação de requisições por IP
// Rate limiting - Request limitation per IP
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100, // Limite de 100 requisições por janela
  message: {
    success: false,
    error: 'Muitas requisições deste IP, tente novamente mais tarde.',
    code: 'TOO_MANY_REQUESTS'
  },
  standardHeaders: true,
  legacyHeaders: false
})

app.use(limiter)

// Middleware para adicionar timestamp nas respostas
// Middleware to add timestamp in responses
app.use((req, res, next) => {
  res.setHeader('X-Timestamp', new Date().toISOString())
  res.setHeader('X-Service', 'Poetry Creator API')
  next()
})

// ==================== ROTAS PRINCIPAIS ====================
// ==================== MAIN ROUTES ====================

// Rota raiz da API - API root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Poetry Creator API está funcionando!',
    version: '1.0.0',
    description: 'API para geração de poesias em português e inglês',
    documentation: {
      endpoints: {
        'GET /': 'Informações da API',
        'GET /health': 'Status da API',
        'POST /api/poetry/generate': 'Gerar poema único',
        'POST /api/poetry/generate-multiple': 'Gerar múltiplos poemas',
        'GET /api/poetry/info': 'Informações do gerador',
        'GET /api/poetry/health': 'Status do serviço de poesia'
      },
      usage: {
        contentType: 'application/json',
        languages: ['portuguese', 'english'],
        maxKeywordLength: 50,
        maxPoemsPerRequest: 10
      }
    },
    timestamp: new Date().toISOString()
  })
})

// Health check geral da API - General API health check
app.get('/health', (req, res) => {
  const uptime = process.uptime()

  res.json({
    success: true,
    status: 'healthy',
    uptime: {
      seconds: Math.floor(uptime),
      formatted: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`
    },
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
    },
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  })
})

// Rotas da API de poesia - Poetry API routes
app.use('/api/poetry', poetryRoutes)

// ==================== MIDDLEWARE DE ERRO ====================
// ==================== ERROR MIDDLEWARE ====================

// Handler para rotas não encontradas - Handler for routes not found
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint não encontrado',
    code: 'ENDPOINT_NOT_FOUND',
    requestedUrl: req.originalUrl,
    method: req.method,
    availableEndpoints: [
      'GET /',
      'GET /health',
      'POST /api/poetry/generate',
      'POST /api/poetry/generate-multiple',
      'GET /api/poetry/info',
      'GET /api/poetry/health'
    ],
    timestamp: new Date().toISOString()
  })
})

// Handler de erro geral - General error handler
app.use((error, req, res, next) => {
  console.error('Erro não tratado na aplicação:', error)

  // Se resposta já foi enviada, delegar para handler padrão do Express
  // If response was already sent, delegate to Express default handler
  if (res.headersSent) {
    return next(error)
  }

  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    timestamp: new Date().toISOString()
  })
})

// ==================== INICIALIZAÇÃO DO SERVIDOR ====================
// ==================== SERVER INITIALIZATION ====================

// Iniciar servidor - Start server
const server = app.listen(PORT, () => {
  console.log('=================================')
  console.log('🎭 POETRY CREATOR API INICIADA 🎭')
  console.log('=================================')
  console.log(`🚀 Servidor rodando na porta: ${PORT}`)
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`)
  console.log(`📍 URL: http://localhost:${PORT}`)
  console.log(`⏰ Iniciado em: ${new Date().toLocaleString('pt-BR')}`)
  console.log('=================================')
  console.log('Endpoints disponíveis:')
  console.log(`📋 GET  http://localhost:${PORT}/`)
  console.log(`💚 GET  http://localhost:${PORT}/health`)
  console.log(`🎨 POST http://localhost:${PORT}/api/poetry/generate`)
  console.log(`🎨 POST http://localhost:${PORT}/api/poetry/generate-multiple`)
  console.log(`ℹ️  GET  http://localhost:${PORT}/api/poetry/info`)
  console.log('=================================')
})

// Tratar sinais de encerramento graceful - Handle graceful shutdown signals
process.on('SIGTERM', () => {
  console.log('SIGTERM recebido, encerrando servidor graciosamente...')
  server.close(() => {
    console.log('Servidor encerrado com sucesso.')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT recebido, encerrando servidor graciosamente...')
  server.close(() => {
    console.log('Servidor encerrado com sucesso.')
    process.exit(0)
  })
})

// Tratar erros não capturados - Handle uncaught errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('Promise rejeitada não tratada:', promise, 'reason:', reason)
  // Não encerrar o processo em desenvolvimento para facilitar debug
  if (process.env.NODE_ENV === 'production') {
    process.exit(1)
  }
})

process.on('uncaughtException', (error) => {
  console.error('Exceção não capturada:', error)
  process.exit(1)
})

module.exports = app
