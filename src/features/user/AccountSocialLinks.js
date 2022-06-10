import React from 'react'
import { Stack,Card,InputAdornment} from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';




import { LoadingButton} from "@mui/lab"
import { useForm } from "react-hook-form"

import{useDispatch,useSelector} from "react-redux"
import {updateUserProfile} from "./useSlice"
import useAuth from '../../hooks/useAuth';
import { FormProvider, FTextField } from '../../components/form';

const SOCIAL_LINKS=[
  {
    value:"facebookLink",
    icon:<FacebookIcon sx={{fontSize:30,color:"#4267B2"}} />,
  },
  {
    value:"instagramLink",
    icon:<InstagramIcon sx={{fontSize:30,color:"#e1306c"}}/>,
  },
  {
    value:"linkedinLink",
    icon:<LinkedInIcon sx={{fontSize:30,color:"#0e76a8"}}/>,
  },
  {
    value:"twitterLink",
    icon:<TwitterIcon sx={{fontSize:30,color:"	#1DA1F2"}} />,
  },
]



function AccountSocialLinks() {
  const {user}=useAuth();
  console.log(user)
const isLoading=useSelector((state)=>state.user.isLoading)
console.log(isLoading)

  const defaultValues={
    facebookLink:user?.facebookLink||"",
    instagramLink:user?.instagramLink||"",
    linkedinLink:user?.linkedinLink||"",
    twitterLink:user?.twitterLink||"",
  };
  const methods=useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    formState:{isSubmitting}
  }=methods;

  const dispatch=useDispatch();
  
  const onSubmit=async (data)=>{
   alert("hello");
    dispatch(updateUserProfile({userId:user._id,...data}))
  }
  console.log(user._id)

  return (
    <Card sx={{p:1}}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">

          {SOCIAL_LINKS.map((link)=>(
           
            <FTextField
            key={link.value}
            name={link.value}
           
            InputProps={{
              startAdornment:(
                <InputAdornment position="start">{link.icon}</InputAdornment>
              ),
            }}
            />
          
))}
          <LoadingButton
          type='submit'
          variant='contained'
          loading={isSubmitting||isLoading}
          >
          Save Changes
          </LoadingButton>
        </Stack>

      </FormProvider>
    </Card>
  )
}

export default AccountSocialLinks
