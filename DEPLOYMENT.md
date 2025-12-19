# Deploy no Vercel

Este projeto está configurado para fazer deploy no Vercel. Siga os passos abaixo:

## Pré-requisitos
- Conta no [Vercel](https://vercel.com)
- Repositório Git (GitHub, GitLab, ou Bitbucket)
- Código versionado no Git

## Passos para Deploy

### 1. Fazer push do código para o GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Conectar ao Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione "Import Git Repository"
4. Conecte sua conta GitHub e selecione este repositório

### 3. Configurar o Projeto
- **Framework Preset**: Deixar em branco ou selecionar "Node.js"
- **Build Command**: `npm run build` (será detectado automaticamente)
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

### 4. Variáveis de Ambiente (se necessário)
Se o projeto tiver variáveis de ambiente, adicione-as em:
- Project Settings → Environment Variables

### 5. Deploy
Clique em "Deploy" e aguarde o processo concluir.

## Estrutura do Projeto

- **Frontend**: React + Vite → `dist/public/`
- **Backend**: Express.js → `dist/index.cjs`
- **Arquivo de Configuração**: `vercel.json`

## O que o vercel.json faz

- Define o comando de build: `npm run build`
- Configura as rotas para o backend (Express)
- Serve a aplicação frontend estática
- Garante que as requisições à API sejam roteadas corretamente

## Status do Build

Após fazer deploy, você poderá:
- Ver logs de build em tempo real
- Obter uma URL pública (ex: `seu-projeto.vercel.app`)
- Configurar domínio personalizado

## Troubleshooting

Se encontrar problemas:
1. Verifique os logs de build no painel do Vercel
2. Certifique-se que todos os arquivos estão versionados no Git
3. Valide o arquivo `vercel.json`
4. Teste o build localmente: `npm run build && npm start`

---

**Pronto para deploy!** 🚀
