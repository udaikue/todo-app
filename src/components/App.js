import React, { useRef } from 'react';
import { useTodo } from '../hooks/useTodo';

import { TodoTitle } from './TodoTitle';
import { TodoAdd } from './TodoAdd';
import { TodoList } from './TodoList';

import "./App.css";

function App() {
  const {
    todoList,
    addTodoListItem,
    toggleTodoListItemStatus,
    deleteTodoListItem,
  } = useTodo();

  const inputEl = useRef(null);

  const handleAddTodoListItem = () => {
    if (inputEl.current.value === '') return;
    addTodoListItem(inputEl.current.value);
    inputEl.current.value = '';
  };

  const inCompletedList = todoList.filter((todo) => {
    return !todo.done;
  });

  const completedList = todoList.filter((todo) => {
    return todo.done;
  });

  return (
    <>
      <TodoTitle title="ToDo List" as="h1" />
      <TodoAdd
        buttonText='add'
        inputEl={inputEl}
        handleAddTodoListItem={handleAddTodoListItem}
      />

      <TodoList
        todoList={inCompletedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
        title='Yet'
        as='h2'
      />

      <TodoList
        todoList={completedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
        title='Done'
        as='h2'
      />
    </>
  );
}

export default App;
