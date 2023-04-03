import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material';
import { useGetMoviesQuery } from '../../services/TMDB'
import MovieList from '../../components/MovieList/MovieList';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Movies = () => {
  const [ page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => (state.currentGenreOrCategory));
  const { data, error, isLoading } = useGetMoviesQuery( {genreIdOrCategoryName, page , searchQuery});

  if(isLoading){
    return (
      <Box display='flex' justifyContent='center' > 
        <CircularProgress size='4em' />
      </Box>
    )
  };

  if(!data?.results.length){
    return (
      <Box display='flex' alignItems='center' mt='20px'>
        <Typography variant='h4'>
          No movies that match that name
        </Typography>
      </Box>
    )
  };

  if(error){
    return (
      <Typography variant='h4'>
          An error has occured; Please try again later.
        </Typography>
    )
  }

  return (
    <>
      <MovieList movies={data} />
    </>
  )
}

export default Movies
