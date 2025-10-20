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
		<div>
			<form>
				<input type="text" placeholder="Nome do Filme" value={newMovie.title} onChange={e => setNewMovie({...newMovie, title: e.target.value})} />
				<input type="text" placeholder="Ano do Filme" value={newMovie.year} onChange={e => setNewMovie({...newMovie, year: e.target.value})} />
				<input type="text" placeholder="Género do Filme" value={newMovie.genre} onChange={e => setNewMovie({...newMovie, genre: e.target.value})} />
				<input type="checkbox" checked={newMovie.watched} onChange={e => setNewMovie({...newMovie, watched: e.target.checked})} /> Já Visto
				<input type="text" placeholder="Avaliação do Filme" value={newMovie.rating} onChange={e => setNewMovie({...newMovie, rating: e.target.value})} />
				<button type="button" onClick={adicionarMovies}>Adicionar Filme</button>
			</form>
		</div>
	)
}