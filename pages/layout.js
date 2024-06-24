import { Inter } from 'next/font/google';
import React, { Suspense } from 'react';
import Loading from './Loading';
import Header from 'components/Header/Header';
import Footer from 'shared/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

 const metadata = {
  title: 'Electronic Shop E-commerce',
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

/**
 * RootLayout component that provides the main structure of the application.
 * It wraps the entire application with the CartProvider to make the cart context
 * available throughout the component tree.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      
          <Header />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
          <Footer />
        
      </body>
    </html>
  );
}
