import { useEffect, useState } from 'react'
import { editarMovieAPI } from '../services/api'

export function EditarMovies({ movie, onClose } = {}){
	const [form, setForm] = useState({ title: '', year: '', genre: '', watched: false, rating: '' })

	useEffect(() => { if (movie) setForm({
		title: movie.title || '', year: movie.year || '', genre: movie.genre || '', watched: !!movie.watched, rating: movie.rating || ''
	}) }, [movie])

	async function atualizarMovie() {
		if (!movie || !movie._id) return console.error('ID do filme ausente.')

		const original = { title: movie.title || '', year: movie.year || '', genre: movie.genre || '', watched: !!movie.watched, rating: movie.rating || '' }
		const isDirty = Object.keys(original).some(k => String(original[k]) !== String(form[k]))
		if (!isDirty) return onClose && onClose()

		try { await editarMovieAPI(movie._id, form); onClose && onClose() } catch (err) { console.error('Erro ao editar filme!', err) }
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
			<div className="p-6 border rounded bg-white w-full max-w-lg">
				<h2 className="text-xl font-semibold mb-4">Editar Filme</h2>
				<form onSubmit={e => e.preventDefault()}>
					<input className="w-full mb-2" type="text" placeholder="Nome do Filme" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
					<input className="w-full mb-2" type="text" placeholder="Ano do Filme" value={form.year} onChange={e => setForm({...form, year: e.target.value})} />
					<input className="w-full mb-2" type="text" placeholder="Género do Filme" value={form.genre} onChange={e => setForm({...form, genre: e.target.value})} />
					<label className="block mb-2"><input type="checkbox" checked={form.watched} onChange={e => setForm({...form, watched: e.target.checked})} /> <span className="ml-2">Já Visto</span></label>
					<input className="w-full mb-4" type="text" placeholder="Avaliação do Filme" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} />
					<div className="flex justify-end">
						<button type="button" onClick={() => onClose && onClose()} className="mr-2">Cancelar</button>
						<button type="button" onClick={atualizarMovie} className="bg-blue-600 text-white px-3 py-1 rounded">Atualizar Filme</button>
					</div>
				</form>
			</div>
		</div>
	)
}
