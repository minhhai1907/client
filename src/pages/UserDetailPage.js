
import { Card, Container, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink, useNavigate} from "react-router-dom";
import apiService from "../app/apiService";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

function UserDetailPage() {
  const params = useParams();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (params.id) {
      const getUser = async () => {
        setLoading(true);
        try {
          const response = await apiService.get(`/users/${params.id}`);
          setUser(response.data);
          setError("");
        } catch (error) {
          setError(error.message);
        }       
        setLoading(false);
      };
      getUser();
    }
}, [params]);
  return (
   <Container>
        <Grid container spacing={3}>
       <Grid item sx={6} md={4}>
         <Card sx={{py:10,px:3,textAlign:"center"}}>
         <Box p={2}>
          <Box
            sx={{
              borderRadius: "50%",
              overflow: "hidden",                       
              height:"50vh"                         
            }}
          >
            <img
              src={user.avatarUrl}
              width="100%"
              height="100%"
              alt="avatar"                       
            />
            <Typography>{user.aboutMe}</Typography>
          </Box>
          </Box>          
         </Card>
       </Grid>
       <Grid item sx={6} md={8}>
          <Card sx={{p:3}}  >
            <Box
            sx={{
              display:"grid",
              rowGap:3,
              columnGap:2,
              gridTemplateColumns:{
                xs:"repeat(1,1tr)",
                sm:"repeat(2,1tr)",
              },
            }}
            >
             <Typography>{user.name}</Typography>
             <Typography>{user.email}</Typography>
             <Typography>{user.city}</Typography>
             <Typography>{user.country}</Typography>
             <Typography>{user.aboutMe}</Typography>
             <Typography>{user.facebookLink}</Typography>
             <Stack direction="row">
              <FacebookIcon sx={{fontSize:30,color:"#4267B2"}}  />            
              <InstagramIcon sx={{fontSize:30,color:"#e1306c"}}/>
              <LinkedInIcon sx={{fontSize:30,color:"#0e76a8"}}/>
              <TwitterIcon sx={{fontSize:30,color:"	#1DA1F2"}} />
             </Stack>          
            </Box>                  
          </Card>
       </Grid>
     </Grid>
   </Container>
  )
}

export default UserDetailPage
