import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
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
            {/* 추가 라우트는 3, 4단계에서 구현 예정 */}
            <Route path="/posts/:id" element={<div>상세 보기 화면 (준비 중)</div>} />
            <Route path="/write" element={<div>글쓰기 화면 (준비 중)</div>} />
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
