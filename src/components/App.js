import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const todoDataUrl = "http://localhost:3100/todos";

function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(todoDataUrl);
      setTodoList(response.data);
    };
    fetchData();
  }, []);

  console.log("ToDoリスト:", todoList);

  const inCompletedList = todoList.filter((todo) => {
    return !todo.done;
  });

  console.log("未完了:", inCompletedList);

  const completedList = todoList.filter((todo) => {
    return todo.done;
  });

  console.log("完了:", completedList);

  return (
    <>
      <h1>ToDo List</h1>
      <textarea />

      <button>add</button>

      <h2>Yet</h2>
      <ul>
        {inCompletedList.map(todo => (
          <li key={todo.id}>
            {todo.content}

            <button>{todo.done ? "to Yet" : "to Done"}</button>

            <button>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Done</h2>
      <ul>
        {completedList.map(todo => (
          <li key={todo.id}>
            {todo.content}

            <button>{todo.done ? "to Yet" : "to Done"}</button>

            <button>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
