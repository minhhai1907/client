import {
  Alert,
  Box,
  Breadcrumbs,
  Card,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
  Avatar,
  Stack,
  IconButton
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { fCurrency } from "../utils/NumberFormat";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import CommentList from "../features/comment/CommentList"
import CommentForm from "../features/comment/CommentForm"
import Map from "../components/Map";
import { API_GOOGLE_KEY } from "../app/config";
// import GoogleMaps from "../components/GoogleMaps";
// import { ChakraProvider, theme } from '@chakra-ui/react'
import {fDate} from "../utils/TimeFormat"

function DetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (params.id) {
      const getPost = async () => {
        setLoading(true);
        try {
          const response = await apiService.get(`/posts/${params.id}`);
          setProduct(response.data);
          setError("");
        } catch (error) {
          setError(error.message);
        }       
        setLoading(false);
      };
      getPost();
    }
}, [params]);
  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          SwapTo
        </Link>
        {/* <Typography color="text.primary">{product?.title}</Typography> */}
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
                          <Stack direction="row">
                            <IconButton onClick={()=>navigate(`/user/${product.author?._id}`)}>
                            <Avatar src={product.author?.avatarUrl} alt={product.author?.name} />
                            </IconButton>
                            <Typography variant="h6" sx={{m:1}}>{product.author?.name}</Typography>  
                        
                                              
                          </Stack>
                          <Typography variant='caption' sx={{color:"text.disabled", ml:6,mt:1}} >
                        {fDate(product.createdAt)}
                        </Typography>
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
                    {/* <ChakraProvider theme={theme}>
                        <GoogleMaps />
                    </ChakraProvider>                      */}
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>                                
                        <Typography variant="h5" paragraph sx={{my:1}}>
                          {product.content}
                        </Typography>               
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
