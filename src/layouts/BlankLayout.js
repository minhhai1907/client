import { Avatar, Stack } from '@mui/material'
import { height } from '@mui/system'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../components/logo'

function BlankLayout() {
  return (
 <Stack minHeight="100vh" justifyContent="center" alignItems="center">
   <Avatar sx={{boderRadius:"50%", width :90 ,height:90}} >
     <Logo sx={{width:90, height:90}}/>
     </Avatar>
     <Outlet/>
 </Stack>
  )
}

export default BlankLayout
