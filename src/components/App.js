import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const todoDataUrl = "http://localhost:3100/todos";

const TodoTitle = ({ title, as }) => {
  if (as === 'h1') return <h1>{title}</h1>;
  if (as === 'h2') return <h2>{title}</h2>;
  return <p>{title}</p>;
};

const TodoItem = ({ todo }) => {
  return (
    <li>
      {todo.content}
      <button>{todo.done ? "to Yet" : "to Done"}</button>
      <button>Delete</button>
    </li>
  );
};

const TodoList = ({ todoList }) => {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};

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
      <TodoTitle title="ToDo List" as="h1" />
      <textarea />

      <button>add</button>

      <TodoTitle title="Yet" as="h2" />
      <TodoList todoList={inCompletedList} />

      <TodoTitle title="Done" as="h2" />
      <TodoList todoList={completedList} />
    </>
  );
}

export default App;
