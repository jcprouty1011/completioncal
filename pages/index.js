import { useState } from 'react'
import Head from 'next/head'
import Calendar from '../lib/components/calendar'
import styles from '../styles/Home.module.css'

export default function Home() {
    const [taskRegexp, setTaskRegexp] = useState("")
    const [streak, setStreak] = useState(0)
    return (
        <div className={styles.container}>
            <Head>
                <title>Completion Cal</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Enter a regular expression matching the tasks to visualize.
                </h1>

                <input className={styles.input}
                    value={taskRegexp}
                    onChange={e => setTaskRegexp(e.target.value)} />

                <div className={styles.results}>
                    <p className={styles.streak}>
                        Your current streak for "{taskRegexp}" is {streak} days.
                    </p>
                    <Calendar />
                </div>
            </main>

            <footer className={styles.footer}>
                <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer">
                    Powered by{' '}
                    <img src="/vercel.svg"
                        alt="Vercel Logo"
                        className={styles.logo} />
                </a>
            </footer>
        </div>
    )
}
