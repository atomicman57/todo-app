import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";

type Task = {
  id?: number;
  name: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Task[]>([]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const task: Task = {
      name: e.target.name.value,
      completed: false,
    };
    e.target.name.value = "";

    // TODO: Write to the database and update the list of todos
    console.log(task);
  };

  const getTasks = async () => {
    return fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((res) => res.tasks);
  };

  useEffect(() => {
    getTasks().then(setTodos);
  }, []);

  return (
    <Container>
      <ul>
        {todos.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} method="post">
        <input name="name" type="text" />
        <input type="submit" value="Add an Item" />
      </form>
    </Container>
  );
}

export default App;
