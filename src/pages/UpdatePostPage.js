import React, { useCallback, useEffect} from 'react'
import {Box,Grid,Card,Stack, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useForm} from "react-hook-form";
// import {yupResolver} from "@hookform/resolvers/yup";
import {FormProvider,FSelect,FTextField} from "../components/form";
import {useDispatch,useSelector} from "react-redux";
import { getPostById, updatePost } from '../features/post/postSlice';
import { useParams } from 'react-router-dom';
import BasicSelect from '../components/form/Select';

// import apiService from '../app/apiService';
// import { getSinglePost } from '../../controllers/post.controller';
// import LoadingScreen from '../components/LoadingScreen';
// import * as yup from "yup";
// import apiService from '../app/apiService';


// const updateUserSchema=yup.object().shape({
//   image:yup.string().required("image is required")
// });
const UpdatePostPage = () => {

  const { postId } = useParams();
  const { isLoading,postById } = useSelector((state) => state.post);

  const defaultValues={
    title: postById?.title||"",
    price: postById?.price||"",
    description: postById?.description||"",
    content: postById?.content||"",
    category: postById?.category||"",
    image:postById?.image||"",
  }
  
  
  // const [post, setPost] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  console.log(postById,postId)

  const methods=useForm({
    // resolver:yupResolver(updateUserSchema),
    defaultValues,
  });
  const {
    setValue,
    reset,
    handleSubmit,
    formState:{isSubmitting}
  }=methods;

  useEffect(()=>{
    dispatch(getPostById(postId));
  
  },[postId]);

  useEffect(()=>{
    if(Object.keys(postById).length){
      console.log(postById)
      reset({
        title: postById?.title||"",
        price: postById?.price||"",
        description: postById?.description||"",
        content: postById?.content||"",
        category: postById?.category||"",
        image:postById?.image||""
      })
    }
  },[postById])
  const SORT_OPTIONS = [
    { value: "Home", label: "Home" },
    { value: "Electronic", label: "Electronic" },
    { value: "Books", label: "Books" },
    { value: "Toy&Game", label: "Toy&Game" },
    { value: "Fashion", label: "Fashion" },
  ];
  


  const dispatch=useDispatch();
  const onSubmit= (data)=>{
  
    dispatch(updatePost({postId,...data}))
  }
  console.log(postId)

  const handleDrop=useCallback(
    (acceptedFiles)=>{
    const file=acceptedFiles[0];
    if(file){
      setValue(
        "avatarUrl",
        Object.assign(file,{
          preview:URL.createObjectURL(file),
        })

      );
    }
  },
  [setValue]
  );

  return (
   <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
     <Grid container spacing={3}>
       <Grid item sx={12} md={4}>
         <Card sx={{px:3,textAlign:"center"}}>
          
           <img
              src={postById.image}
              width="100%"
              height="100%"
              alt="product"
            />
         </Card>
       </Grid>
       <Grid item sx={12} md={8}>
          <Card sx={{p:3}}>
            <Box
            sx={{
              display:"grid",
              rowGap:3,
              columnGap:2,
              gridTemplateColumns:{
                xs:"repeat(1,1tr)",
                sm:"repeat(2,1tr)",
              },

            }}
            >
              <Typography textAlign="center" variant='h6'>Update Your Profile</Typography>
              <FTextField name="title" label="Title"/>
              <FTextField name="content" label="Content" />
              <FTextField name="price" label="Price"/>
              <FSelect name="category" size="large"   fullwidth>
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FSelect>
            

            </Box>
            <Stack spacing={3} alignItems="flex-end" sx={{mt:3}}>
              <FTextField name="description" multiline rows={3} label="Description"/>
              <LoadingButton
          type='submit'
          variant='contained'
          loading={isSubmitting||isLoading}
          >
          Save Changes
          </LoadingButton>
            </Stack>
        
          </Card>

       </Grid>
     </Grid>
   </FormProvider>
  )
}

export default UpdatePostPage

