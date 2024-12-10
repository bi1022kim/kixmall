'use client';

import { Store } from 'lucide-react';
import Link from 'next/link';
import { AuthButtons } from '@/components/auth/AuthButtons';

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Store className="h-6 w-6" />
          <span className="text-xl font-bold">B2B Mall</span>
        </Link>
        <AuthButtons />
      </div>
    </header>
  );
}