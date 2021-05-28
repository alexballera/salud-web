import { Box } from '@material-ui/core'
import React, { PropsWithChildren } from 'react'
import Navbar from '../Navbar'

export default function Layout({
  children
}: PropsWithChildren<void>): JSX.Element {
  return (
    <>
      <Navbar />

      <Box component="main">{children}</Box>
    </>
  )
}
