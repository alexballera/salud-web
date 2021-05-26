import * as React from 'react'
import { NextPage } from 'next/types'

/// MATERIAL UI
import Button from '@material-ui/core/Button'
/// MATERIAL UI END

/// STYLES & TYPES
import styles from '../styles/Home.module.scss'
/// STYLES & TYPES END

const HomePage: NextPage = (): JSX.Element => {
  return (
    <div className={styles.container}>
      Hello Next.js
      <div className="row">
        <div className="col-md-4">A</div>
        <div className="col-md-4">B</div>
        <Button color="primary" variant="contained">
          My App
        </Button>
      </div>
    </div>
  )
}

export default HomePage
