import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import ErrorPage from './ErrorPage';
import PostPage from './routes/postPage';
import AccountPage from './routes/AccountPage';
import HomePage from './routes/homePage';
import ExplorePage from './routes/explorePage';
import SettingsPage from './routes/settingsPage';
import LoginPage from './routes/loginPage';
import PostService from './services/posts.service';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/home',
                element: <HomePage />,
                id: 'home',
                loader: () => PostService.getAllPosts(),
            },
            {
                path: '/post/:postId',
                element: <PostPage />,
                id: 'post',
                loader: ({ params }) =>
                    PostService.getPostById(params.postId as string),
            },
            {
                path: '/accounts',
                element: <AccountPage />,
            },
            {
                path: '/explore',
                element: <ExplorePage />,
            },
            {
                path: '/settings',
                element: <SettingsPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
