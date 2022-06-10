import { Avatar, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import {fDate, fDateTime, fToNow} from "../../utils/TimeFormat"

function CommentCard({comment}) {
  return (
   <Stack direction="row" spacing={2}>
       <Avatar src={comment.author?.avatarUrl} alt={comment.author?.name}/>
       <Paper sx={{p: 1.5, flexGrow:1,bgcolor:"background.neutral"}}>
           <Stack
           direction="row"
           alignItems={{sm:"center"}}
           justifyContent="space-between"
           sx={{mb:0.5}}
           >
            <Typography variant='subtitle2' sx={{fontWeight:600}} >
            {comment.author?.name}
            </Typography>
            <Typography variant='caption' sx={{color:"text.disabled"}} >
            {fToNow(comment.createdAt)}
            </Typography>
            {/* <Typography variant='caption' sx={{color:"text.disabled"}} >
            {fDateTime(comment.createdAt)}
            </Typography> */}
           </Stack>
           <Typography variant='body2' sx={{color:"text.secondary"}} >
            {comment.content}
            </Typography>
            

       </Paper>
   </Stack>
  )
}

export default CommentCard
