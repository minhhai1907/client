import React from "react";
import PostList from "../features/post/PostList";
import useAuth from "../hooks/useAuth";


function MyPostPage() {
  const { user } = useAuth();
  const userId=user._id
  return (
 <PostList userId= {userId}/>
  );
  };
export default MyPostPage;
