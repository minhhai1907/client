import React, {  useRef } from 'react'
import {Box,Grid,Card,Stack} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import useAuth from "../../hooks/useAuth";
import {useForm} from "react-hook-form";
import {FormProvider,FTextField} from "../../components/form";
import {useDispatch,useSelector} from "react-redux";
import {updateUserProfile} from "./useSlice";

function AccountGeneral() {
  const {user}=useAuth();
  const isLoading=useSelector((state)=>state.user.isLoading);
  const defaultValues={
    name: user?.name||"",
    email: user?.email||"",
    avatarUrl:user?.avatarUrl||"",
    aboutMe: user?.aboutMe||"",
    city: user?.city||"",
    country: user?.country||"",
  }
  const methods=useForm({
    defaultValues,
  });
  const {
    setValue,
    handleSubmit,
    formState:{isSubmitting}
  }=methods;
  const dispatch=useDispatch();
  const fileInput=useRef();
  const onSubmit= async(data) => {
    const file=fileInput.current.files[0];
    data.avatarUrl=file;
    dispatch(updateUserProfile({userId:user._id,...data}));
  };
  const handleFile=(e)=>{
    const file=fileInput.current.files[0];
    if (file){
      setValue("avatarUrl",file)
    }
  }
  return (
   <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
     <Grid container spacing={3}>
       <Grid item sx={12} md={4}>
         <Card sx={{py:10,px:3,textAlign:"center"}}>
         <Box p={2}>
          <Box
            sx={{
              borderRadius: "50%",
              overflow: "hidden",                       
              height:"50vh"                         
            }}
          >
            <img
              src={user.avatarUrl}
              width="100%"
              height="100%"
              alt="avatar"                       
            />
          </Box>
          </Box>          
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
              <input type="file" ref={fileInput} onChange={handleFile} accept="image/*"/>
              <FTextField name="name" label="Name"/>
              <FTextField name="email" label="Email" disabled/>
              <FTextField name="city" label="City"/>
              <FTextField name="country" label="Country"/>
            </Box>
            <Stack spacing={3} alignItems="flex-end" sx={{mt:3}}>
              <FTextField name="aboutMe" multiline rows={4} label="AboutMe"/>
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
export default AccountGeneral
