import React from 'react'
import { ToastContainer } from 'react-toastify';
import AuthProvider from './AuthProvider';



const wrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <>
        <AuthProvider>

        {children}
        <ToastContainer/>
        </AuthProvider>

    </>
  )
}

export default wrapper