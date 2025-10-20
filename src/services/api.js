// Cliente API wrapper padronizado para /api/movies
export async function carregarMoviesAPI() {
  try {
    const response = await fetch('/api/movies')
    if (!response.ok) throw new Error('Erro ao carregar os filmes')
    return await response.json()
  } catch (error) {
    console.error('Erro ao carregar os filmes:', error)
    throw error
  }
}

export async function carregarMoviePorIdAPI(id) {
  try {
    const response = await fetch(`/api/movies/${id}`)
    if (!response.ok) throw new Error('Erro ao carregar filme')
    return await response.json()
  } catch (error) {
    console.error('Erro ao carregar filme:', error)
    throw error
  }
}

export async function adicionarMovieAPI(dadosMovie) {
  try {
    const response = await fetch('/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosMovie)
    })
    if (!response.ok) throw new Error('Erro ao adicionar filme')
    return await response.json()
  } catch (error) {
    console.error('Erro ao adicionar filme:', error)
    throw error
  }
}

export async function editarMovieAPI(id, dadosMovie) {
  try {
    const response = await fetch(`/api/movies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosMovie)
    })
    if (!response.ok) throw new Error('Erro ao atualizar filme')
    return await response.json()
  } catch (error) {
    console.error('Erro ao atualizar filme:', error)
    throw error
  }
}

export async function eliminarMovieAPI(id) {
  try {
    const response = await fetch(`/api/movies/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Erro ao eliminar filme')
    return true
  } catch (error) {
    console.error('Erro ao eliminar filme:', error)
    throw error
  }
}
