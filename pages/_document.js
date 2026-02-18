import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to Scene7 CDN for faster image loading */}
        <link rel="preconnect" href="https://assets.burberry.com" />
        <link rel="dns-prefetch" href="https://assets.burberry.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
