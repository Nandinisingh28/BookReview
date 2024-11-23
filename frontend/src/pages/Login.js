import React from 'react';
import { useState } from 'react';
import { API_ENDPOINT } from '../constants';
import { useNavigate } from 'react-router';
import { getRandomNumber } from '../utils';

const Login = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();

      if(username?.length === 0 || password?.length === 0){
        alert('Please enter username and password');
        return;
      }
  
      try {
        const response = await fetch(`${API_ENDPOINT}/api/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name : username, password : password, id : getRandomNumber(1,1000) }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        localStorage.setItem('loggedInUser',data.user.name);
        navigate(`/users/${data.user.id}`);
         
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Error logging in. Please try again later.');
      }
    };

    return (
        <div className='container'>
            <h2 className='size-1'>Login Page</h2>
            <form className='form'>
                <div>
                    <label className='size-2' htmlFor="username">Username:</label>
                    <input type="text" id="username"  value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div>
                    <label className='size-2' htmlFor="password">Password:</label>
                    <input type="password" id="password"  value={password} onChange={(e)=>setPassword(e.target.password)}/>
                </div>
                <button type="submit" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
};

export default Login;