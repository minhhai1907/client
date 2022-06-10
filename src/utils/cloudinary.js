import {
   REACT_APP_CLOUDINARY_CLOUD_NAME,
  REACT_APP_CLOUDINARY_UPLOAD_PRESET
  } from "../app/config";
  import axios from "axios";
  
  export const cloudinaryUpload = async (image) => {
    if (!image) return "";
    console.log(image)
    try {
      const formData = new FormData();
     
      formData.append("file", image);
      formData.append("upload_preset", REACT_APP_CLOUDINARY_UPLOAD_PRESET);
      console.log(formData)
      console.log(formData.append)
      const response = await axios("https://api.cloudinary.com/v1_1/dge62qnrd/image/upload",{
       
        method: "POST",
        body: formData,
       
      });
      // const response = await axios({
      //   url: `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      //   method: "POST",
      //   data: formData,
      //   headers: { "content-type": "multipart/form-data" },
      // });
      console.log(response)
      const imageUrl = response.data.secure_url;
      return imageUrl;
    } catch (error) {
      console.log(error)
      throw error;
    }
  };
 