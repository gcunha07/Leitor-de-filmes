import Link from 'next/link';

export default function Home() {
  return (

    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Bem-vindo ao BytesFlix
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Onde avalias os teus filmes da forma que desejas!
      </p>
      <div> 
        <button onClick={'/filmes'} className="text-cente bg-black">Adicionar Lista</button>
        
      </div>
    </div>

  );
}
