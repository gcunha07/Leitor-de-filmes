import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const isActive = (path) => router.pathname === path;

  return (
    <nav className="bg-slate-900 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-400">BytesFlix</Link>

    </nav>
  );
}
