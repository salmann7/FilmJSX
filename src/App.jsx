import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route, Link } from "react-router-dom";

import Movies from './pages/Movies/Movies';
import MovieInformation from './pages/MovieInformation/MovieInformation';
import Actor from './pages/Actor/Actor';
import Profile from './pages/Profile/Profile';
import Navbar from './components/NavBar/Navbar';

import useStyles from './styles';

const App = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>  
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Routes>
          <Route exact path='/' element={<Movies />}/>
          <Route exact path='/approved' element={<Movies />}/>
          <Route exact path='/movie/:id' element={<MovieInformation />}/>
          <Route exact path='/actor/:id' element={<Actor />}/>
          <Route exact path='/profile/:id' element={<Profile />}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
