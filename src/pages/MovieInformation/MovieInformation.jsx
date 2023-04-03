import React, { useState} from 'react'
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import MovieList from '../../components/MovieList/MovieList';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'

const MovieInformation = () => {
  const classes = useStyles();
  const history = useNavigate();
  const dispatch = useDispatch();
  const noImage = 'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg';
  const isMovieFavorited = false;
  const isMovieWatchlisted = false;
  const [open, setOpen] = useState(false);

  const { id } = useParams();
  const { data, error, isLoading } = useGetMovieQuery(id);
  const { data: recommendations } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id });

  const addToFavorites = () => {

  }

  const addToWatchlist = () => {
    
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => history(-1)} color="primary">
          Something has gone wrong - Go back
        </Button>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} align="center">
        <img
          className={classes.poster}
          src={data?.poster_path ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}` : noImage}
          alt={data?.title}
        />
      </Grid>

      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data?.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min | {data?.spoken_languages?.length > 0 ? data?.spoken_languages[0].name : ''}
          </Typography>
        </Grid>

        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              key={genre?.name}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img src={genreIcons[genre?.name.toLowerCase()]} className={classes.genreImage} height={30} />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom style={{ marginBottom: '15px' }}>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data?.credits?.cast?.slice(0, 6)?.map((character, i) => (
            <Grid key={i} item xs={4} md={2} component={Link} to={`/actor/${character?.id}`} style={{ textDecoration: 'none' }}>
              <img
                className={classes.castImage}
                src={character?.profile_path ? `https://image.tmdb.org/t/p/w500/${character?.profile_path}` : noImage}
                alt={character?.name}
              />
              <Typography color="textPrimary">{character?.name}</Typography>
              <Typography color="textSecondary">{character?.character.split('/')[0]}</Typography>
            </Grid>
          ))}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }} justifyContent="center">
          <div className={classes.buttonsContainer}>
            { /*website, IMDB, trailer*/ }
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                <Button onClick={() => setOpen(true)} endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid>

            { /*favorite, watchlist, back*/ }
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }} onClick={() => history(-1)}>
                  <Typography style={{ textDecoration: 'none' }} color="inherit" variant="subtitle2">
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations
          ? <MovieList movies={recommendations} numberOfMovies={12} />
          : <Box>Sorry, nothing was found.</Box>}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className={classes.video}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  )
}
export default MovieInformation
