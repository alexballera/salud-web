import { Box } from '@material-ui/core'
import React from 'react'
import Navbar from '../Navbar'

export default function Layout({ children }: any): JSX.Element {
  return (
    <>
      <Navbar />
      <Box component="main">{children}</Box>
    </>
  )
}
