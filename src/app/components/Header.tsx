'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            TOLOCO
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              href={isHomePage ? "#solutions" : "/#solutions"} 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Giải Pháp
            </Link>
            <Link 
              href={isHomePage ? "#about" : "/#about"} 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Về Chúng Tôi
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Liên Hệ
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              href="/contact"
              className="hidden md:inline-flex bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tư Vấn Miễn Phí
            </Link>
            <button className="md:hidden text-gray-600 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 