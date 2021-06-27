import '../index.css'
import '@material/button/dist/mdc.button.min.css'
import '@material/card/dist/mdc.card.css'
import '@material/dialog/dist/mdc.dialog.css'
import '@material/drawer/dist/mdc.drawer.css'
import '@material/icon-button/dist/mdc.icon-button.css'
import '@material/list/dist/mdc.list.css'
import '@material/ripple/dist/mdc.ripple.css'
import '@material/theme/dist/mdc.theme.css'
import '@material/top-app-bar/dist/mdc.top-app-bar.css'
import '@material/typography/dist/mdc.typography.css'
import '@rmwc/icon/icon.css'
import '@rmwc/theme/theme.css'
import Head from 'next/head'

export default function MyApp({ Component, pageProps}) {
  return (
    <>
      <Head>
        <title>Ultimate Tic-Tac-Toe</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      
      <Component {...pageProps} />
    </>
  )
}
