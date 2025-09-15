import React from 'react'
import { useTranslation } from 'react-i18next'

const PoetryDisplay = ({ poemData, onNewPoem, onReturn }) => {
  const { t } = useTranslation()

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="glass-container p-8 animate-slide-up">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white font-cormorant mb-4">
          {t('display.title')}
        </h2>

        {/* Título do poema gerado pela IA */}
        <h3 className="text-2xl font-semibold text-white/90 font-cormorant mb-2">
          {poemData.title}
        </h3>
      </div>

      {/* Conteúdo do poema */}
      <div className="poem-card mb-8">
        <div className="poem-text mb-6">{poemData.poem}</div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-3 justify-center">
          <span className="metadata-badge">{poemData.keyword}</span>
          <span className="metadata-badge">
            {poemData.language === 'pt'
              ? t('form.language.options.pt')
              : t('form.language.options.en')}
          </span>
          <span className="metadata-badge">
            {formatDate(poemData.createdAt || poemData.timestamp)}
          </span>
        </div>
      </div>

      {/* Botões de ação - MESMO TAMANHO */}
      <div className="flex flex-col gap-4">
        <button onClick={onNewPoem} className="golden-btn w-full" type="button">
          {t('display.newPoem')}
        </button>

        <button
          onClick={onReturn}
          className="golden-btn-secondary w-full"
          type="button"
        >
          {t('display.backToForm')}
        </button>
      </div>
    </div>
  )
}

export default PoetryDisplay
