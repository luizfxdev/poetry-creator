// Componente de vídeo de fundo para a aplicação
// Background video component for the application
import React, { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const VideoBackground = ({ videoSrc, className = '' }) => {
  const videoRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    // Garantir que o vídeo seja reproduzido automaticamente
    // Ensure video plays automatically
    const video = videoRef.current
    if (video) {
      // Tentar reproduzir o vídeo - Try to play video
      const playPromise = video.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('✅ Vídeo de fundo iniciado com sucesso')
          })
          .catch((error) => {
            console.warn('⚠️ Falha ao reproduzir vídeo automaticamente:', error)
            // Em caso de falha, tentar novamente após interação do usuário
            // In case of failure, try again after user interaction
            document.addEventListener(
              'click',
              () => {
                video.play().catch(console.error)
              },
              { once: true }
            )
          })
      }

      // Event listeners para monitorar status do vídeo
      // Event listeners to monitor video status
      const handleLoadStart = () =>
        console.log('🎬 Carregando vídeo de fundo...')
      const handleCanPlay = () => console.log('✅ Vídeo pronto para reprodução')
      const handleError = (e) => console.error('❌ Erro no vídeo de fundo:', e)

      video.addEventListener('loadstart', handleLoadStart)
      video.addEventListener('canplay', handleCanPlay)
      video.addEventListener('error', handleError)

      // Cleanup - Limpeza
      return () => {
        video.removeEventListener('loadstart', handleLoadStart)
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('error', handleError)
      }
    }
  }, [videoSrc])

  return (
    <div
      className={`fixed inset-0 w-full h-full overflow-hidden z-0 ${className}`}
    >
      {/* Vídeo de fundo - Background video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label={t('accessibility.videoBackground')}
        style={{
          minWidth: '100vw',
          minHeight: '100vh',
          width: 'auto',
          height: 'auto'
        }}
      >
        {/* Source com fallback - Source with fallback */}
        <source src={videoSrc} type="video/mp4" />
        {/* Mensagem de fallback para browsers que não suportam vídeo */}
        {/* Fallback message for browsers that don't support video */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-yellow-900">
          <div className="flex items-center justify-center h-full">
            <p
              className="text-white/80 text-center"
              style={{ fontFamily: 'Lato, sans-serif' }}
            >
              {t('app.title')} - {t('app.subtitle')}
            </p>
          </div>
        </div>
      </video>

      {/* Overlay sutil para melhorar legibilidade do conteúdo */}
      {/* Subtle overlay to improve content readability */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Gradiente adicional nas bordas para efeito cinematográfico */}
      {/* Additional gradient at edges for cinematic effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30"></div>
    </div>
  )
}

export default VideoBackground
