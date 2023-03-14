import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoIndex, setEditTodoIndex] = useState(-1);
  const [editTodoTitle, setEditTodoTitle] = useState('');

  // добавление задачи в список
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { title: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  // удаление задачи из списка
  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setEditTodoIndex(-1);
  };

  // изменение состояния задачи на завершенное или не завершенное
  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  // очистка завершенных задач
  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
    setEditTodoIndex(-1);
  };

  // завершение всех задач
  const completeAll = () => {
    const newTodos = todos.map((todo) => ({ ...todo, completed: true }));
    setTodos(newTodos);
  };

  // сохранение изменений редактируемой задачи
  const saveTodo = () => {
    const newTodos = [...todos];
    newTodos[editTodoIndex].title = editTodoTitle;
    setTodos(newTodos);
    setEditTodoIndex(-1);
  };

  // отмена редактирования задачи
  const cancelEditTodo = () => {
    setEditTodoIndex(-1);
    setEditTodoTitle('');
  };

  // переключение на режим редактирования задачи
  const editTodo = (index) => {
    setEditTodoIndex(index);
    setEditTodoTitle(todos[index].title);
  };

  // отображение списка задач
  const todoList = () => {
    return todos.map((todo, index) => {
      if (editTodoIndex === index) {
        return (
          <li key={index} className="edit">
            <input
              type="text"
              value={editTodoTitle}
              onChange={(event) => setEditTodoTitle(event.target.value)}
            />
            <button onClick={saveTodo}>Сохранить</button>
            <button onClick={cancelEditTodo}>отменить</button>
          </li>
        );
      } else {
        return (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(index)} />
            <span>{todo.title}</span>
            <div className="actions">
              <button onClick={() => editTodo(index)}>Изменить</button>
              <button onClick={() => deleteTodo(index)}>Удалить</button>
            </div>
          </li>
        );
      }
    });
  };

  return (
    <div className="App">
      <h1>Todo-list</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="Введите новую задачу..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">{todoList()}</ul>
      <div className="footer">
        <div className="left">{todos.filter((todo) => !todo.completed).length} tasks left</div>
        <div className="right">
          <button onClick={clearCompleted}>Удалить все завершённые </button>
          <button onClick={completeAll}>Завершить все</button>
        </div>
      </div>
    </div>
  );
}

export default App;
