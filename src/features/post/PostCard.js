import { Alert, Box, Breadcrumbs, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Divider, Grid, IconButton, Stack, Typography } from '@mui/material'
import React,{useState} from 'react'
import { fCurrency } from '../../utils/NumberFormat';
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from '../../components/LoadingScreen';
import ReactMarkdown from 'react-markdown';
import CommentList from '../comment/CommentList';
import CommentForm from '../comment/CommentForm';
import { useParams, Link as RouterLink } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { deletePost} from './postSlice';


function PostCard({post}) {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch=useDispatch();
  return (

<Container sx={{ my: 3 }}>
      
      <Box sx={{ position: "relative", height: 1 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {post ? (
                  <Card>
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        <Box p={2}>
                          <Box
                            sx={{
                              borderRadius: 3,
                              overflow: "hidden",                  
                              height:"50vh"
                            }}
                          >
                            <img
                              src={post.image}
                              width="100%"
                              height="100%"
                              alt="product"                     
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>      
                        <Typography variant="h5" paragraph display="flex" justifyContent="flex-end">                                               
                          <IconButton
                          size='small'
                          sx={{ color: "grey" }}
                          onClick={() =>
                            navigate(`/posts/myPost/update/${post._id}`)
                           }
                          >
                            <EditIcon />
                   
                          </IconButton>
                          <IconButton
                          size='small'
                          sx={{ color: "red" }}
                          onClick={() =>
                            dispatch(deletePost({post}))
                          }
                          >
                           <DeleteForeverIcon />
                          </IconButton>
                        </Typography>
                        <Typography color="text.primary" variant='h6' sx={{ml:1}}>{post?.title}</Typography>
                        
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ mb: 2 }}
                        >                      
                        </Stack>
                        <Typography variant="h4" sx={{ mb: 3 }}>                       
                          &nbsp;{fCurrency(post.price)}
                        </Typography>                       
                        <Divider sx={{ borderStyle: "dashed" }} />
                        <Typography sx={{m:1}}>
                         {post.category}
                        </Typography>
                        <Divider sx={{ borderStyle: "dashed" }} />
                        <Box sx={{ml:1}}>
                          <ReactMarkdown                         
                            children={post.description}                       
                          />
                        </Box>
                        <Divider sx={{ borderStyle: "dashed" }} />
                        <Box sx={{ my: 2 }}>                          
                          <CommentList productId={post._id}/>
                          <CommentForm productId={post._id}/>
                        </Box>                       
                      </Grid>                     
                    </Grid>                   
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
  )
}

export default PostCard
