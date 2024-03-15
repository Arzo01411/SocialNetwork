import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import Register from './Pages/RegisterPage';
import Login from './Pages/LoginPage';
import CreatePost from './Components/CreatePost';
import ViewPosts from './Components/ViewPosts';
import EditPost from './Components/EditPost';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';

const router = createBrowserRouter([
  {
    path : '/',
    element : <Home></Home>,
    errorElement : <h1>Page Not Found</h1>
  },
  {
    path : '/register',
    element : <Register></Register>,
    errorElement : <h1>Page Not Found</h1>
  },
  {
    path : '/login',
    element : <Login></Login>,
    errorElement : <h1>Page Not Found</h1>
  },
  {
    path : '/create-post',
    element : <CreatePost></CreatePost>,
    errorElement : <h1>Page Not Found</h1>
  },
  {
    path : '/view-posts',
    element : <ViewPosts></ViewPosts>,
    errorElement : <h1>Page Not Found</h1>
  },
  {
    path : '/edit-post',
    element : <EditPost></EditPost>,
    errorElement : <h1>Page Not Found</h1>
  },
  {
    path : '/home-page',
    element : <HomePage></HomePage>,
    errorElement : <h1>Page Not Found</h1>
  },
  {
    path : '/about-page',
    element : <AboutPage></AboutPage>,
    errorElement : <h1>Page Not Found</h1>
  },
  {
    path : '/contact-page',
    element : <ContactPage></ContactPage>,
    errorElement : <h1>Page Not Found</h1>
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
