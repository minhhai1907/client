import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Link,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { fCurrency } from "../utils/NumberFormat";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
// import useCartContext from "../hooks/useCartContext";
import CommentList from "../features/comment/CommentList"
import CommentForm from "../features/comment/CommentForm"
import Map from "../components/Map";
import { API_GOOGLE_KEY } from "../app/config";

function DetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const { dispatch } = useCartContext();

  useEffect(() => {
    if (params.id) {
      const getPost = async () => {
        setLoading(true);
        try {
          console.log(`this is ${params.id}`)
          const response = await apiService.get(`/posts/${params.id}`);
          // console.log(response)
          setProduct(response.data);
          setError("");
          // console.log(params.id)
        } catch (error) {
          setError(error.message);
          console.log(`this is ${error.message}`) 
        }
        
        setLoading(false);
      };
      getPost();
    }
}, [params]);
console.log(params.id)

  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          SwapTo
        </Link>
        <Typography color="text.primary">{product?.title}</Typography>
      </Breadcrumbs>
      <Box sx={{ position: "relative", height: 1 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {product ? (
                  <Card>
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        <Box p={2}>
                          <Box
                            sx={{
                              borderRadius: 2,
                              overflow: "hidden",
                              display: "flex",
                            }}
                          >
                            <img
                              src={product.image}
                              width="100%"
                              height="100%"
                              alt="product"
                            />
                          </Box>
                        
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                     
                        {/* <Typography
                          variant="h6"
                          sx={{
                            mt: 2,
                            mb: 1,
                            display: "block",
                            textTransform: "uppercase",
                            color:
                              product.status === "sale"
                                ? "error.main"
                                : "info.main",
                          }}
                        >
                          {product.status}
                        </Typography> */}
                        <Typography variant="h5" paragraph sx={{my:1}}>
                          {product.content}
                        </Typography>
                       
                        {/* <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ mb: 2 }}
                        >
                        
                        </Stack> */}
                        <Typography variant="h4" sx={{ my:3 }}>
                          <Box
                            component="span"
                            sx={{
                              color: "text.disabled",
                              textDecoration: "line-through",
                            }}
                          >
                           
                      
                          </Box>
                          &nbsp;{fCurrency(product.price)}
                        </Typography>
                        
                        <Divider sx={{ borderStyle: "dashed" }} />
                        <Typography variant="h6" paragraph sx={{my:1}}>
                          {product.category}
                        </Typography>

                        <Divider sx={{ borderStyle: "dashed" }} />
                        <Box>
                          <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            children={product.description}
                          />
                        </Box>
                        <Divider sx={{ borderStyle: "dashed" }} />
                        <Box sx={{ my: 3 }}>
                          {/* <Button
                            variant="contained"
                            // onClick={() =>
                            //   dispatch({ type: "ADD", payload: product })
                            // }
                          >
                            message
                          </Button> */}
                          <CommentList productId={params.id}/>
                          <CommentForm productId={params.id}/>
                          
                        </Box>
                        
                      </Grid>
                      
                    </Grid>
                    {/* <Box>
                    <Map googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_GOOGLE_KEY}&callback=initMap`}
            loadingElement={<div style={{ height: "100% "}} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: `100%` }} />}/></Box> */}
                  </Card>
                ) : (
                  <Typography variant="h6">Product not found!</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
      
    </Container>
  );
}

export default DetailPage;
