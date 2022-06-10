import { alpha, Avatar, Box, Card, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { FormProvider, FTextField } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPost } from "../post/postSlice";
import * as Yup from "yup";
import { spacing } from "@mui/system";


const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  city: "",
  country: "",
};

const Profile = ({ user }) => {
  const { isLoading } = useSelector((state) => state.post);

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    alert(JSON.stringify(data))
    console.log(`data:${data}`)
    // dispatch(createPost(data)).then(() => reset());
  };

  return (
    <Container sx={{ width: "90%", m: "1rem auto" }}>
      <Card sx={{ padding: "1.75rem" }}>
        {/* <Box
          sx={{
            display: "flex",
            // flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        > */}
            <Grid container spacing={2}>
                <Grid item xs={4}>
                <Box
            sx={{
            //   bgcolor: "#fab1a0",
            //   height: { md: "35vh", xs: "25vh" },
            //   width: "90%",
            //   borderRadius: "10px",
            //   border: "5px solid #fff",
            //   position: "relative",
            //   mb: "5rem",
            }}
          >
            <Box
              sx={{
                // position: "absolute",
                // bottom: 0,
                // left: "50%",
                // transform: " translate(-50%,50%)",
              }}
            >
              {!user.avatarUrl ? (
                <Stack>
                <Avatar
                  sx={{ backgroundColor: "#ffa502", width: 200, height: 200 }}
                >
                  <PersonIcon color="action" sx={{ fontSize: "120px" }} />
                </Avatar>
                <Typography variant="h5">{user.email}</Typography>
                </Stack>
              ) : (
                <Avatar
                  alt={user.name}
                  src={user.avatarUrl}
                  sx={{ width: 150, height: 150, alignSelf: "start" }}
                />
              )}
            {/* <Typography variant="h4">{user.name}</Typography>
          <Typography variant="h6">{user.email}</Typography> */}
            </Box>
          </Box>
                </Grid>
                <Grid item xs={8}>
                {/* <Box>
          <Typography variant="h5">Name: {user.name}</Typography>
          <Typography variant="h5">Email: {user.email}</Typography>
          <Typography variant="h6">Avatar:{user.avatarUrl}</Typography>
          <Typography variant="h6">City: {user.city}</Typography>
          <Typography variant="h6">Aboutme:{user.aboutMe}</Typography>
          <Typography variant="h6">Country: {user.country}</Typography>
          <Typography variant="h6">Company:{user.company}</Typography>
          <Typography variant="h6">JobTitle: {user.jobtitle}</Typography>
          <Typography variant="h6">Facebok:{user.facebookLink}</Typography>
          <Typography variant="h6">Instagram: {user.instagramLink}</Typography>
          <Typography variant="h6">Linkedin:{user.linkedinLink}</Typography>
          <Typography variant="h6">Twitter:{user.twitterLink}</Typography>
         
          </Box> */}
          {/* <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name="content"
            multiline
            fullWidth
            rows={4}
            placeholder="Share what you are thinking here..."
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />

          <FTextField name="image" fullWidth  />
          <FTextField name="city" fullWidth >
          <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        />
          </FTextField>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Post
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card> */}
     <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1},
      }}
      noValidate
      autoComplete="off"
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      
        <TextField
          id="outlined-textarea"
          label="Name"
          placeholder={`${user.name}`}
          multiline
          fullWidth
        />
        <TextField
          id="outlined-textarea"
          label="City"
          placeholder={`${user.city}`}
          multiline
          fullWidth
        />
        <TextField
          id="outlined-textarea"
          label="Country"
          placeholder={`${user.country}`}
          multiline
          fullWidth
        />
        <TextField
          id="outlined-textarea"
          label="AvatarUrl"
          placeholder={`${user.avatarUrl}`}
          multiline
          fullWidth
        />
        <TextField
          id="outlined-textarea"
          label="Facebook"
          placeholder={`${user.facebookLink}`}
          multiline
          fullWidth
        />
        <TextField
          id="outlined-textarea"
          label="About me"
          placeholder={`${user.aboutMe}`}
          multiline
          fullWidth
        />
       <Box
            sx={{

              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting }
              // loading={isSubmitting || isLoading}
            >
              Update Account
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting }
              // loading={isSubmitting || isLoading}
            >
              Delete Account
            </LoadingButton>
          </Box>
 
       </FormProvider>
    </Box>
    
                </Grid>
            </Grid>
          
          
        {/* </Box> */}

        {/* <Typography
        //   sx={{ textIndent: "50px", textAlign: "justify", m: "1rem 0" }}
        >
          {user.aboutMe}
        </Typography> */}
      </Card>
    </Container>
  );
};

export default Profile;



// import { Avatar, Box, Card, Container, Typography } from "@mui/material";
// import React from "react";
// import PersonIcon from "@mui/icons-material/Person";

// const Profile = ({ user }) => {
//     console.log(user.name,user.email)
//   return (
//     <Container sx={{ width: "90%", m: "1rem auto" }}>
//       <Card sx={{ padding: "1.75rem" }}>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Box
//             sx={{
//               bgcolor: "#fab1a0",
//               height: { md: "35vh", xs: "25vh" },
//               width: "90%",
//               borderRadius: "10px",
//               border: "5px solid #fff",
//               position: "relative",
//               mb: "5rem",
//             }}
//           >
//             <Box
//               sx={{
//                 position: "absolute",
//                 bottom: 0,
//                 left: "50%",
//                 transform: " translate(-50%,50%)",
//               }}
//             >
//               {!user.avatarUrl ? (
//                 <Avatar
//                   sx={{ backgroundColor: "#7d7e7d", width: 200, height: 200 }}
//                 >
//                   <PersonIcon color="action" sx={{ fontSize: "90px" }} />
//                 </Avatar>
//               ) : (
//                 <Avatar
//                   alt={user.name}
//                   src={user.avatarUrl}
//                   sx={{ width: 150, height: 150, alignSelf: "start" }}
//                 />
//               )}
//              </Box>
//           </Box> 
 
           
//         </Box>

//         <Typography
//           sx={{ textIndent: "50px", textAlign: "justify", m: "1rem 0" }}
//         >
//           {user.aboutMe}
//         </Typography>
//       </Card>
//     </Container>
//   );
// };

// export default Profile;