import React from "react"; 
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import AccountPage from "../pages/AccountPage";
import DetailPage from "../pages/DetailPage";
import FavouritePage from "../pages/FavouritePage";
import HomePage from "../pages/HomePage ";
import LoginPage from "../pages/LoginPage";
import MyPostPage from "../pages/MyPostPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import AuthRequire from "./AuthRequire";
import UpdatePostPage from "../pages/UpdatePostPage"




function Router(){
    return (
        <Routes> 
        <Route path="/" element={<AuthRequire><MainLayout/></AuthRequire>}>
            <Route index element={<HomePage/>}/>
            <Route path="me" element={<AccountPage/>}/>
            <Route path="/posts/:id" element={<DetailPage />} />
            <Route path="/user/favourite" element={<FavouritePage />} />
            <Route path="/posts/myPost/update/:postId" element={<UpdatePostPage/>} />
            <Route path="/posts/myPosts" element={<MyPostPage />} />
           
        
        </Route>
        <Route element={<BlankLayout/>}>
            <Route path="login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
          
        </Route>
       
        </Routes>
    );

}
export default Router;