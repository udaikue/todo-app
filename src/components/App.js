import React, { useRef } from 'react';
import { useTodo } from '../hooks/useTodo';
import "./App.css";

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

const TodoAdd = ({ inputEl, handleAddTodoListItem }) => {
  return (
    <>
      <textarea ref={inputEl} />
      <button onClick={handleAddTodoListItem}>add</button>
    </>
  );
};

function App() {
  const {
    todoList,
    addTodoListItem,
  } = useTodo();

  const inputEl = useRef(null);

  const handleAddTodoListItem = () => {
    if (inputEl.current.value === '') return;

    addTodoListItem(inputEl.current.value);
    inputEl.current.value = '';
  };

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
      <TodoAdd inputEl={inputEl} handleAddTodoListItem={handleAddTodoListItem} />

      <TodoTitle title="Yet" as="h2" />
      <TodoList todoList={inCompletedList} />

      <TodoTitle title="Done" as="h2" />
      <TodoList todoList={completedList} />
    </>
  );
}

export default App;
