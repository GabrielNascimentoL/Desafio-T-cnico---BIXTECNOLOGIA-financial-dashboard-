# Financial Dashboard

Um dashboard financeiro moderno e responsivo construído com Next.js, TypeScript e Styled Components.

## 🚀 Funcionalidades

- **Autenticação**: Sistema de login com persistência de sessão
- **Dashboard Protegido**: Acesso restrito apenas para usuários autenticados
- **Filtros Dinâmicos**: Filtragem por data, contas, indústrias, estados e tipos de transação
- **Cards de Resumo**: Visualização de receitas, despesas, saldo total e transações pendentes
- **Gráficos Interativos**: 
  - Gráfico de barras empilhadas (receitas vs despesas por mês)
  - Gráfico de linhas (evolução do saldo acumulado)
- **Sidebar de Navegação**: Menu lateral com opções de navegação e logout
- **Persistência de Dados**: Filtros e sessão salvos no localStorage
- **Design Responsivo**: Interface adaptável para desktop e mobile

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Styled Components** - Estilização CSS-in-JS
- **Chakra UI** - Biblioteca de componentes
- **Recharts** - Biblioteca de gráficos
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd nextfinancial_dashboard
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Verifique se o arquivo de dados existe**
   - O arquivo `public/transactions.json` deve estar presente
   - Este arquivo contém os dados das transações financeiras

4. **Execute o projeto em modo de desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   - Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🔐 Credenciais de Acesso

Para acessar o dashboard, use as seguintes credenciais:

- **Email**: `admin@exemplo.com`
- **Senha**: `123456`

## 📊 Estrutura dos Dados

O arquivo `transactions.json` contém transações com os seguintes campos:

- `date`: Data da transação em formato EPOCH (milissegundos)
- `amount`: Valor em string sem separador decimal (ex: "5565" = R$ 55,65)
- `transaction_type`: Tipo da transação (`deposit` ou `withdraw`)
- `currency`: Moeda da transação
- `account`: Empresa de origem/destino
- `industry`: Categoria da indústria
- `state`: Estado da empresa

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # Páginas do Next.js App Router
│   ├── dashboard/         # Página do dashboard
│   ├── login/            # Página de login
│   └── layout.tsx        # Layout principal
├── components/           # Componentes reutilizáveis
│   ├── Charts/          # Componentes de gráficos
│   ├── Filters/         # Componente de filtros
│   ├── Sidebar/         # Sidebar de navegação
│   └── SummaryCards/    # Cards de resumo
├── contexts/            # Contextos React
│   └── AuthContext.tsx  # Contexto de autenticação
├── hooks/               # Custom hooks
│   └── useTransactions.ts # Hook para gerenciar transações
├── lib/                 # Utilitários e configurações
├── types/               # Definições de tipos TypeScript
└── validations/         # Schemas de validação
```

## 🎯 Funcionalidades Detalhadas

### Autenticação
- Login com email e senha
- Persistência de sessão no localStorage
- Proteção de rotas via middleware
- Redirecionamento automático

### Filtros
- **Data**: Seleção de período inicial e final
- **Contas**: Múltipla seleção de empresas
- **Indústrias**: Filtro por categoria de indústria
- **Estados**: Filtro por localização
- **Tipos**: Receitas ou despesas
- **Persistência**: Filtros salvos automaticamente

### Dashboard
- **Cards de Resumo**: Métricas principais em tempo real
- **Gráficos Dinâmicos**: Atualizados conforme filtros aplicados
- **Responsividade**: Layout adaptável para diferentes telas
- **Performance**: Otimizado com useMemo e useCallback

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar versão de produção
npm start

# Linting
npm run lint
```

## 📱 Responsividade

O dashboard é totalmente responsivo:

- **Desktop**: Layout completo com sidebar fixa
- **Tablet**: Layout adaptado com sidebar colapsável
- **Mobile**: Interface otimizada para toque

## 🔧 Configurações

### Personalização de Tema
- Cores e estilos podem ser ajustados em `src/lib/chakra-provider.tsx`
- Styled Components permitem customizações avançadas

### Dados
- Para usar dados diferentes, substitua o arquivo `public/transactions.json`
- Mantenha a mesma estrutura de campos

## 🐛 Solução de Problemas

### Erro de Hidratação
- Certifique-se de que o localStorage está sendo acessado apenas no cliente
- Use `useEffect` para operações que dependem do browser

### Problemas de Performance
- Os gráficos são otimizados para grandes volumes de dados
- Filtros são aplicados de forma eficiente com useMemo

### Problemas de Autenticação
- Limpe o localStorage se houver problemas de sessão
- Verifique se as credenciais estão corretas

## 📄 Licença

Este projeto é para fins educacionais e de demonstração.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

Desenvolvido com ❤️ usando Next.js e TypeScript
