import osa from "osa2"

const MS_PER_DAY = 24 * 60 * 60 * 1000

function getStreak(taskDates) {
    const sortedDates = taskDates.map(d => new Date(d)).sort((a, b) => a - b)
    let prevDate = sortedDates.pop()
    const today = new Date()
    prevDate?.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)
    // Give a streak of 0 if the task is missing from both today and yesterday.
    if (today - prevDate > MS_PER_DAY) return 0

    let streak = 1
    let curDate = prevDate
    prevDate = sortedDates.pop()
    prevDate?.setHours(0, 0, 0, 0)
    while (curDate - prevDate <= MS_PER_DAY) {
        // Increment the streak for consecutive days
        // Continue without incrementing for multiple completions in the same day
        if (curDate - prevDate === MS_PER_DAY) streak += 1
        curDate = prevDate
        prevDate = sortedDates.pop()
        if (!prevDate) streak = `${streak}+`
        prevDate?.setHours(0, 0, 0, 0)
    }
    return streak
}

export default async (req, res) => {
     if (req.method !== "GET") return res.status(405).end() // Method not allowed
     /* In a typical web application, we'd interact with a SQL or NoSQL
      * database here via ORM. In this case, I want to access my local
      * OmniFocus database - this can be done using Apple's built-in
      * Javascript automation support. */
     const getCompletionDates = osa(matchString => {
         const regex = new RegExp(matchString || "")
         return Application("OmniFocus").defaultDocument.flattenedTasks()
            .filter(t => t.completed() && regex.test(t.name().toLowerCase()))
            .map(t => t.completionDate().toISOString())
     })
     const taskDates = await getCompletionDates(req.query.taskRegex.toLowerCase())
     return res.status(200).send({taskDates, streak: getStreak(taskDates)})
}
