import Link from 'next/link';

export default function Home() {
  return (

    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Bem-vindo ao BytesFlix
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Onde todos os filmes estão na tua posse
      </p>
      <div> 
        <button >Adicionar Lista</button>
      </div>
    </div>

  );
}
