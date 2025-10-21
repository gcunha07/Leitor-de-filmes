import { useEffect, useState } from 'react'
import { carregarMoviesAPI } from '../services/api'

export function MoviesByRating(){
  const [movies, setMovies] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load(){
      try{
        const data = await carregarMoviesAPI()
        if (!mounted) return
        const sorted = (data || []).slice().sort((a,b) => {
          const ra = Number(a.rating) || 0
          const rb = Number(b.rating) || 0
          return rb - ra // descendente
        })
        setMovies(sorted)
      }catch(err){
        console.error('Erro ao carregar filmes por rating', err)
        if (mounted) setMovies([])
      }finally{
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  if (loading) return <div>Carregando filmes por rating...</div>
  if (!movies || movies.length === 0) return <div>Nenhum filme encontrado.</div>

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Filmes por Rating (maior → menor)</h3>
      <ul>
        {movies.map(m => (
          <li key={m._id} className="mb-2">
            <strong>{m.title}</strong> — {m.rating ?? 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MoviesByRating
