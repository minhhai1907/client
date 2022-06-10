import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "../features/comment/commentSlice";
// import applicationReducer from "../features/application/applicationSlice";
import postReducer from "../features/post/postSlice";
import userReducer from "../features/user/useSlice";

const rootReducer = {
  comment: commentReducer,
  post: postReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;