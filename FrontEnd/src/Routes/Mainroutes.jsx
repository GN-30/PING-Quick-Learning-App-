import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/login_signup/Login'
import Signup from '../components/login_signup/Signup'
import DiscoverPage from '../components/pages/DiscoverPage'
import Dashboard from '../components/pages/Dashboard'

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DiscoverPage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  )
}

export default Mainroutes
