import { useState } from 'react'
import Head from 'next/head'
import Calendar from '../lib/components/calendar'
import styles from '../styles/Home.module.css'

export default function Home() {
    const [taskRegex, setTaskRegex] = useState("")
    const [streak, setStreak] = useState(0)
    const [taskDates, setTaskDates] = useState([])

    async function handleLoadClick() {
        // TODO add try-catch and handle errors
        const path = `/api/taskDates?taskRegex=${taskRegex}`
        const { taskDates, streak } = await fetch(path).then(res => res.json())
        setTaskDates(taskDates)
        setStreak(streak)
    }

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

                <div className={styles.inputSection}>
                    <input className={styles.input}
                        value={taskRegex}
                        onChange={e => setTaskRegex(e.target.value)} />
                    <button type="button" onClick={handleLoadClick}>
                        Load
                    </button>
                </div>

                <div className={styles.results}>
                    <p className={styles.streak}>
                        {/* TODO format for day(s) */}
                        Your current streak for "{taskRegex}" is {streak} days.
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
