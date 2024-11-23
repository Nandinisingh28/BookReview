import React, { useEffect, useState,useContext } from 'react';
import { API_ENDPOINT } from '../constants';
import { useLocation } from 'react-router';
import { fetchAPI } from '../apis/utils';
import Home from './Home';
import { Context } from '../context/appContext';

const UserProfile = () => {
    const location = useLocation();
    const [ userData, setUserData ] = useState({});
    useEffect(()=>{
      (async function(){
        const data = await fetchAPI(`${API_ENDPOINT}/api/users/${location.pathname.split('/').pop()}`);
        if(data){
          setUserData(data?.user);
        }
      })();
    },[]);
    return (
        <div className='container'>
            <h1 className='size-1'>User Profile</h1>
            <p className='size-2'>Welcome to the user profile page!</p>
            <p className='size-2'>{userData?.name}</p>
            <Home/>
        </div>
    );
};

export default UserProfile;