import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay'; 

import { Box } from '@mui/material';
import { styled } from '@mui/system';

import { Autoplay } from 'swiper/modules';

import book1 from '../assets/book1.jpg';
import book2 from '../assets/book2.jpg';
import book3 from '../assets/book3.jpg';
import book4 from '../assets/book4.jpg';
import book5 from '../assets/book5.jpg';
import book6 from '../assets/book6.jpg';
import book7 from '../assets/book7.jpg';
import book8 from '../assets/book8.jpg';
import book9 from '../assets/book9.jpg';
import book10 from '../assets/book10.jpg';
import book11 from '../assets/book11.jpg';
import book12 from '../assets/book12.jpg';
import book13 from '../assets/book13.jpg';
import book14 from '../assets/book14.jpg';
import book15 from '../assets/book15.jpg';

const books = [
  { id: 1, src: book1 },
  { id: 2, src: book2 },
  { id: 3, src: book3 },
  { id: 4, src: book4 },
  { id: 5, src: book5 },
  { id: 6, src: book6 },
  { id: 7, src: book7 },
  { id: 8, src: book8 },
  { id: 9, src: book9 },
  { id: 10, src: book10 },
  { id: 11, src: book11 },
  { id: 12, src: book12 },
  { id: 13, src: book13 },
  { id: 14, src: book14 },
  { id: 15, src: book15 },
];

const SlideContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden', 
});

const BookImage = styled('img')({
  width: '100%',
  height: 'auto',
  maxWidth: '200px', 
  maxHeight: '300px', 
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)', 
  },
});

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={6}
        spaceBetween={8}
        autoplay={{
          delay: 1500, 
          disableOnInteraction: false, 
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {books.map(book => (
          <SwiperSlide key={book.id}>
            <SlideContent>
              <BookImage src={book.src} alt={`Book ${book.id}`} />
            </SlideContent>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
