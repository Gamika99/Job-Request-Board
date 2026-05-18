'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-xl font-bold">
                        Job Request Board
                    </Link>
                    <div className="space-x-4">
                        <Link
                            href="/"
                            className={`hover:bg-blue-700 px-3 py-2 rounded ${pathname === '/' ? 'bg-blue-700' : ''}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/new-job"
                            className={`hover:bg-blue-700 px-3 py-2 rounded ${pathname === '/new-job' ? 'bg-blue-700' : ''}`}
                        >
                            Post New Job
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}