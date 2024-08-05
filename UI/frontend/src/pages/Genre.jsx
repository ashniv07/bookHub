import React from 'react';
import Appbar from '../components/Appbar';
import Cards from '../components/Cards';

// Inline CSS for text shadow
const textShadowStyle = {
    textAlign: 'center',
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#333',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    marginTop: '100px'
};


// Inline CSS for container with gradient background
const containerStyle = {
    padding: '10px',
    background: '#f8f3ed',
    minHeight: '100vh'
};

const BookDetails = () => {
    return (
        <div>
            <Appbar />
            <div style={containerStyle}>
                <div style={textShadowStyle}>
                    Pick Your Genre
                </div>
                <h5 style={{ marginTop: '40px' ,fontSize:'25px',fontFamily:'revert-layer',marginLeft:'330px'}}>
                Feel free to explore these genres and discover your next favorite book! 
        </h5>
                <Cards />
            </div>
        </div>
    );
}

export default BookDetails;
