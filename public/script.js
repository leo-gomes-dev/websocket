let meuNome = "";

// Conecta nativamente ao seu servidor backend
const socket = new WebSocket("ws://localhost:3000");

const loginContainer = document.getElementById("login-container");
const chatContainer = document.getElementById("chat-container");
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username-input");

const statusEl = document.getElementById("status");
const messagesBox = document.getElementById("messages-box");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");

// Gerencia a tela de login inicial
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  meuNome = usernameInput.value.trim();
  if (!meuNome) return;

  loginContainer.style.display = "none";
  chatContainer.style.display = "flex";
  messageInput.focus();
});

// Atualiza o status visual quando conectar
socket.addEventListener("open", () => {
  statusEl.textContent = "Conectado";
  statusEl.className = "badge online";
  adicionarMensagemSistema("Conexão estabelecida com o servidor.");
});

// Escuta o broadcast vindo do servidor
socket.addEventListener("message", (event) => {
  try {
    const parsed = JSON.parse(event.data);

    if (parsed.event === "new_message") {
      const mensagemFormatada = `<strong>${parsed.data.user}</strong><br>${parsed.data.text}`;
      adicionarMensagemCard(mensagemFormatada, "servidor");
    }
  } catch (error) {
    adicionarMensagemCard(event.data, "servidor");
  }
});

// Trata a queda de conexão
socket.addEventListener("close", () => {
  statusEl.textContent = "Desconectado";
  statusEl.className = "badge offline";
  adicionarMensagemSistema("Conexão com o servidor perdida.");
});

// Envia a mensagem para o servidor
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = messageInput.value.trim();
  if (!texto) return;

  const payload = {
    event: "message",
    data: {
      user: meuNome,
      text: texto,
    },
  };

  // Envia o JSON como string
  socket.send(JSON.stringify(payload));

  // Renderiza o seu próprio balão azul na tela
  adicionarMensagemCard(`Você: ${texto}`, "cliente");

  messageInput.value = "";
  messageInput.focus();
});

// Funções auxiliares para injetar conteúdo na tela
function adicionarMensagemCard(conteudo, remetente) {
  const div = document.createElement("div");
  div.className = `message-card ${remetente}`;
  div.innerHTML = conteudo;
  messagesBox.appendChild(div);
  messagesBox.scrollTop = messagesBox.scrollHeight; // Auto-scroll
}

function adicionarMensagemSistema(texto) {
  const p = document.createElement("p");
  p.className = "system-message";
  p.textContent = texto;
  messagesBox.appendChild(p);
}

console.log("cheguei aqui");
