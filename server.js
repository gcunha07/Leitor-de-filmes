const express = require('express');
const next = require('next');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./lib/mongodb');
const Movie = require('./models/Movie');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();



// ===== ROTAS DA API REST =====

// GET /api/produtos - Carregar todos os produtos
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();  // Busca todos os produtos no MongoDB
    res.json(movies);
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// POST /api/produtos - Criar novo produto
app.post('/api/movies', async (req, res) => {
  try {
    const { title, year,genre, watched, rating, createdAt } = req.body;
    
    const novoMovie = new Movie({
      title, year,
      genre,
      watched,
      rating,
      createdAt
    });
    
    const movieSalvo = await novoMovie.save();  // Guarda no MongoDB
    res.status(201).json(movieSalvo);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// PUT /api/movies/:id - Atualizar filme existente
app.put('/api/movies/:id', async (req, res) => {
  try {
    const movieUpdated = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!movieUpdated) return res.status(404).json({ erro: 'Filme não encontrado' });
    res.json(movieUpdated);
  } catch (error) { 
    console.error('Erro ao atualizar o filme:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// DELETE /api/produtos/:id - Eliminar produto
app.delete('/api/movies/:id', async (req, res) => {
  try {
    const movieDeleted = await Movie.findByIdAndDelete(req.params.id);

    if (!movieDeleted) return res.status(404).json({ erro: 'Filme não encontrado' });
    res.json({ mensagem: 'Filme eliminado com sucesso' });
  } catch (error) {
    console.error('Erro ao eliminar filme da lista:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});



// ===== INICIALIZAÇÃO DO SERVIDOR =====

app.use((req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor Next.js + Express a correr em http://localhost:${PORT}`);
  });
});
