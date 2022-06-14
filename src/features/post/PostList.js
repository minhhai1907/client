import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography,Pagination } from "@mui/material";
import { getPosts } from "./postSlice";
import PostCard from "./PostCard"
import PostForm from "./PostForm";
import { shallowEqual, useDispatch, useSelector, } from "react-redux";
import { POSTS_PER_PAGE } from "../../app/config";

function PostList( {userId} ) {
  const[page,setPage]=useState(1);
  const {currentPage,totalPosts,posts}=useSelector((state)=>(state.post
  ),shallowEqual)
  const totalPages=Math.ceil(totalPosts/POSTS_PER_PAGE);
  const dispatch=useDispatch();
  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  useEffect(()=>{
    if(userId) dispatch(getPosts({page,userId}))
  },[dispatch,page,userId])
 
  return (
    <Container >
      <Grid container spacing={3}>
       <Grid item sx={12} md={8}>
        {posts.map((post)=>(
        <PostCard key={post._id} post={post}/>
      ))} 
      <Box display="flex" justifyContent="flex-end" sx={{mr:3}}>

    {totalPosts>POSTS_PER_PAGE &&(
          <Typography display="flex" justifyContent="flex-end" sx={{mx:1}}>
     <Pagination
     count={totalPages}
     page={currentPage}
     onChange={handleChangePage}  
     />
     </Typography>)}
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

