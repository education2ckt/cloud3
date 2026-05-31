import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <nav>
            <div className="logo">
              <a href="/">Board Application</a>
            </div>
          </nav>
        </header>
        
        <main className="content">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/write" element={<PostForm />} />
            <Route path="/edit/:id" element={<PostForm />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2026 Board App Project. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
