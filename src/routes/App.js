import React from 'react'
import '../styles/reset.scss'
import '../styles/globalCss.scss'
import '../styles/overrideAntdCss.scss'

import { Routes, Route } from 'react-router-dom'
import Worksheet from '../components/page'
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Worksheet />} />
      </Routes>
    </>
  )
}

export default App
