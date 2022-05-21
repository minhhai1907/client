import React from "react"; 
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import AccountPage from "../pages/AccountPage";
import HomePage from "../pages/HomePage ";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import PostDetailPage from "../pages/PostDetailPage";
import RegisterPage from "../pages/RegisterPage";
import AuthRequire from "./AuthRequire";




function Router(){
    return (
        <Routes> 
        <Route path="/" element={<MainLayout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="account" element={<AccountPage/>}/>
            <Route path="products/:productId" element={<PostDetailPage/>}/>
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