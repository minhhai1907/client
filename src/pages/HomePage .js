import { Alert, Box, Container, Grid, Pagination, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import LoadingScreen from "../components/LoadingScreen";
import ProductFilter from "../components/ProductFilter";
import ProductSearch from "../components/ProductSearch";
import ProductSort from "../components/ProductSort";
import { useForm } from "react-hook-form";
import { FormProvider } from "../components/form";
import orderBy from "lodash/orderBy";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { POSTLIST_PER_PAGE } from "../app/config";
import { getAllPosts } from "../features/post/postSlice";

const defaultValues = {
  category: "All",
  priceRange: "",
  sortBy: "featured",
  searchQuery: "",
};

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const[page,setPage]=useState(1);

  const {currentPage,totalPosts,postList}=useSelector((state)=>({
    currentPage:state.post.currentPage,
    totalPosts:state.post.totalPosts,
    postList:state.post.postList,
  }),shallowEqual)
  
  const totalPages=Math.ceil(totalPosts/POSTLIST_PER_PAGE);
  const dispatch=useDispatch();
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const methods = useForm({ defaultValues });
  const { watch, reset } = methods;
  // derived state
  const filters = watch();
  const filteredProducts = applyFilter(postList, filters);
  useEffect(()=>{
    dispatch(getAllPosts(page))
  },[dispatch,page])
  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Grid container spacing={3}>
      <Grid item sx={6} md={2}>
      <Stack>
        <FormProvider methods={methods}>
          <ProductFilter resetFilter={reset} />
        </FormProvider>
      </Stack>
      </Grid>
        <Grid item sx={6} md={10}>
      <Stack sx={{ flexGrow: 1 }}>
        <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <ProductSearch />
            <ProductSort />
          </Stack>
        </FormProvider>      
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <ProductList postList={filteredProducts} />              
              )}
            </>
          )}
        </Box>
        {totalPosts>POSTLIST_PER_PAGE &&(
          <Typography display="flex" justifyContent="flex-end" sx={{mx:1}}>
     <Pagination
     count={totalPages}
     page={currentPage}
     onChange={handleChangePage}  
     />
     </Typography>)}
      </Stack>
      </Grid>
      </Grid>   
    </Container>
  );
}

function applyFilter(products, filters) {
  let filteredProducts = products;
  if (filters.category !== "All") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === filters.category
    );
  }

  if (filters.priceRange) {
    filteredProducts = filteredProducts.filter((product) => {
      if (filters.priceRange === "below") {
        return product.price < 100;
      }
      if (filters.priceRange === "between") {
        return product.price >= 100 && product.price <= 500;
      }
      if (filters.priceRange === "above") {
        return product.price > 500;
      }
    });
  }

  if (filters.searchQuery) {
    filteredProducts = filteredProducts.filter((product) =>
     {
       return product.title.toLowerCase().includes(filters.searchQuery.toLowerCase())}
    );
  }
  if (filters.sortBy === "featured") {
    filteredProducts = orderBy(filteredProducts, ["sold"], ["desc"]);
  }
  if (filters.sortBy === "newest") {
    filteredProducts = orderBy(filteredProducts, ["createdAt"], ["desc"]);
  }
  if (filters.sortBy === "priceDesc") {
    filteredProducts = orderBy(filteredProducts, ["price"], ["desc"]);
  }
  if (filters.sortBy === "priceAsc") {
    filteredProducts = orderBy(filteredProducts, ["price"], ["asc"]);
  }
  return filteredProducts;
}

export default HomePage;




