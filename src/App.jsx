import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route, Link } from "react-router-dom";
import Movies from './pages/Movies/Movies';
import MovieInformation from './pages/MovieInformation/MovieInformation';
import Actor from './pages/Actor/Actor';
import Profile from './pages/Profile/Profile';

const App = () => {
  return (
    <div>
      <CssBaseline />
      <main>
        <Routes>
          <Route exact path='/' element={<Movies />}/>
          <Route exact path='/movie/:id' element={<MovieInformation />}/>
          <Route exact path='/actor/:id' element={<Actor />}/>
          <Route exact path='/profile/:id' element={<Profile />}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
