import { useState } from 'react'
import Head from 'next/head'
import Calendar from '../lib/components/calendar'
import styles from '../styles/Home.module.css'

export default function Home() {
    const [taskRegex, setTaskRegex] = useState("")
    const [streak, setStreak] = useState(0)
    const [taskDates, setTaskDates] = useState()
    const [error, setError] = useState()

    async function handleLoadClick() {
        const path = `/api/taskDates?taskRegex=${taskRegex}`
        try {
            const { taskDates, streak } = await fetch(path)
                .then(res => {
                    if (res.ok) return res.json()
                    throw new Error(`The server sent back a ${res.status} error.`)
                })
            setTaskDates(taskDates)
            setStreak(streak)
        } catch (err) {
            setError(err)
        }

    }

    const streakText = streak === 1 ? '1 day' : `${streak} days`

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

                {error && (
                    <p className={styles.errorMessage}>
                        {error.message}
                    </p>
                )}

                {!error && taskDates && (
                    <div className={styles.results}>
                        <p className={styles.streak}>
                            Your current streak is {streakText}.
                        </p>
                        <Calendar />
                    </div>
                )}
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
