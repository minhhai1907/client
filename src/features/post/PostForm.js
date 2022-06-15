
import React, { useRef } from "react";
import { Box, Card, Stack } from "@mui/material";
import { FormProvider, FSelect, FTextField } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createPost } from "../post/postSlice";
import { LoadingButton } from "@mui/lab";

const defaultValues = {
  content: "",
  image: null,
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
    const file=fileInput.current.files[0];
    data.image=file;
    dispatch(createPost(data)).then(() => reset());
  };
  const handleFile=(e)=>{
    const file=fileInput.current.files[0];
    if (file){
      setValue("image",file)
    }
  }

  return (
    <Card sx={{p:3 }} >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
            <Box
            sx={{
              display:"auto",
              rowGap:3,
              columnGap:2,
              gridTemplateColumns:{
                xs:"repeat(1,1tr)",
                sm:"repeat(2,1tr)",
              },
            }}
            >
              <input type="file" ref={fileInput} onChange={handleFile} accept="image/*"/>
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
                Create
              </LoadingButton>
            </Stack>
            </FormProvider>
          </Card>          
  );
}
export default PostForm;

