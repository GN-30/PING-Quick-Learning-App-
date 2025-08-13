import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/login_signup/Login'
import Signup from '../components/login_signup/Signup'
import DiscoverPage from '../components/pages/DiscoverPage'
import Dashboard from '../components/pages/Dashboard'
import AuthWrapper from '../Wrapper/Authwrapper'
import UnAuthWrapper from '../Wrapper/UnAuthWrapper'

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UnAuthWrapper><DiscoverPage/></UnAuthWrapper>} />
      <Route path="/login" element={<UnAuthWrapper><Login/></UnAuthWrapper>} />
      <Route path="/signup" element={<UnAuthWrapper><Signup/></UnAuthWrapper>} />
      <Route path="/dashboard" element={<AuthWrapper><Dashboard/></AuthWrapper>} />
    </Routes>
  )
}

export default Mainroutes
