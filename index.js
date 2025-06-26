const express = require('express');
 
const app = express();
 
const PORT = 3001;
 
app.use(express.json());
 
// startar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
 
// Array de livros
 
let livros = [
  { id: 1, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien" },
    { id: 2, titulo: "Teste1", autor: "teste-autor1" },
    { id: 3, titulo: "Teste1", autor: "teste-autor2" },
];
 
app.get('/', (req, res) => {
  res.send(`
    <h1>Bem-vindo à API de Biblioteca!</h1>
    <ul>
      <li>Use <code>/livros</code> para acessar os livros disponíveis.</li>
      <li>Use <code>/livros/:id</code> para acessar um livro específico.</li>
    </ul>
  `);
});
   
// ver os livros
app.get('/livros', (req, res) => {
  res.json(livros);
});
 
// ver livro por id
app.get('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const livro = livros.find(l => l.id === id);
 
  if (!livro) {
    return res.status(404).json({ error: 'Livro não encontrado' });
  }
 
  res.json(livro);
});
 
// adicionar livro
app.post('/livros', (req, res) => {
  const { titulo, autor } = req.body;
 
  if (!titulo || !autor) {
    return res.status(400).json({ error: 'Título e autor são obrigatórios' });
  }
 
  const novoLivro = {
    id: livros.length + 1,
    titulo,
    autor
  };
 
  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});
 
// atualizar livro
app.put('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, autor } = req.body;
 
  const livroIndex = livros.findIndex(l => l.id === id);
 
  if (livroIndex === -1) {
    return res.status(404).json({ error: 'Livro não encontrado' });
  }
 
  if (!titulo || !autor) {
    return res.status(400).json({ error: 'Título e autor são obrigatórios' });
  }
 
  livros[livroIndex] = { id, titulo, autor };
  res.json(livros[livroIndex]);
});
 
// deletar livro
app.delete('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
 
  const livroIndex = livros.findIndex(l => l.id === id);
 
  if (livroIndex === -1) {
    return res.status(404).json({ error: 'Livro não encontrado' });
  }
 
  livros.splice(livroIndex, 1);
  res.status(204).send();
});