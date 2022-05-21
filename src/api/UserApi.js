import React,{useEffect,useState} from 'react'
import axios from 'axios'
function UserApi() {
    const [users,setUsers]=useState([])
    const getUsers=async()=>{
        const res=await axios.get('/api/users')
        console.log(res)
    }
    useEffect(()=>{
        getUsers()
    },[])
  return {
    users:[users,setUsers]
}
}

export default UserApi
