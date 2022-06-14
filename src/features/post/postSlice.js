import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { POSTS_PER_PAGE } from "../../app/config";
import {cloudinaryUpload} from "../../utils/cloudinary"
import { stringify } from "query-string";

const initialState = {
  isLoading: false,
  error: null,
  posts:[],
  currentPost:{},
  postById:{},
  currentPage:{},
  totalPosts:{},
  postList:[],
  userPostList:[],
  userTotalPosts:{},
  userCurrentPostPage:{}
};


const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newPost=action.payload;
      state.posts.unshift(newPost) 
    },
    deletePostsSuccess(state,action){
      state.isLoading=false;
      state.error=null;
      state.posts=state.posts.filter(
        (post)=>post._id!==action.payload._id
      );
    },
    updatePostSuccess(state,action){
      state.isLoading= false;
      state.error= null;
      state.currentPost={...action.payload};
    },
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { posts, count,page } = action.payload;
      state.posts=posts;
      state.totalPosts=count;
      state.currentPage=page;
    },
    getPostByIdSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.postById=action.payload;
    
    },
    getAllPostsSuccess(state, action){
      state.isLoading = false;
      state.error = null;
      const{posts,totalPages,page,count}=action.payload;
      state.postList=posts;
      state.totalPosts=count;
      state.currentPage=page;
    }
  },
});

export const createPost =
  ({ content, image,title,description,price,category }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data={
        content,
        title,
        description,
        price,
        category,
      }
      const imageUrl= await cloudinaryUpload(image);
      data.image=imageUrl;
      const response = await apiService.post("/posts",data );
      dispatch(slice.actions.createPostSuccess(response.data));
      toast.success("Post successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export const getPosts =
  ({ userId, page=1, limit = POSTS_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/posts/postList/${userId}?page=${page}`, {
        params,
      });
      dispatch(slice.actions.getPostsSuccess(response.data,page));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
  export const getAllPosts=(page=1)=>
  async (dispatch)=>{
    dispatch(slice.actions.startLoading());
    try {
      const query={page}
      const response = await apiService.get(`/posts/user/62906c34ffc364545ca311cb?${stringify(query)}`);
      dispatch(slice.actions.getAllPostsSuccess(response.data,page))
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const getPostById =
  (postId) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {     
      const response = await apiService.get(`/posts/${postId}`);
      dispatch(slice.actions.getPostByIdSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export const deletePost =
  ({post}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const postId=post._id;
      const response = await apiService.delete(`/posts/${postId}`);
      dispatch(slice.actions.deletePostsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));    
    }
  };
  export const updatePost =
  (
    { postId,
      content,
      title,
      description,
      price,
      category,
    }
  ) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data={content, 
        title,
        description,
        price,
        category,}     
      const response = await apiService.put(`/posts/${postId}`, data);
      dispatch(slice.actions.updatePostSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
  
export default slice.reducer;
