import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.js';
import Listing from './pages/Listing.js';
import BookDetail from './pages/BookDetail.js';
import Login from './pages/Login.js';
import ReviewForm from './pages/ReviewForm.js';
import UserProfile from './pages/UserProfile.js';
import { ContextProvider } from './context/appContext.js';
import ErrorBoundary from './components/ErrorBoundary.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorBoundary>
      <Home/>
    </ErrorBoundary>,
  },
  {
    path: "/listing",
    element: <ErrorBoundary>
      <Listing/>
    </ErrorBoundary>,
  },
  {
    path: "/book/:id",
    element: <ErrorBoundary>
      <ContextProvider><BookDetail/></ContextProvider>
    </ErrorBoundary>,
  },
  {
    path: "/login",
    element : <ErrorBoundary>
      <Login/>
    </ErrorBoundary>
  },
  {
    path : '/review',
    element : <ErrorBoundary>
      <ContextProvider><ReviewForm/></ContextProvider> 
    </ErrorBoundary>
  },
  {
    path : '/users/:id',
    element : <ErrorBoundary>
      <ContextProvider><UserProfile/></ContextProvider> 
    </ErrorBoundary>
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
