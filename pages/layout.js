import { Inter } from 'next/font/google';
import React, { Suspense } from 'react';
import Loading from './Loading';
import Header from 'components/Header/Header';
import Footer from 'shared/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });
/**
 * RootLayout component that provides the main structure of the application.
 * It wraps the entire application with the CartProvider to make the cart context
 * available throughout the component tree.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-[#f2f2f2] '>
        <Header />
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
