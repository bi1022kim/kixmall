'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" asChild>
        <Link href="/auth/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/register">Register</Link>
      </Button>
    </div>
  );
}