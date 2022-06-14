import { Link, Typography } from '@mui/material'
import React from 'react'

function MainFooter() {
  return (
   <Typography variant='body2' color="test.secondary" align='center' p={1}>
     {"Copyright"}{" "}
     <Link color="inherit" href="https://google.com">
       Google©
     </Link>{" "}
     {new Date().getFullYear()}
     {"."}

   </Typography>
  );
}

export default MainFooter
