import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostById, deletePost } from '../api/postApi';

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
            setLoading(true);
            const response = await getPostById(id);
            setPost(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching post detail:', err);
            setError('게시글을 찾을 수 없습니다.');
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await deletePost(id);
                alert('게시글이 삭제되었습니다.');
                navigate('/');
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('게시글 삭제에 실패했습니다.');
            }
        }
    };

    if (loading) return <div className="loading">로딩 중...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!post) return null;

    return (
        <div className="post-detail-container">
            <div className="post-header">
                <h1>{post.title}</h1>
                <div className="post-info">
                    <span>작성자: {post.author}</span>
                    <span>작성일: {post.createdAt}</span>
                </div>
            </div>
            <div className="post-content">
                {post.content.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
            <div className="post-actions">
                <Link to="/" className="btn btn-secondary">목록으로</Link>
                <div className="right-actions">
                    <Link to={`/edit/${id}`} className="btn btn-warning">수정</Link>
                    <button className="btn btn-danger" onClick={handleDelete}>삭제</button>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
