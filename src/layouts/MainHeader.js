
import React from 'react'
// import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
// import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import useAuth from '../hooks/useAuth';
import { Avatar, Divider } from '@mui/material';
import {Link as RouteLink, useNavigate} from 'react-router-dom'
import Logo from '../components/logo';
import FavouritePost from '../components/FavouritePost';

function MainHeader() {
  const {user,logout}=useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState(null);
    const navigate=useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleLogout=async()=>{
    try {
      handleMenuClose();
      await logout(()=>{
        navigate("/login");
      });
    } catch (error) {
      console.error(error)
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{my:1.5,px:2.5}}>
        <Typography variant='h6' noWrap>{user?.name}</Typography>
      </Box>
      <Divider sx={{borderStyle:"dashed"}}/>
      <MenuItem onClick={handleMenuClose} to="/posts/myPosts" component={RouteLink} sx={{mx:1}} >
        My Post
      </MenuItem>
      <MenuItem onClick={handleMenuClose} to="/me" component={RouteLink} sx={{mx:1}} >
       Account Settings
      </MenuItem>
      <Divider sx={{borderStyle:"dashed"}}/>
      <MenuItem onClick={handleLogout} sx={{m:1}}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <FavouritePost/>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ mb: 3 }} >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Avatar>
            <Logo />
            </Avatar>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'block', sm: 'block' } }}
          >
            SwapTo
          </Typography>      
          <Box sx={{ flexGrow: 1 }} />        
            <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
            <IconButton size='large'><FavouritePost/></IconButton>           
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"          
            >
           <Avatar src={user.avatarUrl} alt={user.name}/>
            </IconButton>
          </Box>      
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default MainHeader
