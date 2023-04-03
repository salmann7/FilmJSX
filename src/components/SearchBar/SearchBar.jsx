import React from 'react'
import { TextField, InputAdornment, FormControl } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { useState } from 'react';
import { searchMovie } from '../../features/currentGenreOrCategory';

const SearchBar = () => {
  const classes = useStyles();
  const [ query, setQuery ] = useState('');
  const dispatch = useDispatch();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
        dispatch(searchMovie(query));
        setQuery('');
    }
  }

  return (
    <div className={classes.searchContainer}>
      <FormControl>
      <TextField 
      onKeyDown={handleKeyDown}
      value={query}
      onChange={(e)=>(setQuery(e.target.value))}
      variant="standard"
      InputProps={{
        className:classes.input,
        startAdornment: (<InputAdornment position='start'><Search/></InputAdornment>),
      }}/>
      </FormControl>
    </div>
  )
}

export default SearchBar
