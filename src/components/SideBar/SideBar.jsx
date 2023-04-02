import React from 'react'
import { Divider, List, ListItem, ListItemButton, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from "@mui/material";
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import useStyles from './styles';

const demoCategories = [
    {label: 'Animation', value: 'animation'},
    {label: 'Sci-Fi', value: 'sci_fi'},
    {label: 'Action', value: 'action'},
    {label: 'Comedy', value: 'comedy'},
    {label: 'Horror', value: 'horror'},
]
const categories = [
    {label: 'Popular', value: 'popular'},
    {label: 'Top Rated', value: 'top_rated'},
    {label: 'Upcoming', value: 'upcoming'},
]


const SideBar = ({setMobileOpen}) => {
    const classes = useStyles();
    const theme = useTheme();

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
                <ListItem onClick={()=>({})} disablePadding>
                    <ListItemButton>
                        <ListItemText primary={label}/>
                    </ListItemButton>
                </ListItem>
            </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {demoCategories.map(({label, value}) => (
            <Link to="/" key={value} className={classes.link}>
                <ListItem onClick={()=>({})} disablePadding>
                    <ListItemButton>
                        <ListItemText primary={label}/>
                    </ListItemButton>
                </ListItem>
            </Link>
        ))}
      </List>
    </>
  )
}

export default SideBar
