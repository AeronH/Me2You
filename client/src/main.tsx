import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import ErrorPage from './ErrorPage';
import PostPage from './routes/postPage';
import AccountPage from './routes/AccountPage';
import HomePage from './routes/homePage';
import ExplorePage from './routes/explorePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/home',
                element: <HomePage />,
            },
            {
                path: 'post/:postId',
                element: <PostPage />,
            },
            {
                path: 'account/:accountId',
                element: <AccountPage />,
            },
            {
                path: '/explore',
                element: <ExplorePage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
