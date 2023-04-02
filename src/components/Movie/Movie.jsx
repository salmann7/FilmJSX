import React from 'react'
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material'
import { Link } from "react-router-dom";

import useStyles from './styles';

const Movie = ({movie, i}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Grow in={true} key={movie?.id} timeout={(i + 1) * 150}>
        <Link to={`/movie/${movie.id}`} className={classes.links}>
           {movie?.poster_path ? <img alt={movie?.title} className={classes.image} src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} /> : null}
           <Tooltip title={`${movie?.title}`} disableTouchListener>
              <div>
                <Typography className={classes.title} variant='h6'>{movie?.title}</Typography>
              </div>
           </Tooltip>
           <Tooltip title={`${movie?.vote_average}/10`} disableTouchListener >
              <div>
                <Rating readOnly value={movie?.vote_average/2} precision={0.1}/> 
              </div>
           </Tooltip>
        </Link>
      </Grow>
    </Grid>
  )
}

export default Movie
