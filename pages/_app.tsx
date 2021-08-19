import * as React from 'react'

import '../src/styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.css'

type IProps = {
  Component: any
  pageProps: unknown
}

function MyApp({ Component, pageProps }: IProps): JSX.Element {
  return <Component {...pageProps} />
}

export default MyApp
