import React, { useState, useContext } from 'react';
import { Context } from '../context/appContext';
import { API_ENDPOINT } from '../constants';
import { useNavigate } from 'react-router';

const ReviewForm = () => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const { activeBook } = useContext(Context);
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser');
    const handleSubmit = (e) => {
        e.preventDefault();

        if(review?.length === 0 || rating === 0){
            alert('Please enter review and rating');
            return;
        }

        (async function(){
            const response = await fetch(`${API_ENDPOINT}/reviews/${activeBook}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reviewer : loggedInUser, rating : rating, comment : review }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            navigate(`/book/${activeBook}`);
        })();
    };

    return (
        <form onSubmit={handleSubmit} className='container'>
            <h1 className='size-1'> Thsi is the review Submission Form</h1>
            <h2 className='size-2'> Submit your review here !!</h2>
            <div className=''>
                <label className='size-2' htmlFor="review">Review:</label>
                <textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </div>
            <div>
                <label className='size-2' htmlFor="rating">Rating:</label>
                <input
                    type="number"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="0"
                    max="5"
                />
            </div>
            <button type="submit">Submit</button>
            {loggedInUser && <div className='size-2'>Submitting form as {loggedInUser}</div>}
        </form>
    );
};

export default ReviewForm;