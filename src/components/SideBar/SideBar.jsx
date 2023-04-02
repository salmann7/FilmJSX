import React from 'react'
import { Divider, List, ListItem, ListItemButton, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from "@mui/material";
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const categories = [
    {label: 'Popular', value: 'popular'},
    {label: 'Top Rated', value: 'top_rated'},
    {label: 'Upcoming', value: 'upcoming'},
]


const SideBar = ({setMobileOpen}) => {
    const classes = useStyles();
    const theme = useTheme();
    const { data, error, isLoading } = useGetGenresQuery();
    const dispatch = useDispatch();

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        {theme.palette.mode === 'light' ? 
        <div className={classes.lightBrand}>
            <span className={classes.fBrand}>F</span><span className={classes.mBrand}>I</span>LMJ<span className={classes.mBrand}>S</span><span className={classes.fBrand}>X</span></div> :
        <div className={classes.darkBrand}>
            <span className={classes.fBrand}>F</span><span className={classes.mBrand}>I</span>LMJ<span className={classes.mBrand}>S</span><span className={classes.fBrand}>X</span></div>}
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({label, value}) => (
            <Link to="/" key={value} className={classes.link}>
                <ListItem onClick={()=>(dispatch(selectGenreOrCategory(value)))} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <img src={genreIcons[label.toLowerCase()]} height={30} className={classes.genreImages}/>
                        </ListItemIcon>
                        <ListItemText primary={label}/>
                    </ListItemButton>
                </ListItem>
            </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {!isLoading ? (data?.genres.map(({name, id}) => (
            <Link to="/" key={name} className={classes.link}>
                <ListItem onClick={()=>(dispatch(selectGenreOrCategory(id)))} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <img src={genreIcons[name.toLowerCase()]} height={30} className={classes.genreImages}/>
                        </ListItemIcon>
                        <ListItemText primary={name}/>
                    </ListItemButton>
                </ListItem>
            </Link>
        ))) : (
            <Box display='flex' justifyContent='center' > 
                <CircularProgress size='4em' />
            </Box>
        )}
      </List>
    </>
  )
}

export default SideBar
