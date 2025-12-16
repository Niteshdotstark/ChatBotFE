// src/components/NavBar.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function NavBar() {
  const { isLoggedIn, userEmail, logout, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return null;
  }

  const ChatIcon = (
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
    </svg>
  );

  return (
    <header className="bg-white dotstark-shadow sticky top-0 z-40">
      <div className=" px-4 sm:px-3  lg:px-4 ">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link className=" d-flex align-items-center" href="/">
              <div className="w-10 h-10 bg-dotstark-primary rounded-xl flex items-center justify-center me-4">
                {ChatIcon}
              </div>
              <h1 className="text-2xl font-bold text-dotstark-dark font-heading">
                RAG Chat
              </h1>
            </Link>
          </div>
          <div className="d-flex align-items-center justify-content-space-between">
            {isLoggedIn ? (
              <>
                <span className="text-gray-700 text-sm font-medium uppercase tracking-wide">
                  {userEmail}
                </span>
                {/* ADDED Pricing Link */}
                <Link
                  className="text-gray-700 hover:text-dotstark-primary px-4 mx-2 py-2 text-sm font-medium transition-colors uppercase tracking-wide hover-lift"
                  href="/pricing"
                >
                  Pricing
                </Link>
                <Link
                  className="text-gray-700 hover:text-dotstark-primary px-4 mx-2 py-2 text-sm font-medium transition-colors uppercase tracking-wide hover-lift"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="btn-dotstark text-white text-sm px-4 py-2 hover-lift"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* ADDED Pricing Link */}
                <Link
                  className="text-gray-700 hover:text-dotstark-primary px-4 py-2 text-sm font-medium transition-colors uppercase tracking-wide hover-lift"
                  href="/pricing"
                >
                  Pricing
                </Link>
                <Link
                  className="text-gray-700 hover:text-dotstark-primary px-4 py-2 text-sm font-medium transition-colors uppercase tracking-wide hover-lift"
                  href="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn-dotstark text-white text-sm pulse-glow"
                  href="/register"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}