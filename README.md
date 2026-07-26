# websocket

# 🌐 Real-Time Chat WebSocket Engine

Um ecossistema completo de chat em tempo real desenvolvido com **Node.js nativo**, **TypeScript**, **WebSockets (ws)** e um frontend purista (**HTML5/CSS3**). O projeto implementa uma arquitetura de *Event-Driven Broadcast*, permitindo a troca de mensagens instantâneas e bidirecionais entre múltiplos clientes simultâneos sem overhead ou polling HTTP.

---

## 🚀 Tecnologias e Funcionalidades

### Backend
- **Node.js (v22+)**: Uso de recursos modernos de runtime.
- **Native Type Stripping**: Execução direta de arquivos `.ts` via `--experimental-strip-types` sem a necessidade de compiladores externos pesados em desenvolvimento.
- **TypeScript & NodeNext Módulo Resolution**: Configuração estrita de layout de tipos alinhada com os padrões modernos da comunidade.
- **WS Library**: Engine leve e purista de WebSockets acoplada nativamente ao servidor HTTP do Node.js.
- **Express**: Utilizado exclusivamente para rotas HTTP de verificação de integridade e infraestrutura.

### Frontend
- **Vanilla Architecture**: HTML5 estrutural e CSS3 moderno e responsivo com suporte a scroll inteligente automatizado.
- **Browser WebSocket API**: Consumo nativo da API de comunicação bidirecional do navegador, eliminando dependências ou bibliotecas de terceiros.
- **Dynamic Session Handling**: Interface de entrada para definição de apelido dinâmico por sessão do usuário.

---

## 📂 Estrutura do Projeto

```text
back-websocket/
├── dist/                  # Arquivos JavaScript compilados para produção
├── src/
│   ├── app.ts             # Inicialização do Express e Rotas HTTP
│   └── server.ts          # Inicialização do Servidor HTTP, WebSocket e Regras de Broadcast
├── index.html             # Interface do Usuário (Client Chat)
├── style.css              # Estilização do Chat & Login
├── package.json           # Dependências e Scripts do Projeto
└── tsconfig.json          # Configurações estritas do compilador TypeScript
```

---

## 🔧 Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org) versão **22.0.0** ou superior.
- Um gerenciador de pacotes (npm já incluso no Node).

---

## 📦 Instalação e Inicialização

### 1. Clonar o repositório e instalar dependências
No diretório do projeto, execute o comando abaixo para instalar as bibliotecas do servidor:
```bash
npm install
```

### 2. Executar em Ambiente de Desenvolvimento (Live Reload)
Para iniciar o servidor local com o `nodemon` assistindo e aplicando suas alterações no código TypeScript em tempo real:
```bash
npm run dev
```
*O console exibirá: `Servidor HTTP e WebSocket rodando na porta 3000`*

### 3. Compilação e Execução em Produção
Se desejar gerar a pasta de distribuição otimizada (`dist`) e rodar o servidor simulando o ambiente de produção:
```bash
# Compilar TypeScript para JavaScript (CommonJS/NodeNext)
npm run build

# Iniciar o servidor de produção através do código compilado
npm start
```

---

## 💻 Como Testar o Chat

1. Certifique-se de que o backend está rodando na porta `3000`.
2. Abra o arquivo `index.html` diretamente em seu navegador (ou utilizando extensões como o *Live Server* do VS Code).
3. Abra uma **segunda aba** ou uma janela anônima com o mesmo arquivo `index.html`.
4. Defina nomes diferentes nas telas de login (Ex: `Ana` na aba 1 e `Carlos` na aba 2).
5. Envie uma mensagem e veja o recebimento imediato ocorrer em formato de *Broadcast* na aba oposta!

---

## 📡 Protocolo de Comunicação (Payload JSON)

Para garantir flexibilidade e escalabilidade, as mensagens trocadas via WebSocket trafegam no formato de string JSON contendo tipos de eventos explícitos:

**Estrutura enviada pelo Cliente:**
```json
{
  "event": "message",
  "data": {
    "user": "Nome do Usuário",
    "text": "Conteúdo da mensagem de texto"
  }
}
```

**Estrutura transmitida pelo Servidor (Broadcast):**
```json
{
  "event": "new_message",
  "data": {
    "user": "Nome do Remetente",
    "text": "Conteúdo da mensagem de texto"
  }
}
```

---

## 📝 Licença

Este projeto está sob a licença **ISC**. Sinta-se livre para clonar, estudar e aprimorar a arquitetura!
