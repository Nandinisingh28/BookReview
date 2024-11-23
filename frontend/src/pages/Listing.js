import React, { useEffect, useState } from 'react';
import { fetchAPI } from '../apis/utils';
import { API_ENDPOINT } from '../constants';

const Listing = () => {
    const [ page , setPage] = useState(1);

    const [data , setData] = useState([]); 

    useEffect(()=> {
        (async function(){
            const response = await fetchAPI(`${API_ENDPOINT}/books?page=${page}&limit=1`);
            if(response){
                setData(response);
            }
        })();
    },[page]);
   const pages = data?.totalPages ?? data.length;
    return (
        <div className='container'>
            <h1 className='size-1'>Listing Page</h1>
            <p className='size-2'>This is the listing page.</p>
            <div>
                <ul>
                    {data.books && data.books.map((book) => (
                        <li key={book.id} className='book-card'>
                            <a href={`/book/${book.id}`}>
                             <img src={book.image} alt={book.name}/>
                              <h2 className='size-2'>{book.name}</h2>
                            </a>
                        </li>
                    ))}
                </ul>
                <div className='listing__pagination'>
                 {new Array(pages).fill(null).map((_,index) => (
                <button onClick={()=>{setPage(index+1)}}>
                        {index + 1}
                 </button>))}
                </div>
            </div>
        </div>
    );
};

export default Listing;