import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginButton from './components/button/loginButton'
import Crad from './components/cards'
import Home from './components/home'
import NewPost from './components/form/newPost'
import Layout from './components/layout.jsx'
import Login from './components/form/login.jsx'
import Signup from './components/form/register.jsx'
import { Provider } from 'react-redux'
import Store from './store/store.jsx'
import { useSelector } from 'react-redux'
import AdminProfile from './components/profile/adminProfile.jsx'
import StuProfile from './components/profile/stuProfile.jsx'
import ClubRegistrationForm from './components/form/club.jsx'
import Clubs from './components/allClubs.jsx'
import Events from './components/events.jsx'
import Calender from './components/calender.jsx'
import EditPost from './components/EditPost.jsx'

//const status=useSelector((state)=>state.auth.status);

const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:"login",
        element:<Login/>
      },{
        path:"signup",
        element:<Signup/>
      },{
        path:"newpost",
        element:<NewPost/>
      },{
        path:"adminprofile",
        element:<AdminProfile/>
      },{
        path:"newPost",
        element:<NewPost/>
      },{
        path:'/stuprofile',
        element: <StuProfile/>
      },{
        path: 'clubs',
        element: <Clubs/>
      },{
        path: 'events',
        element: <Events/>
      },{
        path: 'calender',
        element: <Calender/>
      },{
         path:"/edit/:id",
        element:<EditPost /> 
      }

    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
    <RouterProvider router={router}/>
    </Provider>
    
  </StrictMode>,
)
