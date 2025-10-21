import { useEffect, useState } from 'react'
import {carregarMoviesAPI, eliminarMovieAPI} from '../services/api'
import { EditarMovies } from './EditMovie'

export function AllMovies({ filter } = {}){
	const [movies, setMovies] = useState([])
	const [editing, setEditing] = useState(null) // movie object being edited
    
	async function carregarMovies() {
		try{
			const data = await carregarMoviesAPI()
			setMovies(data) 
		}
		catch (err){
			console.error('Erro ao carregar filme!',err)
		}
	}
	useEffect(()=> {
		carregarMovies();
	},[]);

	async function handleDelete(id) {
		try{
			await eliminarMovieAPI(id)
			setMovies(prev => prev.filter(m => m._id !== id))
		} catch (err) {
			console.error('Erro ao eliminar filme', err)
		}
	}

	// derive a displayed list from movies according to filter
	let displayed = (movies || []).slice()
	if (filter === 'rating') {
		displayed.sort((a,b) => (Number(b.rating) || 0) - (Number(a.rating) || 0))
	} else if (filter === 'watched') {
		displayed = displayed.filter(m => !!m.watched)
	} else if (filter === 'not-watched') {
		displayed = displayed.filter(m => !m.watched)
	}

	return (
		<div>
			<h1 className="text-2xl font-bold">Filmes:</h1>
			{editing && <EditarMovies movie={editing} onClose={() => { setEditing(null); carregarMovies() }} />}
			<ul>
			{displayed.map(movie=> (
				<li key={movie._id} className="mb-2">
					<div className="p-4 border rounded bg-white dark:bg-slate-800 text-white" >
						<p><strong>Titulo: </strong> {movie.title}</p>
						<p><strong>Ano: </strong> {movie.year}</p>
						<p><strong>Genero: </strong> {movie.genre}</p>
						<p><strong>Classificação: </strong> {movie.rating}</p>
						<p><strong>Visto: </strong> {movie.watched == true ? "Visto" : "Não visto"}</p>
						<button className="cursor-pointer ml-2 text-sm text-blue-600" onClick={() => setEditing(movie)}>Editar</button>
						<button className="cursor-pointer ml-2 text-sm text-red-600" onClick={() => handleDelete(movie._id)}>Eliminar</button>
					</div>
				</li>
			))}
			</ul>
		</div>
	)
}