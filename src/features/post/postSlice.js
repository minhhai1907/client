import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { POSTS_PER_PAGE } from "../../app/config";
import {cloudinaryUpload} from "../../utils/cloudinary"

const initialState = {
  isLoading: false,
  error: null,
  posts:[],
  currentPost:{},
  postById:{},
 
};
// const initialState = {
//   isLoading: false,
//   error: null,
//   posts:[],
//   postsById: {},
//   currentPagePosts: [],
// };

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
    // createPostSuccess(state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   const newPost=action.payload;
    //   if ((state.currentPagePosts.length + 1) % POSTS_PER_PAGE === 0)
    //     state.currentPagePosts.pop();
    //   state.postsById[newPost._id]=newPost;
    //   state.currentPagePosts.unshift(newPost)
     
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
      const { posts, count } = action.payload;
      state.posts=posts;
      // state.posts=state.posts.concat(posts);
      state.totalPosts=count;
    },
    getPostByIdSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.postById=action.payload;
    },
    // getPostsSuccess(state, action) {
    //   state.isLoading = false;
    //   state.error = null;

    //   const { posts, count } = action.payload;
    //   console.log(posts,count)
    //   posts.forEach((post) => {
    //     state.postsById[post._id] = post;
    //     if (!state.currentPagePosts.includes(post._id))
    //       state.currentPagePosts.push(post._id);
    //   });
    //   state.totalPosts = count;
    // },

  },
});

export const createPost =
  ({ content, image,title,description,price,category }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    console.log(category,image)
    try {
      const data={
        content,
        // image,
        title,
        description,
        price,
        category,

      }
    
        console.log(image)
      const imageUrl= await cloudinaryUpload(image);
      console.log(imageUrl)
      data.image=imageUrl;
      const response = await apiService.post("/posts",{data} );
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
      console.log(params,userId)
      const response = await apiService.get(`/posts/postList/${userId}?page=${page}`, {
        params,
      });
      console.log(response.data)
      dispatch(slice.actions.getPostsSuccess(response.data));
      console.log(response.data)
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export const getPostById =
  (postId) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
     
      const response = await apiService.get(`/posts/${postId}`);
      console.log(response.data)
      dispatch(slice.actions.getPostByIdSuccess(response.data));
      console.log(response.data)
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
      console.log(postId)
      const response = await apiService.delete(`/posts/${postId}`);
      console.log(postId)
      dispatch(slice.actions.deletePostsSuccess(response.data));
      console.log(response.data)
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
