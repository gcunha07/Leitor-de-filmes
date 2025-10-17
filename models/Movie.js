const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  watched: { type: Boolean, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, required: true },

}, {
  versionKey: false
});

module.exports = mongoose.models.Produto || mongoose.model('Produto', produtoSchema);


