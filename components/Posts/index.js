import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { useWindowWidthContext } from '../hooks/WindowWidthContext';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { isSmallerDevice } = useWindowWidthContext();

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const limit = isSmallerDevice ? 5 : 10;
      const { data: fetchedPosts } = await axios.get('/api/v1/posts', {
        params: { start, limit },
      });

      if (fetchedPosts.length === 0) {
        setHasMore(false);
      } else {
        const postsWithImages = await Promise.all(
          fetchedPosts.map(async post => {
            const { data: images } = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
            return { ...post, images };
          })
        );

        setPosts([...posts, ...postsWithImages]);
        setStart(prevStart => prevStart + limit);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    fetchPost(); 
  };

  useEffect(() => {
    setStart(0);
    setPosts([]);
    setHasMore(true);
    fetchPost(); 
  }, []);

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post post={post} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {hasMore && (
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        )}
      </div>
    </Container>
  );
}
