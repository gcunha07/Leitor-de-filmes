import { useEffect, useState } from 'react'
import {carregarMoviesAPI, eliminarMovieAPI} from '../services/api'
import { EditarMovies } from './EditMovie'

export function AllMovies(){
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

	return (
		<div>
			<h1>Filmes:</h1>
			{editing && <EditarMovies movie={editing} onClose={() => { setEditing(null); carregarMovies() }} />}
			<ul>
			{movies.map(movie=> (
				<li key={movie._id} className="mb-2">
					<strong>{movie.title}</strong> ({movie.year}) - {movie.genre} - {movie.rating}
					<button className="ml-2 text-sm text-blue-600" onClick={() => setEditing(movie)}>Editar</button>
					<button className="ml-2 text-sm text-red-600" onClick={() => handleDelete(movie._id)}>Eliminar</button>
				</li>
			))}
			</ul>
		</div>
	)
}