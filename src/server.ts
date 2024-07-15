import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());

interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [];
let nextId = 1;

app.post("/users", (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).send("Name and email are required");
  }
  const newUser: User = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json({ data: newUser });
});

// Get users
app.get("/users", (req: Request, res: Response) => {
  res.json({ data: users });
});

// Get user
app.get("/users/:id", (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json({ data: user });
});

// Update user information
app.patch("/users/:id", (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  if (name) user.name = name;
  if (email) user.email = email;
  res.json({ data: user });
});

// Delete user
app.delete("/users/:id", (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  users = users.filter((u) => u.id !== userId);
  res.status(204).send({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
