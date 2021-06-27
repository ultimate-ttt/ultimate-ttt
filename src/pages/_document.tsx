import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Play Ultimate Tic-Tac-Toe in the browser." />
          <link rel="manifest" href={`${process.env.PUBLIC_URL}/manifest.json`} />
          <link rel="apple-touch-icon" sizes="180x180" href={`${process.env.PUBLIC_URL}/apple-touch-icon.png`} />
          <link rel="icon" type="image/png" sizes="32x32" href={`${process.env.PUBLIC_URL}/favicon-32x32.png`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`${process.env.PUBLIC_URL}/favicon-16x16.png`} />
          <link rel="mask-icon" href={`${process.env.PUBLIC_URL}/safari-pinned-tab.svg`} color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#2d89ef" />
          <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
        </Head>
        
        <body>
          <Main />
          <NextScript />
          
        </body>
      </Html>
    )
  }
}

export default MyDocument      
