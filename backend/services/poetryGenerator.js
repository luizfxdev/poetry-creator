const poetryWordsData = require('../models/poetryWords')

class PoetryGenerator {
  constructor() {
    this.poemStyles = {
      pt: ['soneto', 'livre', 'haicai', 'cordel', 'elegíaco'],
      en: ['sonnet', 'free verse', 'haiku', 'ballad', 'limerick']
    }

    this.poemTemplates = {
      pt: {
        soneto: [
          `No {tema} encontro a paz que tanto busco,
Como {palavra1} que dança ao vento leve,
Suas {palavra2} me trazem luz serena,
E no silêncio, minha alma se eleva.

Entre {palavra3} e {palavra4} caminho,
Descobrindo {palavra5} em cada momento,
O {tema} me ensina o verdadeiro carinho,
E traz ao coração contentamento.

Se pudesse expressar em verso singelo,
Todo o {palavra1} que sinto no peito,
Faria do {tema} meu mais belo modelo,
E da vida um sonho perfeito.

Assim canto ao {tema} com gratidão,
Por ser fonte de inspiração.`
        ],
        livre: [
          `{tema}...
Palavra que ecoa em meu ser,
Como {palavra1} que brota da terra,
Como {palavra2} que rompe o silêncio.

Vejo em ti {palavra3},
Sinto em ti {palavra4},
E me perco em tuas {palavra5}
Como viajante em busca do lar.

Ó {tema}, 
Tu és {palavra1} e {palavra2},
És {palavra3} que alimenta sonhos,
És {palavra4} que acalma tormentas.

E eu aqui,
Simples mortal,
Te celebro em versos,
Te honro em rimas,
Te carrego no coração.`
        ],
        haicai: [
          `{tema} desperta
{palavra1} dança no vento
{palavra2} eterna`
        ]
      },
      en: {
        sonnet: [
          `In {theme} I find the peace I've long sought,
Like {word1} dancing in the gentle breeze,
Its {word2} brings light to thoughts once fraught,
And in silence, my soul finds ease.

Between {word3} and {word4} I make my way,
Discovering {word5} in every hour,
{theme} teaches love in each new day,
And brings the heart its sweetest power.

If I could express in verses plain,
All the {word1} I feel within my chest,
I'd make {theme} my most beautiful refrain,
And life itself a perfect quest.

Thus I sing to {theme} with gratitude,
For being source of all that's good.`
        ],
        'free verse': [
          `{theme}...
Word that echoes in my being,
Like {word1} sprouting from the earth,
Like {word2} breaking through silence.

I see in you {word3},
I feel in you {word4},
And I lose myself in your {word5}
Like a traveler seeking home.

Oh {theme},
You are {word1} and {word2},
You are {word3} that feeds dreams,
You are {word4} that calms storms.

And I here,
Simple mortal,
Celebrate you in verses,
Honor you in rhymes,
Carry you in my heart.`
        ],
        haiku: [
          `{theme} awakens now
{word1} dances in the wind
{word2} eternal`
        ]
      }
    }
  }

  async generatePoem(keyword, language = 'pt') {
    try {
      console.log(`🎨 Iniciando geração de poema: "${keyword}" (${language})`)

      // Mapear idiomas
      const langMap = {
        pt: 'pt',
        portuguese: 'pt',
        en: 'en',
        english: 'en'
      }

      const mappedLang = langMap[language] || 'pt'

      // Obter palavras relacionadas - CORRIGIDO
      const relatedWords = this.getRelatedWords(keyword, mappedLang)
      const style = this.getRandomStyle(mappedLang)

      // Gerar o poema
      const poem = this.createPoemText(keyword, relatedWords, mappedLang, style)

      return {
        poem,
        style,
        theme: keyword,
        verses: this.countVerses(poem),
        language: mappedLang,
        relatedWords: relatedWords.slice(0, 5)
      }
    } catch (error) {
      console.error('❌ Erro na geração do poema:', error)
      throw error
    }
  }

  getRelatedWords(keyword, language) {
    // CORRIGIDO: Acessar corretamente os dados do poetryWords
    const words = poetryWordsData[language] || poetryWordsData.pt
    const keywordLower = keyword.toLowerCase()
    let relatedWords = []

    // Buscar palavras relacionadas por categoria
    for (const [category, wordList] of Object.entries(words)) {
      if (wordList.includes(keywordLower) || category === keywordLower) {
        relatedWords = [...relatedWords, ...wordList]
        break
      }
    }

    // Se não encontrou categoria específica, usar palavras gerais
    if (relatedWords.length === 0) {
      relatedWords = [
        ...(words.sentimentos || words.feelings || []),
        ...(words.natureza || words.nature || []),
        ...(words.vida || words.life || [])
      ]
    }

    // Embaralhar e retornar
    return this.shuffleArray(relatedWords)
  }

  getRandomStyle(language) {
    const styles = this.poemStyles[language] || this.poemStyles.pt
    return styles[Math.floor(Math.random() * styles.length)]
  }

  createPoemText(theme, relatedWords, language, style) {
    const templates = this.poemTemplates[language] || this.poemTemplates.pt
    const styleTemplates =
      templates[style] || templates.livre || templates['free verse']

    const template =
      styleTemplates[Math.floor(Math.random() * styleTemplates.length)]

    // Substituir placeholders
    let poem = template.replace(/\{theme\}/g, theme).replace(/\{tema\}/g, theme)

    // Substituir palavras numeradas
    for (let i = 1; i <= 5; i++) {
      const word =
        relatedWords[i - 1] ||
        relatedWords[Math.floor(Math.random() * relatedWords.length)]
      poem = poem
        .replace(new RegExp(`\\{word${i}\\}`, 'g'), word)
        .replace(new RegExp(`\\{palavra${i}\\}`, 'g'), word)
    }

    return poem
  }

  countVerses(poem) {
    return poem.split('\n').filter((line) => line.trim() !== '').length
  }

  shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  async generateMultiplePoems(keyword, language = 'pt', count = 3) {
    const poems = []
    for (let i = 0; i < count; i++) {
      const poem = await this.generatePoem(keyword, language)
      poems.push(poem)
    }

    return {
      poems,
      totalGenerated: poems.length,
      theme: keyword,
      language
    }
  }

  getGeneratorStats() {
    return {
      availableLanguages: Object.keys(this.poemStyles),
      availableStyles: this.poemStyles,
      totalWordCategories: Object.keys(poetryWordsData.pt).length
    }
  }
}

module.exports = PoetryGenerator
