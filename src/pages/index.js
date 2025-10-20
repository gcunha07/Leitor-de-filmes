import { AllMovies } from '@/components/AllMovies';
import { useState } from 'react';
import { AddMovies } from '@/components/AddMovie';
import { EditarMovies } from '@/components/EditMovie';
import Link from 'next/link';

export default function Home() {
  const [addMovie, setAddMovie] = useState(false);

  return (

    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Bem-vindo ao BytesFlix
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Onde avalias os teus filmes da forma que desejas!
      </p>
      <div class="space-x-4 mb-8 flex justify-center gap-4">
        <div>
          <button onClick={() => setAddMovie(true)} className="text-center p-2 bg-blue-500">Adicionar Filme</button>
          {addMovie && <AddMovies onClose={() => setAddMovie(false)} />}
        </div>
      </div>

      <AllMovies />
    </div>

  );
}
