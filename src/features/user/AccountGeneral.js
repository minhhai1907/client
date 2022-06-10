import React, { useCallback } from 'react'
import {Box,Grid,Card,Stack,Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import useAuth from "../../hooks/useAuth";

import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormProvider,FTextField, FUploadAvatar} from "../../components/form";
import {useDispatch,useSelector} from "react-redux";
import {updateUserProfile} from "./useSlice";
import { fData } from '../../utils/NumberFormat';


// const updateUserSchema=yup.object().shape({
//   image:yup.string().required("image is required")
// });

function AccountGeneral() {
  const {user}=useAuth();
  const isLoading=useSelector((state)=>state.user.isLoading);
  const defaultValues={
    name: user?.name||"",
    email: user?.email||"",
    avatarUrl: user?.avatarUrl||"",
    aboutMe: user?.aboutMe||"",
    city: user?.city||"",
    country: user?.country||"",

  }
console.log(user)
  const methods=useForm({
    // resolver:yupResolver(updateUserSchema),
    defaultValues,
  });
  const {
    setValue,
    handleSubmit,
    formState:{isSubmitting}
  }=methods;

  const dispatch=useDispatch();
  const onSubmit=async (data)=>{
    alert("hello");
     dispatch(updateUserProfile({userId:user._id,...data}))
     console.log(data)
   }
  

  // const handleDrop=useCallback(
  //   (acceptedFiles)=>{
  //   const file=acceptedFiles[0];
  //   if(file){
  //     setValue(
  //       "avatarUrl",
  //       Object.assign(file,{
  //         preview:URL.createObjectURL(file),
  //       })

  //     );
  //   }
  // },
  // [setValue]
  // );
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
                              // display: "flex",
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
           {/* <FUploadAvatar
           name="avatarUrl"
           accept="image/*"
           maxSize={3145728}
           onDrop={handleDrop}
           helperText={
             <Typography
             variant='caption'
             sx={{
               mt:2,
               mx:"auto",
               display:"block",
               textAlign:"center",
               color:"text.secondary",
             }}
             >
               Allowed *.jpeg,*.jpg,*.png,*.gif
               <br/>max size of {fData(3145728)}
               </Typography>
           }
           /> */}
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
              <FTextField name="name" label="Name"/>
              <FTextField name="email" label="Email" disabled/>

              <FTextField name="city" label="City"/>
              <FTextField name="country" label="Country"/>
              <FTextField name="avatarUrl" label="AvatarUrl"/>

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
