import React from 'react'
import '../styles/reset.scss'
import '../styles/globalCss.scss'
import Header from '../components/layout/header/index'

import Home from '../components/page/Home/index/index'

const App = () => {
  return (
    <>
      <Header />
      <Home />
    </>
  )
}

export default App
