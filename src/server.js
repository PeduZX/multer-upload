const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const db = require('./db_config');

const app = express();
const port = 3000;

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // CB = call back
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Middlewares
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(cors());

// Rota POST para upload
app.post("/uploads", upload.single('arquivo'), (req, res) => {
  const { originalname, filename } = req.file;
  console.log("Arquivo salvo:", filename);

  const sql = 'INSERT INTO imagens (nome_original, nome_arquivo) VALUES (?, ?)';
  db.query(sql, [originalname, filename], (err) => {
    if (err) {
      console.error("Erro ao salvar no banco:", err);
      return res.status(500).json({ erro: 'Erro ao salvar no banco' });
    }
    res.json({ mensagem: 'Upload realizado com sucesso!' });
  });
});

// Rota GET para listar imagens
app.get('/imagens', (req, res) => {
  const sql = 'SELECT * FROM imagens ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar imagens:', err);
      return res.status(500).json({ erro: 'Erro ao buscar imagens' });
    }
    res.json(results);
  });
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
