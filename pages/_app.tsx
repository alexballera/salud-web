import React from 'react'
import '../styles/globals.scss'

interface IProps {
  Component: any
  pageProps: unknown
}

function MyApp({ Component, pageProps }: IProps): JSX.Element {
  console.log({ type: typeof Component })

  return <Component {...pageProps} />
}

export default MyApp
