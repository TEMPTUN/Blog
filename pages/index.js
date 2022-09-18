import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import '../firebaseConfig'
import Homes from './home'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PenDiaries</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      </Head>
      <main className='m-0'>
        <Homes/>
      </main>
      

      <footer className={styles.footer}>
        <h3 className='text-3xl font-extralight'>By Pen Diaries</h3>
      </footer>
    </div>
  )
}
