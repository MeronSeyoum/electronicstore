import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import "./globals.css";

import { userService } from "services";
import { Alert } from "components";
import Header from "components/Header/Header";
import Loading from "./Loading";
import Footer from "shared/Footer/Footer";
import { CartProvider } from "context/cartContext";
import Head from "next/head";


export const meta_Data = {
  title: 'Electronic Shop E-commerce Site',
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
}




export default App;

function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    setUser(userService.userValue);
    const publicPaths = [
      '/',
      '/account/login',
      '/account/register',
      '/account/reset-password',
      '/account/confirm-account',
      '/forgot-pass',
      '/productsCollection',
      '/cart',
      '/contact',
      '/faqs',
      '/products/*',
      '/Search*',
    ];


    const path = url.split("?")[0];

    const isPublicPath = publicPaths.some(publicPath => {
      if (publicPath.endsWith('*')) {
        const basePath = publicPath.slice(0, -1); // Remove the wildcard character
        return path.startsWith(basePath); // Check if the path starts with the base path
      } else {
        return path === publicPath;
      }
    })

    if (!userService.userValue && !isPublicPath) {
      setAuthorized(false);
      router.push({
        pathname: '/account/login',
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }

  return (
    <>
      <Head>
        <title>{meta_Data.title}</title>
        {meta_Data.icons.map((icon, index) => (
          <link key={index} rel={icon.rel} href={icon.url} type={icon.type} sizes={icon.sizes} />
        ))}
      </Head>
      <CartProvider>
        <Header />
        <Suspense fallback={<Loading />}>
          <Alert />
          {authorized && <Component {...pageProps} />}
        </Suspense>
        <Footer />
      </CartProvider>
    </>
  );
}
