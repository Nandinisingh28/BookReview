import React, { Suspense, useEffect, useState } from 'react';
import { fetchAPI } from '../apis/utils';
import { API_ENDPOINT } from '../constants';
import { useNavigate } from 'react-router';

const Home = () => {

     const [ books , setBooks ] = useState([]);

     const navigate = useNavigate();

    useEffect(() => {

        (async function(){
            const bookData = await fetchAPI(`${API_ENDPOINT}/books`);
            if(bookData)
              setBooks(bookData.books);
        })();
    },[]);

    return (
        <div className='container'>
            <h1 className='size-1'>Welcome to the Home Page</h1>
            <p className='size-2'>This is the home page of the Book Review application.</p>
            <button onClick={()=>navigate('/listing')} className='listing-page-btn'>Checkout the Listing page with Pagination !!</button>
            <Suspense fallback={<div>Loading...</div>}>
                <h2>Books</h2>
                <ul className='hoz-contaier'>
                    {books.map((book) => (
                        <li key={book.id} className='book-card'>
                            <a href={`/book/${book.id}`}>
                             <img src={book.image} alt={book.name}/>
                             <h3>{book.name}</h3>
                            </a>
                        </li>
                    ))}
                </ul>
                <h3 className='more'>And More ....</h3>
            </Suspense>
        </div>
    );
};

export default Home;