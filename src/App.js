import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/index'
import {AuthProvider} from "./contexts/AuthContext"
import FavouriteContextProvider from './contexts/FavouriteContext'
import ThemeProvider from './theme'

function App() {
  return (
    <AuthProvider>
      <FavouriteContextProvider>
       <BrowserRouter>
       <ThemeProvider>
         <Router/>
         </ThemeProvider>
       </BrowserRouter>
       </FavouriteContextProvider>
       </AuthProvider>  

  )
}

export default App
