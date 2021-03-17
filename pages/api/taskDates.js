import osa from "osa2"

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
     return res.status(200).send({taskDates})
}
