import { AllMovies } from '@/components/AllMovies';
import { useState } from 'react';
import { AddMovies } from '@/components/AddMovie';
import { EditarMovies } from '@/components/EditMovie';
import { useRouter } from 'next/router';

export default function Home() {
  const [addMovie, setAddMovie] = useState(false);
  const router = useRouter();
  const [filter, setFilter] = useState('')

  return (

    <div className="text-center bg-oklch(37.2% 0.044 257.287)  flex flex-col py-15 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Bem-vindo ao BytesFlix
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Onde avalias os teus filmes da forma que desejas!
      </p>
      <div className="space-x-4 mb-8 flex justify-center gap-4 text-white rounded">
        <div>
          <button onClick={() => setAddMovie(true)} className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">Adicionar Filme</button>
          {addMovie && <AddMovies onClose={() => setAddMovie(false)} />}
        </div>
        <div>
          <select id="movie-filter" className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]" onChange={e => setFilter(e.target.value)} value={filter}>
            <option value="">Ordenar / Filtrar</option>
            <option value="rating">Por rating</option>
            <option value="watched">Visto</option>
            <option value="not-watched">Não visto</option>
          </select>
        </div>
      </div>

      <AllMovies filter={filter} />

    </div>
  );
}
