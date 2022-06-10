// import React from 'react'

// function PostForm({product}) {
//   return (
//     <div>
//       PostForm
//     </div>
//   )
// }

// export default PostForm


import React, { useRef } from "react";
import { Box, Card, alpha, Stack, InputAdornment } from "@mui/material";

import { FormProvider, FSelect, FTextField } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createPost } from "../post/postSlice";
import { LoadingButton } from "@mui/lab";

// const yupSchema = Yup.object().shape({
//   image: Yup.string().required("image is required"),
// });

const defaultValues = {
  content: "",
  image: "",
  description:"",
  price:"",
  category:"",
  title:"",
};
const SORT_OPTIONS = [
  { value: "Home", label: "Home" },
  { value: "Electronic", label: "Electronic" },
  { value: "Books", label: "Books" },
  { value: "Toy&Game", label: "Toy&Game" },
  { value: "Fashion", label: "Fashion" },
];

function PostForm() {
  const { isLoading } = useSelector((state) => state.post);

  const methods = useForm({
    // resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const fileInput=useRef();

  const onSubmit= (data) => {
    console.log(data)
    dispatch(createPost(data)).then(() => reset());
console.log(data)
  };
  const handleFile=(e)=>{
// console.log(e.target.files)
// console.log(fileInput)
//     const file=e.target.files[0];
    const file=fileInput.current.files[0];
    console.log(file)
    if (file){
      setValue("image",file)
    }
  }

  return (
    
    <Card sx={{p:3 }} >
    {/* <Card sx={{p:3 , position:"fixed"}} > */}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}  enctype="multipart/form-data">
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
              {/* <FTextField name="image" label="Image"/> */}
              <input type="file" ref={fileInput} onChange={handleFile}/>
              <FTextField name="title" label="Title" />

              <FTextField name="content" label="Content"/>
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
              <FTextField name="description" multiline rows={4} label="Description"/>
              <LoadingButton
          type='submit'
          variant='contained'
          loading={isSubmitting||isLoading}
          >
          Post
          </LoadingButton>
            </Stack>
            </FormProvider>
          </Card>
          
  );
}

export default PostForm;

