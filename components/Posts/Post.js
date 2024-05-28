import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { fetchUserById } from '../../server/users/users.service';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Post = ({ post }) => {
  const [user, setUser] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await fetchUserById(post.userId);
      setUser(fetchedUser);
    }
    fetchUser();
  }, [post.userId]);
  // console.log(user.name.split(' ')[0][0])

  const handleNextClick = () => {
    const itemWidth = carouselRef.current.children[0].offsetWidth;
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: itemWidth,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    const itemWidth = carouselRef.current.children[0].offsetWidth;
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -itemWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <div style={{ borderRadius: '50%', backgroundColor:'gray', width: '50px', height: '50px', margin:'5px',display:'flex', justifyContent:'center', alignItems:'center' }}>
              <span>{user.name.split(' ')[0][0]}</span>
              <span>{user.name.split(' ')[1][0]}</span>
            </div>
            <div style={{marginLeft: '5px'}}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>
        )}
      <CarouselContainer>
      {console.log(post.userId)}
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
  }),
};

export default Post;
