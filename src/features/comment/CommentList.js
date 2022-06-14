import React,{useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import { COMMENT_PER_POST } from '../../app/config';
import {getComments} from "./commentSlice";
import {Stack,Typography,Pagination} from "@mui/material"
import CommentCard from './CommentCard';
import LoadingScreen from "../../components/LoadingScreen"


function CommentList({productId}) {
  const{
    commentsByPost,
    commentsById,
    totalComments,
    isLoading,
    currentPage
  }=useSelector(
    (state)=>({
      commentsByPost:state.comment.commentsByPost[productId],
      commentsById:state.comment.commentsById,
      totalComments:state.comment.totalCommentsByPost[productId],
      currentPage:state.comment.currentPageByPost[productId]||1,
      isLoading:state.comment.isLoading,
    }),
    shallowEqual
  );
  const totalPages=Math.ceil(totalComments/COMMENT_PER_POST);
  const dispatch=useDispatch();

  useEffect(()=>{
    if(productId) dispatch(getComments({productId}))
  },[productId,dispatch])

  let renderComments;
  if(commentsByPost){
    const comments =commentsByPost.map((commentId)=>commentsById[commentId]);
    renderComments=(
      <Stack spacing={1.5}>
        {comments.map((comment)=>(
          <CommentCard key={comment._id} comment={comment}/>
        ))}
      </Stack>
    );
  }else if(isLoading){
    renderComments=<LoadingScreen/>;
  }
  return (
    <Stack spacing={1.5}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle" sx={{color:"text.secondary"}}>
          {totalComments>1
          ?`${totalComments} comments`
          :totalComments===1
          ?`${totalComments} comment`
        :"No comment"
        }
        </Typography>
        {totalComments>COMMENT_PER_POST&&(
          <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e,page)=>dispatch(getComments({productId,page}))}
          />
        )}
      </Stack>
      {renderComments}
    </Stack>
  )
}

export default CommentList
