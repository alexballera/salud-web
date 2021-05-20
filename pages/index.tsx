import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container} >
      Hello Next.js
      <div className="row">
        <div className="col-md-4">A</div>
        <div className="col-md-4">B</div>
        <div className="col-md-4">C</div>
      </div>
    </div>
  )
}
