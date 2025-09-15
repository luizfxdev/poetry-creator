# 🎭 Poetry Creator

**Gerador de Poesias Multilíngue** - Uma aplicação full-stack que cria poemas únicos em português e inglês usando algoritmos inteligentes.

## ✨ Recursos Principais

- 🌍 **Suporte Multilíngue**: Interface e poemas em Português e Inglês
- 🎨 **Interface Artística**: Design moderno com vídeo de fundo e efeitos visuais
- ⚡ **Geração Instantânea**: Criação rápida de poemas baseados em palavras-chave
- 📱 **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- 🎯 **Temas Dinâmicos**: Detecção automática de temas poéticos
- 🔄 **Troca de Idiomas**: Alternância instantânea entre PT/EN
- 📋 **Cópia Fácil**: Copie poemas para área de transferência
- 🎪 **Animações Suaves**: Transições e efeitos visuais elegantes

## 🏗️ Arquitetura

### Backend (Node.js + Express)
```
backend/
├── src/
│   ├── controllers/     # Controladores da API
│   ├── models/         # Modelos de dados e palavras poéticas  
│   ├── routes/         # Definições das rotas
│   ├── services/       # Lógica de geração de poemas
│   └── app.js         # Aplicação principal
├── database/          # Banco de dados/configurações
└── package.json       # Dependências e scripts
```

### Frontend (React + Vite + Tailwind)
```
frontend/
├── src/
│   ├── components/    # Componentes React reutilizáveis
│   ├── pages/        # Páginas da aplicação
│   ├── services/     # Comunicação com API
│   ├── i18n/         # Configurações de idioma
│   ├── styles/       # Estilos Tailwind CSS
│   └── assets/       # Recursos estáticos (vídeos, imagens)
└── public/           # Arquivos públicos
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Arquivo `background.mp4` na pasta `frontend/src/assets/`

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Configure as variáveis de ambiente
npm run dev           # Inicia em modo desenvolvimento
```

### 2. Frontend Setup  
```bash
cd frontend
npm install
cp .env.example .env  # Configure as variáveis de ambiente
npm run dev           # Inicia em modo desenvolvimento
```

### 3. Acessar Aplicação
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Documentação API**: http://localhost:3001/api/poetry/info

## 🎯 Como Usar

1. **Acesse a aplicação** no navegador
2. **Digite uma palavra inspiradora** no campo de entrada
3. **Selecione o idioma** do poema (Português ou Inglês)
4. **Clique em "Criar Poema"** e aguarde a geração
5. **Copie ou compartilhe** seu poema único!
6. Use o **alternador de idioma** no canto superior direito para mudar a interface

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Cors** - Controle de acesso entre origens
- **Helmet** - Segurança HTTP
- **Morgan** - Logging de requisições
- **Rate Limiting** - Controle de taxa de requisições

### Frontend
- **React 18** - Biblioteca de interface
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilos
- **React i18next** - Internacionalização
- **Axios** - Cliente HTTP
- **Fontes Google** - Tipografia (Cormorant Garamond, Lato)

## 🎨 Personalização de Botões

Os botões seguem o design especificado com efeitos CSS personalizados:

```css
.btn-15 {
  background: #b621fe;
  box-shadow: inset 2px 2px 2px 0px rgba(255,255,255,.5),
             7px 7px 20px 0px rgba(0,0,0,.1),
             4px 4px 5px 0px rgba(0,0,0,.1);
}

.btn-15:hover:after {
  background-color: #663dff;
  width: 100%;
}
```

## 🌍 Internacionalização

A aplicação suporta dois idiomas completos:

### Português (Padrão)
- Interface em português
- Geração de poemas em português
- Temas e metadados localizados

### English
- English interface
- English poem generation  
- Localized themes and metadata

## 📡 Endpoints da API

### `POST /api/poetry/generate`
Gera um único poema baseado em palavra-chave.

**Body:**
```json
{
  "keyword": "amor",
  "language": "portuguese"
}
```

### `POST /api/poetry/generate-multiple`
Gera múltiplos poemas (1-10).

**Body:**
```json
{
  "keyword": "esperança", 
  "language": "portuguese",
  "count": 3
}
```

### `GET /api/poetry/info`
Retorna informações sobre o gerador.

### `GET /api/poetry/health`
Health check do serviço de poesia.

## 🎭 Base de Dados Poética

A aplicação inclui um rico banco de dados com:

### Português
- **43 substantivos** inspiradores (amor, saudade, esperança...)
- **35 adjetivos** poéticos (belo, eterno, profundo...)
- **35 verbos** expressivos (amar, sonhar, viver...)
- **23 conectivos** poéticos (e, mas, quando...)
- **4 estruturas** de poema diferentes

### English  
- **43 inspiring nouns** (love, longing, hope...)
- **35 poetic adjectives** (beautiful, eternal, deep...)
- **35 expressive verbs** (love, dream, live...)
- **23 poetic connectives** (and, but, when...)
- **4 different poem structures**

## 🔧 Configuração do Vídeo de Fundo

1. Adicione seu arquivo `background.mp4` em `frontend/src/assets/`
2. O vídeo será reproduzido automaticamente em loop
3. Overlay sutil aplicado para melhor legibilidade
4. Suporte completo a responsividade

## 🚦 Scripts Disponíveis

### Backend
```bash
npm run dev      # Desenvolvimento com nodemon
npm start        # Produção  
npm test         # Executar testes
```

### Frontend
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Verificar código
```

## 🔒 Segurança

- **Helmet** para headers de segurança
- **CORS** configurado adequadamente
- **Rate Limiting** para prevenir abuso
- **Validação** rigorosa de entrada
- **Sanitização** de dados

## 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: xs, sm, md, lg, xl, 2xl, 3xl
- **Container**: Posicionado à esquerda conforme especificado
- **Flexbox/Grid**: Layout flexível e adaptável

## 🎨 Temas e Cores

```css
:root {
  --poetry-primary: #b621fe;    /* Roxo principal */
  --poetry-secondary: #663dff;   /* Roxo secundário */
  --poetry-dark: #1a1a2e;       /* Fundo escuro */
  --poetry-light: #f8f9fa;      /* Texto claro */
}
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autor

Desenvolvido com ❤️ por **[Luizfxdev](https://www.linkedin.com/in/luizfxdev)** para inspirar criatividade através da tecnologia.

---

## 📞 Suporte

Para suporte e dúvidas:
- 📧 Email: luizfx.dev@gmail.com




**🎭 Poetry Creator - Onde a tecnologia encontra a arte das palavras! 🎭**
