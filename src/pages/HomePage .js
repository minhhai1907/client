import { Alert, Box, Container, Grid, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
// import Logo from "../components/Logo";
import ProductFilter from "../components/ProductFilter";
import ProductSearch from "../components/ProductSearch";
import ProductSort from "../components/ProductSort";
import { useForm } from "react-hook-form";
import { FormProvider } from "../components/form";
import orderBy from "lodash/orderBy";

const defaultValues = {
  // gender: [],
  category: "All",
  priceRange: "",
  sortBy: "featured",
  searchQuery: "",
};

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const methods = useForm({ defaultValues });
  const { watch, reset } = methods;
  // derived state
  const filters = watch();
  console.log(products);
  const filteredProducts = applyFilter(products, filters);
console.log(filteredProducts)
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await apiService.get("/posts/user/62906c34ffc364545ca311cb");
        console.log(response )
        setProducts(response.data);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getProducts();
  }, []);

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
                <ProductList products={filteredProducts} />
              )}
            </>
          )}
        </Box>
      </Stack>
      </Grid>
      </Grid>
    </Container>
  );
}

function applyFilter(products, filters) {
  let filteredProducts = products;

  // if (filters.gender.length) {
  //   filteredProducts = filteredProducts.filter((product) =>
  //     filters.gender.includes(product.gender)
  //   );
  // }

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
    
     {console.log(product.title)
       return product.title.toLowerCase().includes(filters.searchQuery.toLowerCase())}
     
    );
  }
  console.log(filteredProducts)
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
console.log(filteredProducts)
  return filteredProducts;
}

export default HomePage;




// import React, { useState } from 'react'
// import useAuth from '../hooks/useAuth';

// function HomePage () {
//   const {user}=useAuth();
//   const {currentTab,setCurrentTab}=useState("shop");
//   const handleChangeTab=(newValue)=>{
//     setCurrentTab(newValue);
//   };

//   const PROFILE_TABS=[
//     {
//       value:"shop",

//     },
//     {
//       value:"ho",

//     },
//     {
//       value:"shop",

//     },
//     {
//       value:"shop",

//     },
//   ]
//   return (
//     <div>
//      <h1> Home page </h1>
//     </div>
//   )
// }

// export default HomePage 
