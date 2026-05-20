import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }])
      setInputValue('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <>
      <section id="center">  
        이순신~~~~~~<br/>
        <div>
          <h1>Todo List</h1>
          <p>Manage your daily tasks efficiently.</p>
        </div>

        <div className="todo-input-container">
          <input
            type="text"
            className="todo-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
          />
          <button className="todo-add-btn" onClick={addTodo}>
            Add
          </button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
              <button className="todo-delete-btn" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        {todos.length === 0 && <p className="no-todos">No tasks yet. Add one!</p>}
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>Project Info</h2>
          <p>Current stack: React + Vite + Spring Boot</p>
        </div>
        <div id="social">
          <h2>Links</h2>
          <ul>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                React Docs
              </a>
            </li>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                Vite Docs
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
