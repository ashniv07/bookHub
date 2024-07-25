import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import './BookCarousel.css'; // Custom CSS file for styling

const BookCaro = () => {
  const books = [
    { image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1651710803i/23437156.jpg', title: 'Six of crows', subtitle: 'Book Subtitle 1' },
    { image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1697756012i/199798006.jpg', title: 'We used to live here', subtitle: 'Book Subtitle 2' },
    { image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1651710803i/23437156.jpg', title: 'Six of crows', subtitle: 'Book Subtitle 1' },
    { image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1697756012i/199798006.jpg', title: 'We used to live here', subtitle: 'Book Subtitle 2' },
    { image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1651710803i/23437156.jpg', title: 'Six of crows', subtitle: 'Book Subtitle 1' },


  ];

  return (
    <div className="book-carousel">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
      >
        {books.map((book, index) => (
          <SwiperSlide key={index} className="carousel-slide">
            <div className="slide-content">
              <img src={book.image} alt={book.title} className="slide-image" />
              <div className="slide-text">
                <h2>{book.title}</h2>
                <p>{book.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookCaro;
