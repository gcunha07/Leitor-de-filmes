import { useEffect, useState } from 'react'
import {adicionarMovieAPI} from '../services/api'

export function AddMovies({ onClose } = {}){
	// iniciar como objeto para evitar acesso a propriedades de string
	const [newMovie, setNewMovie] = useState({ title: '', year: '', genre: '', watched: false, rating: '' })

	async function adicionarMovies() {
		try{
			await adicionarMovieAPI(newMovie)
			setNewMovie({ title: '', year: '', genre: '', watched: false, rating: '' })
			if (typeof onClose === 'function') onClose()
		}
		catch (err){
			console.error('Erro ao carregar filme!',err)
		}
	}

	return (
		// Overlay/modal wrapper to keep the panel centered and prevent overflow
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-20">
			<div className="w-full max-w-xs mx-4 rounded-2xl bg-slate-900 text-white p-4 relative">
				<button aria-label="Fechar" onClick={() => onClose && onClose()} className="cursor-pointer absolute top-3 right-3 text-white bg-transparent hover:text-gray-300">✕</button>
				<form onSubmit={e => e.preventDefault()}>
								<input className="bg-slate-800 text-white placeholder-gray-400 w-full rounded-lg border border-gray-600 px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" type="text" placeholder="Nome do Filme" value={newMovie.title} onChange={e => setNewMovie({...newMovie, title: e.target.value})}  />
								<input className="bg-slate-800 text-white placeholder-gray-400 w-full rounded-lg border border-gray-600 px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" type="number" placeholder="Ano do Filme" value={newMovie.year} onChange={e => setNewMovie({...newMovie, year: e.target.value})} min="1960" max="2025"/>
												<label className="sr-only">Género do Filme</label>
												<select className="bg-slate-800 text-white placeholder-gray-400 w-full rounded-lg border border-gray-600 px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" value={newMovie.genre} onChange={e => setNewMovie({...newMovie, genre: e.target.value})}>
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
								<label className="flex items-center mb-3 text-white">
									<input className="h-5 w-5 mr-2 rounded border-gray-500 bg-white/5" type="checkbox" checked={newMovie.watched} onChange={e => setNewMovie({...newMovie, watched: e.target.checked})} />
									Já Visto
								</label>
								<input className="bg-slate-800 text-white placeholder-gray-400 w-full rounded-lg border border-gray-600 px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" type="number" placeholder="Avaliação do Filme" value={newMovie.rating} onChange={e => setNewMovie({...newMovie, rating: e.target.value})} min="1" max="10"/>
								<div className="text-center">
									<button className="cursor-pointer inline-block cursor-pointer rounded-md bg-gray-700 px-6 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95" type="button" onClick={adicionarMovies}>Adicionar Filme</button>
								</div>
				</form>
			</div>
		</div>
	)
}