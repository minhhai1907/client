// import { Container, Grid, Stack } from "@mui/material";
// import PostForm from "../features/post/PostForm";
// import PostList from "../features/post/PostList";
// import useAuth from "../hooks/useAuth";
// import ProductList from "../components/ProductList"
import React,{useState,useEffect} from "react";
import {useDispatch} from "react-redux";
import PostList from "../features/post/PostList";
import {getPosts} from "../features/post/postSlice"
import useAuth from "../hooks/useAuth";


function MyPostPage() {

  // const dispatch=useDispatch();
  // const [page,setPage]=useState(1);
  const { user } = useAuth();
  console.log(user)
  const userId=user._id
  console.log(userId)
  // useEffect(()=>{
  //   if(userId) dispatch(getPosts({userId,page}))
  // },[dispatch,page,userId])
  return (
 <PostList userId= {userId}/>
  );
  };
export default MyPostPage;
