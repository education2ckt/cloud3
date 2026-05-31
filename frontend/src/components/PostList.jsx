import { useState, useEffect } from 'react';
import { getAllPosts } from '../api/postApi';
import { Link } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await getAllPosts();
            setPosts(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('게시글을 불러오는 중 오류가 발생했습니다.');
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">로딩 중...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="post-list-container">
            <h1>게시판 목록</h1>
            <div className="action-bar">
                <Link to="/write" className="btn btn-primary">글쓰기</Link>
            </div>
            <table className="post-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>
                                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                                </td>
                                <td>{post.author}</td>
                                <td>{post.createdAt}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="no-data">등록된 게시글이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PostList;
