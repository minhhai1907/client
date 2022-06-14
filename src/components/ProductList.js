import { Box, Button, Container, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { POSTLIST_PER_PAGE } from "../app/config";
import { getAllPosts } from "../features/post/postSlice";
import ProductCard from "./ProductCard";
import orderBy from "lodash/orderBy";
import { useForm } from "react-hook-form";


// function ProductList({ products}) {
//   return (
   
//     <Grid container spacing={2} mt={1}> 
//       {products.map((product) => (
//         <Grid item key={product.id} xs={12} md={6} lg={4}>
//           <ProductCard product={product} />
//         </Grid>
//       ))}   
//     </Grid> 
  
//   );
// }
// export default ProductList;

// const defaultValues = {
//   category: "All",
//   priceRange: "",
//   sortBy: "featured",
//   searchQuery: "",
// };


function ProductList() {

  const {currentPage,totalPosts,postList}=useSelector((state)=>({
    currentPage:state.post.currentPage,
    totalPosts:state.post.totalPosts,
    postList:state.post.postList,

  }),shallowEqual)
  const totalPages=Math.ceil(totalPosts/POSTLIST_PER_PAGE);
  const dispatch=useDispatch();
  const[page,setPage]=useState(1);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
//   // const methods = useForm({ defaultValues });
//   // const { watch, reset } = methods;
//   // const filters = watch();
//   // const filteredProducts = applyFilter(postList, filters);
  useEffect(()=>{
    dispatch(getAllPosts(page))
  },[dispatch,page])

  return (
    <>
    <Grid container spacing={2} mt={1} minHeight="100vh"> 
      {postList.map((product) => (
        <Grid item key={product._id} xs={12} md={6} lg={4}>
          <ProductCard product={product} />
        </Grid>      
      ))}   
       
    </Grid> 
        {totalPosts>POSTLIST_PER_PAGE &&(
          <Typography display="flex" justifyContent="flex-end" sx={{mx:1}}>
     <Pagination
     count={totalPages}
     page={currentPage}
     onChange={handleChangePage}
   
     />
     </Typography>)}
     </>
  );
}
// function applyFilter(postList, filters) {
//   let filteredProducts = postList;
//   if (filters.category !== "All") {
//     filteredProducts = filteredProducts.filter(
//       (product) => product.category === filters.category
//     );
//   }
//   if (filters.priceRange) {
//     filteredProducts = filteredProducts.filter((product) => {
//       if (filters.priceRange === "below") {
//         return product.price < 100;
//       }
//       if (filters.priceRange === "between") {
//         return product.price >= 100 && product.price <= 500;
//       }
//       if (filters.priceRange === "above") {
//         return product.price > 500;
//       }
//     });
//   }
//   if (filters.searchQuery) {
//     filteredProducts = filteredProducts.filter((product) => {
//        return product.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
//       }
//     );
//   }
//   if (filters.sortBy === "featured") {
//     filteredProducts = orderBy(filteredProducts, ["sold"], ["desc"]);
//   }
//   if (filters.sortBy === "newest") {
//     filteredProducts = orderBy(filteredProducts, ["createdAt"], ["desc"]);
//   }
//   if (filters.sortBy === "priceDesc") {
//     filteredProducts = orderBy(filteredProducts, ["price"], ["desc"]);
//   }
//   if (filters.sortBy === "priceAsc") {
//     filteredProducts = orderBy(filteredProducts, ["price"], ["asc"]);
//   }
//   return filteredProducts;
// }
// export default ProductList;
//   return (
   
//     <Grid container spacing={2} mt={1}> 
//       {products.map((product) => (
//         <Grid item key={product.id} xs={12} md={6} lg={4}>
//           <ProductCard product={product} />
//         </Grid>
//       ))}   
//     </Grid> 
  
//   );
// }
export default ProductList;
