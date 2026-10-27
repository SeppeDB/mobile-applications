import { ScrollViewStyleReset, useServerDocumentContext } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

const base = '/mobile-applications';

const registerServiceWorker = `
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('${base}/sw.js', { scope: '${base}/' });
    });
  }
`;

export default function Root({ children }: PropsWithChildren) {
  const { htmlAttributes, bodyAttributes, headNodes, bodyNodes } = useServerDocumentContext();

  return (
    <html lang="en" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Movie Night</title>
        <ScrollViewStyleReset />

        <link rel="manifest" href={`${base}/manifest.json`} />
        <meta name="theme-color" content="#0F0F14" />
        <link rel="apple-touch-icon" href={`${base}/icons/icon-192.png`} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Movie Night" />

        <style>{'body { background-color: #0F0F14; }'}</style>
        <script dangerouslySetInnerHTML={{ __html: registerServiceWorker }} />
        {headNodes}
      </head>
      <body {...bodyAttributes}>
        {children}
        {bodyNodes}
      </body>
    </html>
  );
}
