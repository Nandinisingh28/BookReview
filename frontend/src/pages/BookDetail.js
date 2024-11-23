import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { API_ENDPOINT } from '../constants';
import { fetchAPI } from '../apis/utils';
import { Context } from '../context/appContext';

const BookDetail = () => {
    const location = useLocation(); 
    const navigate = useNavigate();
    const bookId = location.pathname.split('/').pop();
    const [ bookData , setBookData ] = useState({});

    const {setActiveBook,activeBook} = useContext(Context);

    const loggedInUser = localStorage.getItem('loggedInUser');
    const handleWriteReview = (bookId) => {
        if(!loggedInUser){
            alert('You must be logged in to write a review !!');
            navigate('/login');
            return; 
        }
        setActiveBook(bookId);
        navigate('/review');
    }
    
    useEffect(()=>{
      (async function() {
          const bookData = await fetchAPI(`${API_ENDPOINT}/books/${bookId}`);
          if(bookData){
            setBookData(bookData.book);
          }
      })();
    },[]);

    return (
        <div className='container'>
            <h1 className='size-1'>Book Detail</h1>
            <p className='size-2'>This is the book detail page.</p>
            <div className=''>
                <div className='book-card book-detail'>
                    <img src={bookData.image} alt={bookData.name}/>
                    <h2 className='size-2'>{bookData.name}</h2>
                    <p>{bookData.description}</p>
                </div>
            </div> 
            <div className='reviews-container'>
               {bookData.reviews && bookData.reviews.map((review) => (
                <section className='review-block'>
                     <b>{review.reviewer}</b>
                     <span>Rating : {review.rating}</span>
                     <p>{review.comment}</p>
                </section>    
               ))}
            <button onClick={()=>handleWriteReview(bookData.id)} className='write-review-btn'>Write a Review !!</button>
            </div>
        </div>
    );
};

export default BookDetail;