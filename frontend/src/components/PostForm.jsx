import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, getPostById, updatePost } from '../api/postApi';

const PostForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [post, setPost] = useState({
        title: '',
        author: '',
        content: ''
    });

    useEffect(() => {
        if (isEditMode) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        try {
            const response = await getPostById(id);
            const { title, author, content } = response.data;
            setPost({ title, author, content });
        } catch (error) {
            console.error('Error fetching post for edit:', error);
            alert('게시글 정보를 불러오는 데 실패했습니다.');
            navigate('/');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!post.title || (!isEditMode && !post.author) || !post.content) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        try {
            if (isEditMode) {
                await updatePost(id, { title: post.title, content: post.content });
                alert('게시글이 수정되었습니다.');
                navigate(`/posts/${id}`);
            } else {
                await createPost(post);
                alert('게시글이 등록되었습니다.');
                navigate('/');
            }
        } catch (error) {
            console.error('Error saving post:', error);
            alert('게시글 저장에 실패했습니다.');
        }
    };

    return (
        <div className="form-container">
            <h1>{isEditMode ? '게시글 수정' : '게시글 작성'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        placeholder="제목을 입력하세요"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">작성자</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={post.author}
                        onChange={handleChange}
                        placeholder="이름을 입력하세요"
                        disabled={isEditMode}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">내용</label>
                    <textarea
                        id="content"
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        rows="10"
                        placeholder="내용을 입력하세요"
                    ></textarea>
                </div>
                <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>취소</button>
                    <button type="submit" className="btn btn-primary">{isEditMode ? '수정 완료' : '등록'}</button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
