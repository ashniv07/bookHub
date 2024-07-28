import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Masonry from 'react-masonry-css';

import book1 from '../assets/book1.jpg';
import book2 from '../assets/book2.jpg';
import book3 from '../assets/book3.jpg';
import book4 from '../assets/book4.jpg';
import book5 from '../assets/book5.jpg';
import book6 from '../assets/book6.jpg';
import book7 from '../assets/book7.jpg';
// import book8 from '../assets/book8.jpg';
import book9 from '../assets/book9.jpg';
import book10 from '../assets/book10.jpg';
import book11 from '../assets/book11.jpg';
import book12 from '../assets/book12.jpg';
import book13 from '../assets/book13.jpg';
// import book14 from '../assets/book14.jpg';
// import book15 from '../assets/book15.jpg';

const itemData = [
  { img: book1, title: 'Book 1', height: 200 },
  { img: book2, title: 'Book 2', height: 270 },
  { img: book3, title: 'Book 3', height: 250 },
  { img: book4, title: 'Book 4', height: 220 },
  { img: book5, title: 'Book 5', height: 200 },
  { img: book6, title: 'Book 6', height: 190 },
  { img: book7, title: 'Book 7', height: 220 },
//   { img: book8, title: 'Book 8', height: 20 },
  { img: book9, title: 'Book 9', height: 230 },
  { img: book10, title: 'Book 10', height: 210 },
  { img: book11, title: 'Book 11', height: 190 },
  { img: book12, title: 'Book 12', height: 170 },
  { img: book13, title: 'Book 13', height: 200 },
//   { img: book14, title: 'Book 14', height: 200 },
//   { img: book15, title: 'Book 15', height: 250 },
];

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
};

export default function ImageMasonry() {
  const containerRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          top: 100, // Change this value to control the scroll distance
          behavior: 'smooth',
        });
      }
    }, 2000); // Change this value to control the scroll speed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      sx={{ width: 600, minHeight: 800, overflowY: 'hidden', position: 'relative' , marginTop: '-10px'}}
      ref={containerRef}
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        style={{
          display: 'flex',
          marginLeft: '-20px', // gutter size offset
          width: 'auto',
        }}
      >
        {itemData.map((item, index) => (
          <div
            key={index}
            style={{
              paddingLeft: '20px', // gutter size
              backgroundClip: 'padding-box',
              marginBottom: '30px',
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                display: 'block',
                width: '100%',
                height: `${item.height}px`, // Set different heights for each image
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
      </Masonry>
    </Box>
  );
}
