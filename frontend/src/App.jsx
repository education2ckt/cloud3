import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:8080/api/todos'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setTodos(data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const addTodo = async () => {
    if (inputValue.trim() !== '') {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: inputValue, completed: false }),
        })
        const newTodo = await response.json()
        setTodos([...todos, newTodo])
        setInputValue('')
      } catch (error) {
        console.error('Error adding todo:', error)
      }
    }
  }

  const toggleTodo = async (id) => {
    const todoToToggle = todos.find((todo) => todo.id === id)
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todoToToggle,
          completed: !todoToToggle.completed,
        }),
      })
      const updatedTodo = await response.json()
      setTodos(
        todos.map((todo) => (todo.id === id ? updatedTodo : todo))
      )
    } catch (error) {
      console.error('Error toggling todo:', error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
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
