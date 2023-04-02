import React from 'react'
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from "@mui/material";
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import useStyles from './styles';


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
    </>
  )
}

export default SideBar
