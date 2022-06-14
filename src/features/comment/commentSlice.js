import {createSlice} from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { COMMENT_PER_POST } from "../../app/config";

const initialState={
    isLoading:false,
    error:null,
    commentsById:{},
    commentsByPost:{},
    currentPageByPost:{},
    totalCommentsByPost:{},
}
const slice=createSlice({
    name:"comment",
    initialState,
    reducers:{
        startLoading(state) {
            state.isLoading = true;
          },
      
          hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
          },
          createCommentSuccess(state,action){
              state.isLoading=false;
              state.error=null;
          },
          getCommentSuccess(state,action){
              state.isLoading=false;
              state.error=null;
              const {productId,count,comments,page}=action.payload;
              comments.forEach(
                  (comment)=>(state.commentsById[comment._id]=comment)
              );
              state.commentsByPost[productId]=comments.
              map((comment)=>comment._id)
              .reverse();
              state.totalCommentsByPost[productId]=count;
              state.currentPageByPost[productId]=page;
          },
        
    },
});
export default slice.reducer;
export const createComment=({content,productId})=>async(dispatch)=>{
    dispatch(slice.actions.startLoading());
    try {
      const response=await apiService.post("/comments",{
          content,
          productId
      })  
      dispatch(slice.actions.createCommentSuccess(response.data))
      dispatch(getComments({productId}))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
    }
}
export const getComments=
({productId,page=1,limit=COMMENT_PER_POST})=>
async(dispatch)=>{
    dispatch(slice.actions.startLoading());
    try {
        const params={
            page:page,
            limit:limit,
        }
      const response=await apiService.get(`/posts/${productId}/comments`,{
          params
      })  ;
      dispatch(slice.actions.getCommentSuccess({...response.data,productId,page}))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
    }
}