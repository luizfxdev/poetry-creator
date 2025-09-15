// Controlador para endpoints da API de poesia
// Controller for poetry API endpoints

const PoetryGenerator = require('../services/poetryGenerator')

// Instância única do gerador
const generator = new PoetryGenerator()

// Endpoint para gerar um único poema
const generateSinglePoem = async (req, res) => {
  try {
    const { keyword, language = 'portuguese' } = req.body

    console.log('🎨 Dados recebidos:', { keyword, language })

    // Validar entrada obrigatória
    if (!keyword || typeof keyword !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Palavra-chave é obrigatória e deve ser uma string',
        code: 'INVALID_KEYWORD'
      })
    }

    // Validar comprimento da palavra-chave
    if (keyword.trim().length < 2 || keyword.trim().length > 50) {
      return res.status(400).json({
        success: false,
        error: 'Palavra-chave deve ter entre 2 e 50 caracteres',
        code: 'KEYWORD_LENGTH_INVALID'
      })
    }

    // Gerar poema usando o serviço
    console.log('🎭 Gerando poema...')
    const poemData = await generator.generatePoem(keyword, language)
    console.log('✅ Poema gerado com sucesso!')

    // Resposta de sucesso
    res.status(200).json({
      success: true,
      data: poemData,
      message:
        language === 'portuguese'
          ? 'Poema gerado com sucesso!'
          : 'Poem generated successfully!'
    })
  } catch (error) {
    console.error('❌ Erro no generateSinglePoem:', error)

    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor ao gerar poema',
      code: 'INTERNAL_GENERATION_ERROR',
      details:
        process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}

// Endpoint para gerar múltiplos poemas
const generateMultiplePoems = async (req, res) => {
  try {
    const { keyword, language = 'portuguese', count = 3 } = req.body

    if (!keyword || typeof keyword !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Palavra-chave é obrigatória e deve ser uma string',
        code: 'INVALID_KEYWORD'
      })
    }

    const poemCount = parseInt(count)
    if (isNaN(poemCount) || poemCount < 1 || poemCount > 10) {
      return res.status(400).json({
        success: false,
        error: 'Quantidade deve ser entre 1 e 10 poemas',
        code: 'INVALID_COUNT'
      })
    }

    const poemsData = await generator.generateMultiplePoems(
      keyword,
      language,
      poemCount
    )

    res.status(200).json({
      success: true,
      data: poemsData,
      message:
        language === 'portuguese'
          ? `${poemsData.totalGenerated} poemas gerados com sucesso!`
          : `${poemsData.totalGenerated} poems generated successfully!`
    })
  } catch (error) {
    console.error('❌ Erro no generateMultiplePoems:', error)

    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor ao gerar poemas',
      code: 'INTERNAL_GENERATION_ERROR',
      details:
        process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}

// Endpoint para informações do gerador
const getGeneratorInfo = async (req, res) => {
  try {
    const stats = generator.getGeneratorStats()

    res.status(200).json({
      success: true,
      data: {
        ...stats,
        version: '1.0.0',
        description: 'Poetry Creator API - Gerador de Poesias Multilíngue',
        endpoints: {
          '/generate': 'POST - Gerar um único poema',
          '/generate-multiple': 'POST - Gerar múltiplos poemas',
          '/info': 'GET - Informações do gerador',
          '/health': 'GET - Status da API'
        }
      },
      message: 'Informações do gerador obtidas com sucesso'
    })
  } catch (error) {
    console.error('❌ Erro no getGeneratorInfo:', error)

    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      code: 'INTERNAL_INFO_ERROR'
    })
  }
}

// Endpoint de health check
const healthCheck = async (req, res) => {
  try {
    const uptime = process.uptime()
    const timestamp = new Date().toISOString()

    res.status(200).json({
      success: true,
      data: {
        status: 'healthy',
        uptime: `${Math.floor(uptime)}s`,
        timestamp,
        version: '1.0.0',
        service: 'Poetry Creator API'
      },
      message: 'API funcionando corretamente'
    })
  } catch (error) {
    res.status(503).json({
      success: false,
      error: 'Serviço indisponível',
      code: 'SERVICE_UNAVAILABLE'
    })
  }
}

module.exports = {
  generateSinglePoem,
  generateMultiplePoems,
  getGeneratorInfo,
  healthCheck
}
