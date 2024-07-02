
import Layout from './Components/Layout'
import { Outlet } from 'react-router-dom'
import React from 'react'


function App() {
  return (
    <>
    <Layout>
    <Outlet/>
    </Layout>
    </>
  )
}

export default App
