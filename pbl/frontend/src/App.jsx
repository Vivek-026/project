import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginButton from './components/button/loginButton'
import Crad from './components/cards'
import Home from './components/home'
import NewPost from './components/form/newPost'
import ClubVerification from './components/verification/ClubVerification'
import AllClubs from './components/allClubs'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes errorElement={<ErrorBoundary />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginButton />} />
          <Route path="/cards" element={<Crad />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/clubs" element={<AllClubs />} />
          <Route path="/verify-club/:token" element={<ClubVerification />} />
          <Route path="*" element={<ErrorBoundary />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
