import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'
import { BrowserRouter } from 'react-router-dom';
import LoginButton from './components/button/loginButton'
import Crad from './components/cards'
import Home from './components/home'
import NewPost from './components/form/newPost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
     
      
    
    </BrowserRouter>
    </>
  )
}

export default App
