import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import Link from 'next/link'
import styles from '../../styles/Navbar.module.scss'
import { useRouter } from 'next/dist/client/router'

export default function Navbar(): JSX.Element {
  const router = useRouter()

  const _drawAction = () => {
    if (router?.pathname === '/login' || router?.pathname === '/signup') {
      return <></>
    } else {
      return (
        <Link href="login">
          <Button color="inherit">INGRESAR</Button>
        </Link>
      )
    }
  }

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6">OMNiSalud</Typography>
        {_drawAction()}
      </Toolbar>
    </AppBar>
  )
}
