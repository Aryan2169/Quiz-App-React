import React from 'react'
import Quiz from './Components/Quiz'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/quiz' element={<Quiz/>}/>
      </Routes>
    </>
  )
}

export default App
