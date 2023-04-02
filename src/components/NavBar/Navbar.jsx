import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Avatar, Drawer, Button, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";

import useStyles from './styles';
import SideBar from '../SideBar/SideBar';

const Navbar = () => {

  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = true;
  const [ mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton color='inherit' edge='start' style={{outline:'none'}} onClick={() => ({})} className={classes.menuButton}>
              <Menu />
            </IconButton>
          )}
          <IconButton color='inherit' sx={{ml:1}} onClick={() => ({})} >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && 'search.........'}
          <div>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={() => ({})}>
                Login &nbsp; <AccountCircle />
              </Button>
            ): (
              <Button color='inherit' component={Link} to="/profile/:id" className={classes.linkButton} onClick={()=>({})}>
                {!isMobile && <>My Profile &nbsp;</>}
                <Avatar style={{ width: 30, height: 30}} alt="profile" src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' />
              </Button>
            )}
          </div>
          {isMobile && 'search.........'}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          { isMobile ? (
             <Drawer variant='temporary' anchor='right' open={mobileOpen} classes={{paper: classes.drawerPaper}} ModalProps={{keepMounted: true}}>
              <SideBar setMobileOpen={setMobileOpen} />
             </Drawer>
          ) : (
            <Drawer variant='permanent' className={classes.drawerPaper} open>
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  )
}

export default Navbar
