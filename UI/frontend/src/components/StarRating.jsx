import React from 'react';
import './StarRating.css';

const StarRating = ({ rating }) => {
    const stars = Array(5).fill(false).map((_, index) => index < rating);

    return (
        <div className="star-rating">
            {stars.map((filled, index) => (
                <span key={index} className={`star ${filled ? 'filled' : ''}`}>
                    {filled ? '★' : '☆'}
                </span>
            ))}
        </div>
    );
};

export default StarRating;
