import { useEffect, useState } from "react";
import { editarMovieAPI } from "../services/api";

export function EditarMovies({ movie, onClose } = {}) {
  const [form, setForm] = useState({
    title: "",
    year: "",
    genre: "",
    watched: false,
    rating: "",
  });

  useEffect(() => {
    if (movie)
      setForm({
        title: movie.title || "",
        year: movie.year || "",
        genre: movie.genre || "",
        watched: !!movie.watched,
        rating: movie.rating || "",
      });
  }, [movie]);

  async function atualizarMovie() {
    if (!movie || !movie._id) return console.error("ID do filme ausente.");

    const original = {
      title: movie.title || "",
      year: movie.year || "",
      genre: movie.genre || "",
      watched: !!movie.watched,
      rating: movie.rating || "",
    };
    const isDirty = Object.keys(original).some(
      (k) => String(original[k]) !== String(form[k])
    );
    if (!isDirty) return onClose && onClose();

    try {
      await editarMovieAPI(movie._id, form);
      onClose && onClose();
    } catch (err) {
      console.error("Erro ao editar filme!", err);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-20">
      <div className="w-full max-w-xs mx-4 rounded-2xl bg-slate-900 text-white p-4 relative">
		<button aria-label="Fechar" onClick={() => onClose && onClose()} className="cursor-pointer absolute top-3 right-3 text-white bg-transparent hover:text-gray-300">✕</button>
        <h2 className="text-xl font-semibold mb-4">Editar Filme</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className="bg-slate-800 text-white placeholder-gray-400 w-full rounded-lg border border-gray-600 px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
            type="text"
            placeholder="Nome do Filme"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="bg-slate-800 text-white placeholder-gray-400 w-full rounded-lg border border-gray-600 px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
            type="number"
            placeholder="Ano do Filme"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
			min="1960" max="2025"
          />
          <select
            className="bg-slate-800 text-white placeholder-gray-400 w-full rounded-lg border border-gray-600 px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
          >
            <option value="">Escolha um género</option>
            <option value="Ação">Ação</option>
            <option value="Drama">Drama</option>
            <option value="Comédia">Comédia</option>
            <option value="Romance">Romance</option>
            <option value="Thriller">Thriller</option>
            <option value="Documentário">Documentário</option>
            <option value="Animação">Animação</option>
            <option value="Outro">Outro</option>
          </select>
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={form.watched}
              onChange={(e) => setForm({ ...form, watched: e.target.checked })}
            />{" "}
            <span className="ml-2">Já Visto</span>
          </label>
          <input
            className="bg-slate-800 text-white placeholder-gray-400 w-full rounded-lg border border-gray-600 px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800	4"
            type="text"
            placeholder="Avaliação do Filme"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onClose && onClose()}
              className="mr-2 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={atualizarMovie}
              className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
				border-blue-600
				border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
				active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
              Atualizar Filme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
