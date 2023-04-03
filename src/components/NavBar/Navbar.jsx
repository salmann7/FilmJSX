import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, IconButton, Avatar, Drawer, Button, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import SideBar from '../SideBar/SideBar';
import SearchBar from '../SearchBar/SearchBar';
import { createSessionId, fetchToken, moviesApi } from '../../utils';
import { setUser } from '../../features/auth';

const Navbar = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const [ mobileOpen, setMobileOpen] = useState(false);
  const token = localStorage.getItem('request_token');
  const sessionIdLocal = localStorage.getItem('session_id');
  const { user, isAuthenticated } = useSelector((state)=>(state.auth));

  useEffect(()=>{
    const logIn = async () => {
      if(token){
        if(sessionIdLocal){
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdLocal}`);
          dispatch(setUser(userData));
        } else{
          console.log(2);
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    }
    logIn();
  },[token]);

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton color='inherit' edge='start' style={{outline:'none'}} onClick={()=>(setMobileOpen((prev)=>(!prev)))} className={classes.menuButton}>
              <Menu />
            </IconButton>
          )}
          <IconButton color='inherit' sx={{ml:1}} onClick={() => ({})} >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <SearchBar />}
          <div>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ): (
              <Button color='inherit' component={Link} to={`/profile/${user.id}`} className={classes.linkButton} onClick={()=>({})}>
                {!isMobile && <>My Profile &nbsp;</>}
                <Avatar style={{ width: 30, height: 30}} alt="profile" src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' />
              </Button>
            )}
          </div>
          {isMobile && <SearchBar />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          { isMobile ? (
             <Drawer variant='temporary' anchor='right' open={mobileOpen} onClose={()=>(setMobileOpen((prev)=>(!prev)))} classes={{paper: classes.drawerPaper}} ModalProps={{keepMounted: true}}>
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
