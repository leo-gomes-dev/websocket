import { createServer } from "node:http";
import { WebSocket, WebSocketServer } from "ws";

import app from "./app.js";
const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws: WebSocket) => {
  console.log("Cliente conectado!");

  ws.on("message", (rawData) => {
    try {
      const textMessage = rawData.toString("utf-8");
      const parsedData = JSON.parse(textMessage);

      // Se for um evento de mensagem, fazemos o Broadcast
      if (parsedData.event === "message") {
        // Monta o pacote que será enviado para os outros usuários
        const payloadParaEnvio = JSON.stringify({
          event: "new_message",
          data: {
            user: parsedData.data.user || "Anônimo",
            text: parsedData.data.text || "",
          },
        });

        // LOOP DE BROADCAST: Percorre todos os clientes conectados no servidor
        wss.clients.forEach((client) => {
          // Verifica se o cliente está com a conexão aberta E se não é quem enviou
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(payloadParaEnvio);
          }
        });
      }
    } catch (error) {
      console.error("Erro no processamento:", error);
    }
  });

  ws.on("close", () => console.log("Cliente desconectado"));
});

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
