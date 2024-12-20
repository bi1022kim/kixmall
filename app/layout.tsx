import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { AuthProvider } from '@/lib/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'B2B Shopping Mall',
  description: 'Your trusted B2B marketplace for wholesale products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}