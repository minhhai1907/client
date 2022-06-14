import { Grid } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";

function ProductList({postList}) {

  return (
    <>
    <Grid container spacing={2} mt={1} minHeight="100vh"> 
      {postList.map((product) => (
        <Grid item key={product._id} xs={12} md={6} lg={4}>
          <ProductCard product={product} />
        </Grid>      
      ))}         
    </Grid> 
     </>
  );
}
export default ProductList;
