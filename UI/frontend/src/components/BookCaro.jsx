import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

import book1 from '../assets/book1.jpg';
import book2 from '../assets/book2.jpg';
import book3 from '../assets/book3.jpg';
import book4 from '../assets/book4.jpg';
import book5 from '../assets/book5.jpg';


function BookCaro() {
  const containerStyle = {
    maxWidth: '124rem',
    padding: '4rem 1rem',
    margin: '0 auto',
  };

  const headingStyle = {
    padding: '1rem 0',
    fontSize: '3.5rem',
    textAlign: 'center',
  };

  const swiperContainerStyle = {
    height: '52rem',
    padding: '2rem 0',
    position: 'relative',
  };

  const swiperSlideStyle = {
    width: '10rem',
    height: '15rem',
    position: 'relative',
  };

  const swiperSlideImageStyle = {
    width: '10rem',
    height: '15rem',
    borderRadius: '1rem',
    objectFit: 'cover',
  };

  const sliderControllerStyle = {
    position: 'relative',
    bottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const sliderArrowStyle = {
    background: '#ffffff',
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: '50%',
    filter: 'drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const swiperButtonNextStyle = {
    left: '58%',
    transform: 'translateX(-58%)',
  };

  const swiperButtonPrevStyle = {
    left: '42%',
    transform: 'translateX(-42%)',
  };

  const paginationStyle = {
    position: 'relative',
    width: '15rem',
    bottom: '1rem',
  };

  const paginationBulletStyle = {
    filter: 'drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1))',
  };

  const paginationBulletActiveStyle = {
    background: '#6a59ff',
  };

  return (
    <div style={containerStyle}>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="swiper_container"
        style={swiperContainerStyle}
      >
        {[book1, book2, book3, book4, book5].map((book, index) => (
          <SwiperSlide key={index} style={swiperSlideStyle}>
            <img src={book} alt={`book${index + 1}`} style={swiperSlideImageStyle} />
          </SwiperSlide>
        ))}

        <div style={sliderControllerStyle}>
          <div className="swiper-button-prev slider-arrow" style={{ ...sliderArrowStyle, ...swiperButtonPrevStyle }}>
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow" style={{ ...sliderArrowStyle, ...swiperButtonNextStyle }}>
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination" style={paginationStyle}></div>
        </div>
      </Swiper>
    </div>
  );
}

export default BookCaro;
