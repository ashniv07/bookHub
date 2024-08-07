
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { Autoplay } from 'swiper/modules';

import author1 from '../assets/author1.jpg';
import author2 from '../assets/author2.jfif';
import author3 from '../assets/author3.jpg';
import author4 from '../assets/author4.jfif';
import author5 from '../assets/author5.jfif';
import author6 from '../assets/author6.jpg';
import author7 from '../assets/author7.jpg';
import author8 from '../assets/author8.jfif';
import author9 from '../assets/author9.jpg';


const author = [
  { id: 1, src: author1 },
  { id: 2, src: author2 },
  { id: 3, src: author3},
  { id: 4, src: author4 },
  { id: 5, src: author5 },
  { id: 6, src: author6 },
  { id: 7, src: author7},
  { id: 8, src: author8 },
  { id: 9, src: author9 },

];

const SlideContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
 

});

const AuthorImage = styled('img')({
  width: '100%',
  height: 'auto',
  maxWidth: '250px',
  maxHeight: '300px',
  objectFit: 'cover',
 borderRadius:'30px',
  transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)', // Custom cubic-bezier easing
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

export default function Author() {
  return (
    <Swiper
      slidesPerView={5}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      loop={true}
      className="mySwiper"
    >
      {author.map(author => (
        <SwiperSlide key={author.id}>
          <SlideContent>
            <AuthorImage src={author.src} alt={`Book ${author.id}`} />
          </SlideContent>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}