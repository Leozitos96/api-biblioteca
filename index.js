const express = require('express');
 
const app = express();
 
const PORT = 3001;
 
app.use(express.json());
 
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
 
let livros = [
  { id: 1, titulo: "A Máquina do Tempo", autor: "H.G. Wells" },
  { id: 2, titulo: "A Biblioteca Invisível", autor: "Genevieve Cogman" },
  { id: 3, titulo: "O Código da Vinci", autor: "Dan Brown" },
  { id: 4, titulo: "Neuromancer", autor: "William Gibson" },
  { id: 5, titulo: "As Crônicas Marcianas", autor: "Ray Bradbury" },
];

 
app.get('/', (req, res) => {
  res.send(`
    <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 20px;
    }
    h1 {
      position: absolute;
      top: 20px; 
      left: 50%;
      transform: translateX(-50%);
      color: #2c3e50;
      margin: 0;
    }
    ul {
      margin-top: 50px;
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 0 5px rgba(0,0,0,0.1);
    }
    li {
      margin-left: 20px;
      margin-bottom: 8px;
    }
    code {
      background: #eee;
      padding: 2px 5px;
      border-radius: 4px;
    }
    </style>
    <h1>API Biblioteca!</h1>
    <ul>
      <li>rota <code>/livros</code> <strong>para listar todos os livros</strong></li>
      <li>rota <code>/livros/:id</code> <strong>para listar um livro específico</strong></li>
      <li>rota <code>/livros</code> <strong>para adicionar um novo livro</strong></li>
      <li>rota <code>/livros/:id</code> <strong>para editar um livro</strong></li>
      <li>rota <code>/livros/:id</code> <strong>para deletar um livro</strong></li>
    </ul>
  `);
});
   
app.get('/livros', (req, res) => {
  res.json(livros);
});
 
app.get('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const livro = livros.find(l => l.id === id);
 
  if (!livro) {
    return res.status(404).json({ error: 'Livro não encontrado' });
  }
 
  res.json(livro);
});
 

app.post('/livros', (req, res) => {
   const { titulo , autor } = req.body;
 
    if (!titulo || !autor) {
      return res.status(400).json({ error: "Título e autor são obrigatórios" });
    }
 
  const novoLivro = {id: livros.length + 1, titulo, autor}
 
  livros.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

 
app.put('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, autor } = req.body;

  const livro = livros.findIndex(l => l.id === id);
 
  if (!livro) {
    return res.status(404).json({ error: 'Livro não encontrado' });
  }
 
  if (!titulo || !autor) {
    return res.status(400).json({ error: 'Título e autor são obrigatórios' });
  }else{
    livro.titulo = titulo;
    livro.autor = autor;
  }
 
  res.json(livros[livro]);
});
 
app.delete('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
 
  const livro = livros.findIndex(l => l.id === id);
 
  if (!livro) {
    return res.status(404).json({ error: 'Livro não encontrado' });
  }
 
  livros = livros.filter(livro => livro.id != id);
  res.status(204).send();
});