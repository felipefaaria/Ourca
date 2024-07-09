const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());
app.use(cors());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Rota para obter eventos
app.get('/events', (req, res) => {
  fs.readFile(path.join(__dirname, 'events.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao ler os eventos' });
    }
    res.json(JSON.parse(data));
  });
});

// Rota para salvar eventos
app.post('/events', (req, res) => {
  const events = req.body;

  fs.writeFile(path.join(__dirname, 'events.json'), JSON.stringify(events, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao salvar os eventos' });
    }
    res.status(200).json({ message: 'Eventos salvos com sucesso' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
