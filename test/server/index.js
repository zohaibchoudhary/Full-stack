import express from "express"
import cors from "cors"

const port = 5000
const app = express()

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 25,
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    age: 42,
  },
];
app.use(cors())

app.get("/api", (req, res) => {
  res.send(users)
})

app.listen(port, () => {
  console.log(`⚙️  Server is running at port: ${port}`);
})