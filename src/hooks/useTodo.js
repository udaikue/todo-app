import { useState, useEffect } from 'react';
import { ulid } from 'ulid';
import * as todoData from '../apis/todos';

export const useTodo = () => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    // getAllTodosData() を実行してモックサーバーからTodoデータを取得
    todoData.getAllTodosData().then((todo) => {
      setTodoList([...todo].reverse());
    });
  }, []);

  //
  const toggleTodoListItemStatus = (id, done) => {
    const todoItem = todoList.find((item) => item.id === id);

    // done を反転させる
    const newTodoItem = { ...todoItem, done: !done };

    todoData.updateTodoData(id, newTodoItem).then((updatedTodo) => {
      const newTodoList = todoList.map((item) =>
        // id が異なる場合は todoList から取り出した item をそのまま返す
        // 一致する場合は done を反転させた updatedTodo を返して新しい配列 newTodoList を作成
        item.id !== updatedTodo.id ? item : updatedTodo
      );

      setTodoList(newTodoList);
    });
  };

  const addTodoListItem = (todoContent) => {
    const newTodoItem = {
      content: todoContent,
      id: ulid(),
      done: false
    };

    return todoData.addTodoData(newTodoItem).then((addTodo) => {
      setTodoList([addTodo, ...todoList]);
    });
  };

  const deleteTodoListItem = (id) => {
    todoData.deleteTodoData(id).then((deleteListItemId) => {
      const newTodoList = todoList.filter(
        (item) => item.id !== deleteListItemId
      );

      setTodoList(newTodoList);
    });
  };

  return {
    todoList,
    toggleTodoListItemStatus,
    addTodoListItem,
    deleteTodoListItem
  };
};
