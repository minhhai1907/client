import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./postSlice";
import PostCard from "./PostCard"
import PostForm from "./PostForm";

function PostList( {userId} ) {
  const [page, setPage] = useState(1);

const {posts,totalPosts,isLoading}=useSelector((state)=>state.post)
  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) dispatch(getPosts({ userId, page }));  
  }, [dispatch, userId, page]);
 

  return (
    <Container >
      <Grid container spacing={3}>
       <Grid item sx={12} md={8}>
      
       {posts.map((post)=>(
        <PostCard key={post._id} post={post}/>
      ))} 
      <Box display="flex" justifyContent="flex-end" sx={{mr:3}}>
      
     {totalPosts ?(
       <Box >
     
     <LoadingButton 
      variant="contained"
      size="small" 
      loading={isLoading}
     
      onClick={() => setPage((page) => page - 1)}
      >
        &lt;&lt; Back
        
      </LoadingButton>
      <LoadingButton 
      variant="contained"
      size="small" 
      loading={isLoading}
     
      onClick={() => setPage((page) => page + 1)}
      >
        Next &gt;&gt;
        
      </LoadingButton>
      </Box>
      ):(
      <Typography variant="h6">
        No Post Yet
        </Typography>
        )}
     </Box>
       </Grid>
       <Grid item sx={12} md={4}>
     <PostForm />
         

       </Grid>
     </Grid>
    
    </Container>
      
  );
}

export default PostList;

