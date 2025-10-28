# GitHub Users Search

Uma aplicação Next.js moderna para buscar e explorar usuários do GitHub com interface elegante e recursos avançados.

## 🚀 Funcionalidades

- **🔍 Busca de Usuários**: Integração direta com a API do GitHub
- **📄 Paginação**: Navegação suave entre páginas de resultados
- **🎨 Design Moderno**: Interface com Tailwind CSS e Styled Components
- **♿ Acessibilidade**: Componentes totalmente acessíveis
- **🧪 Testes Abrangentes**: Testes unitários com Jest e Testing Library
- **📚 Documentação**: Storybook para documentação de componentes
- **⚡ Performance**: Otimizado para rápido carregamento
- **📱 Responsivo**: Design que funciona em todos os dispositivos

## 🛠 Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS + Styled Components
- **Testes**: Jest + React Testing Library
- **Documentação**: Storybook
- **HTTP Client**: Fetch API nativo
- **Linting**: ESLint

## 📦 Estrutura do Projeto

```
github-users-app/
├── app/                    # Next.js App Router
│   ├── globals.css        # Estilos globais e Tailwind
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   ├── loading.tsx        # Componente de loading
│   ├── error.tsx          # Tratamento de erros
│   └── not-found.tsx      # Página 404
├── components/
│   ├── ui/                # Componentes de UI reutilizáveis
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Pagination/
│   ├── UserCard/          # Card de usuário
│   └── UserList/          # Lista de usuários
├── hooks/                 # Custom hooks
│   └── useGitHubSearch.ts
├── services/              # Serviços de API
│   └── githubApi.ts
├── types/                 # Definições TypeScript
│   └── github.ts
├── styles/                # Estilos e temas
├── lib/                   # Configurações e utilitários
├── .storybook/            # Configuração do Storybook
└── __tests__/             # Testes e mocks
```

## 🎯 Componentes Principais

### UserCard

Exibe informações do usuário do GitHub:

- Avatar
- Nome de usuário
- Link para perfil
- Design responsivo e clicável

### UserList

Gerencia a exibição da lista de usuários com estados:

- Loading
- Error
- Empty state
- Success state

### Pagination

Navegação entre páginas de resultados:

- Botões anterior/próximo
- Contador de páginas
- Estados desabilitados nas extremidades

### Loading

Spinner animado com mensagem personalizável

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

1. **Clone o repositório**

```bash
git clone <repository-url>
cd github-users-app
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
# Crie um arquivo .env.local
# A API do GitHub não requer chave para buscas públicas
```

4. **Execute em desenvolvimento**

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📖 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm run start

# Linting
npm run lint

# Testes
npm test
npm run test:watch
npm run test:coverage

# Storybook
npm run storybook
npm run build-storybook

# Type checking
npm run type-check
```

## 🧪 Testes

### Estrutura de Testes

- **Testes Unitários**: Componentes individuais
- **Testes de Integração**: Hooks e serviços
- **Testes de UI**: Interações do usuário

### Executar Testes

```bash
# Todos os testes
npm test

# Modo watch
npm run test:watch

# Com coverage
npm run test:coverage

# Testes específicos
npm test -- UserCard.test.tsx
```

## 📚 Storybook

Documentação interativa dos componentes:

```bash
# Desenvolvimento
npm run storybook

# Build
npm run build-storybook
```

Acesse em `http://localhost:6006` para explorar todos os componentes.

## 🎨 Estilização

### Tailwind CSS

- Sistema de design consistente
- Utilitários para rápido desenvolvimento
- Configuração personalizada

### Styled Components

- Estilos componentizados
- Temas dinâmicos
- Server-side rendering

### Design System

- Cores semânticas
- Tipografia consistente
- Componentes acessíveis

## 🔌 API

### GitHub API Integration

- Busca de usuários via `search/users`
- Paginação (20 resultados por página)
- Tratamento de erros e rate limiting

### Exemplo de Uso

```typescript
const { users, loading, error, searchUsers } = useGitHubSearch();

// Buscar usuários
await searchUsers("username", 1);
```

## ♿ Acessibilidade

- Navegação por teclado
- ARIA labels apropriados
- Contraste de cores adequado
- Foco visível nos elementos interativos
- Textos descritivos para leitores de tela

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm run build
vercel --prod
```

### Outras Plataformas

- Netlify
- AWS Amplify
- Railway
- Docker

## 📈 Performance

- Otimização de imagens
- Code splitting automático
- Renderização do lado do servidor
- Cache de API
- Bundle analysis

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Siga o ESLint configurado
- Escreva testes para novas funcionalidades
- Atualize o Storybook quando necessário
- Mantenha a cobertura de testes

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🐛 Problemas Conhecidos

- Rate limiting da API do GitHub (60 requisições por hora não autenticadas)
- Limitação de 1000 resultados na busca do GitHub

## 🔮 Próximas Funcionalidades

- [ ] Autenticação com GitHub para maior rate limit
- [ ] Cache de resultados
- [ ] Favoritos locais
- [ ] Modo offline
- [ ] Filtros avançados (localização, linguagens, etc.)
- [ ] Visualização de repositórios do usuário

## 📞 Suporte

Encontrou um problema? [Abra uma issue](https://github.com/seu-usuario/github-users-app/issues) no GitHub.

---

Desenvolvido com ❤️ usando Next.js e TypeScript.
