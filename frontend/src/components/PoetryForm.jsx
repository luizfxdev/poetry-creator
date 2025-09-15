import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const PoetryForm = ({ onSubmit, onReturn, loading }) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    keyword: '',
    language: 'pt'
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.keyword.trim()) {
      newErrors.keyword = t('messages.validation.required')
    } else if (formData.keyword.trim().length < 2) {
      newErrors.keyword = t('messages.validation.minLength', { count: 2 })
    } else if (formData.keyword.trim().length > 50) {
      newErrors.keyword = t('messages.validation.maxLength', { count: 50 })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  return (
    <div className="glass-container p-8 animate-slide-up">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white font-cormorant mb-4">
          {t('form.title')}
        </h1>
        <p className="text-white/80 font-lato text-lg">
          {t('app.description')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo palavra-chave */}
        <div>
          <label
            htmlFor="keyword"
            className="block text-white font-medium mb-3 font-lato text-lg"
          >
            {t('form.keyword.label')}
          </label>
          <input
            id="keyword"
            type="text"
            value={formData.keyword}
            onChange={(e) => handleInputChange('keyword', e.target.value)}
            placeholder={t('form.keyword.placeholder')}
            className={`input-poetry w-full text-lg ${errors.keyword ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}`}
            disabled={loading}
            maxLength={50}
          />
          <p className="text-white/70 text-sm mt-2 font-lato">
            {t('form.keyword.helper')}
          </p>
          {errors.keyword && <p className="error-message">{errors.keyword}</p>}
        </div>

        {/* Seleção de idioma */}
        <div>
          <label
            htmlFor="language"
            className="block text-white font-medium mb-3 font-lato text-lg"
          >
            {t('form.language.label')}
          </label>
          <select
            id="language"
            value={formData.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
            className="select-poetry w-full text-lg"
            disabled={loading}
          >
            <option value="pt">{t('form.language.options.pt')}</option>
            <option value="en">{t('form.language.options.en')}</option>
          </select>
        </div>

        {/* Botões */}
        <div className="flex flex-col gap-4 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="golden-btn w-full"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="loading-spinner-golden"></div>
                <span>{t('form.buttons.creating')}</span>
              </div>
            ) : (
              t('form.buttons.create')
            )}
          </button>

          <button
            type="button"
            onClick={onReturn}
            disabled={loading}
            className="golden-btn-secondary w-full"
          >
            {t('form.buttons.return')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PoetryForm
