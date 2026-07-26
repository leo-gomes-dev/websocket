import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/status", (req, res) => {
  res.json({ ok: true });
});

export default app;
