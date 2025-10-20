import { useState, useEffect } from 'react'
import Link from 'next/link'
import AddFilmes from '@/components/AddFilmes'
import { carregarMoviesAPI, eliminarMoviesAPI } from '@/services/api'

export default function Movies() {
  const [Movie, setMovie] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [movieToEdit, setMovieToEdit] = useState(null)

  useEffect(() => {
    carregarMovies()
  }, [])

  async function carregarMovies() {
    try {
      const data = await carregarMoviesAPI()
      setMovies(data)
    } catch (error) {
      alert('Erro ao carregar filmes')
    }
  }

  async function eliminarMovies(id) {
    if (confirm('Tens a certeza que queres eliminar este filmes?')) {
      try {
        await eliminarMoviesAPI(id)
        setMovies(movie.filter(p => p._id !== id))
      } catch (error) {
        alert('Erro ao eliminar filme')
      }
    }
  }

  function handleEditProduto(movie) {
    setProdutoToEdit(movie)
    setShowEditModal(true)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🧾 Gestão de Wathlist</h1>
          <p className="text-gray-600">Gerencie todas as tuas avaliações </p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
          ➕ Adicionar Filme
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">ID</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Nome</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Preço</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {movie.map(movies => (
              <tr key={movies._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900">{movies._id}</td>
                <td className="py-3 px-4 text-gray-900 font-medium">{movies.nome}</td>
                <td className="py-3 px-4 text-blue-600 font-bold">€{movies.preco}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <Link href={`/produto/${movies._id}`} className="bg-white border border-blue-600 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-50">
                      Ver
                    </Link>
                    <button onClick={() => handleEditMovie(movies)} className="bg-white border border-blue-600 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-50">
                      Editar
                    </button>
                    <button onClick={() => eliminarMovie(movies._id)} className="bg-white border border-blue-600 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-50">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AddFilmes
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={carregarMovies}
      />

    </div>
  )
}
