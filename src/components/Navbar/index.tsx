import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

/// MATERIAL UI
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
/// MATERIAL UI END

/// STYLES & TYPES
import styles from './styles.module.scss'
import { withAppContext } from '../../context'
/// STYLES & TYPES END

function Navbar({ loggedIn }: { loggedIn: boolean }): JSX.Element {
  const router = useRouter()

  const _drawAction = () => {
    if (!loggedIn) {
      if (router?.pathname === '/login' || router?.pathname === '/signup') {
        return <></>
      } else {
        return (
          <Link href="login">
            <Button color="inherit">INGRESAR</Button>
          </Link>
        )
      }
    } else {
      return <></>
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

export default withAppContext(Navbar)
