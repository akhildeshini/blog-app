import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import authAxios from "../service/httpService";

const UpdatePost=()=>{
    const navigate=useNavigate();
    const loginContext=useContext(DataContext); 
    const [title,settitle]=useState('');
    const [description,setdescription]=useState('');
    const [image,setimage]=useState('');
    const [errors,setErrors]=useState({
        title:'',
        description:'',
    });
    const [apiError,setApiError]=useState('');
    const handleSubmit=()=>{
        if(errors.title==='' && errors.description==='')
        {
            loginMuatation.mutate({title,description,image});
        }

    }

    const loginMuatation=useMutation({
        mutationKey:['login_post'],
        mutationFn:async(PostDetails:{
            title:string;
            description:string;
            image?:string
        })=>{
            const res=await authAxios.post('http://localhost:5000/posts/create',PostDetails)
            const data=res.data;
            loginContext.updateData(data.token);
            return data;
        },
        onSuccess:()=>{
            navigate('/dashboard');
        },
        onError:(err:any)=>{        
            console.log('err',err);  
            setApiError(err.response.data.message);
        }
    })
    
    const validate=(value:string,name:string)=>{
        let error=false;
        
        if(name==='title')
        {
            if(value.trim().length===0)
            {
                error=true;
                    setErrors((prev)=>({...prev,title:'Please Enter a title'}));
            }
            else {
                    error=false;
                    setErrors((prev) => ({ ...prev, title: '' }));
                
            }
        }
        else if(name==='description')
        {
            if(value.trim().length===0)
            {
                error=true;
                    setErrors((prev)=>({...prev,description:'Please Enter a description'}));
            }
            else {
                error=false;
                setErrors((prev) => ({ ...prev, description: '' }));
              }
        }
        return error;
    }
    const handleDisabled=()=>{
         if(title!=='' && description!=='' && image!=='' && errors.description==='' && errors.title==='')
         return false;
        return true;
    }
    return(
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#34ebcf',height:'100vh'}}>
    <Box sx={{display:'flex',flexDirection:'column',backgroundColor:'white',padding:'40px',borderRadius:'1rem',width:'48%'}}> 
       
    <Typography variant="h1" sx={{marginLeft:'auto',marginRight:'auto',marginBottom:'3rem'}}>Create Post</Typography>
    <Grid sx={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',width:'100%'}}>
    <TextField variant='outlined' type="text" placeholder="image" sx={{marginBottom:'1rem',width:'100%'}} onChange={(e)=>setimage(e.target.value)} value={image} onBlur={()=>validate(image,'image')}/>
        <TextField variant='outlined' placeholder="title" sx={{marginBottom:'1rem',width:'100%'}}  onChange={(e)=>settitle(e.target.value)} value={title} onBlur={()=>validate(title,'title')} error={errors.title!==''} helperText={errors.title}/>
        </Grid>
        <TextField variant='outlined'
        multiline={true}
        rows={15}
        type="text" placeholder="description" sx={{marginBottom:'1rem',width:'100%'}} onChange={(e)=>setdescription(e.target.value)} value={description} onBlur={()=>validate(description,'description')} error={errors.description!==''} helperText={errors.description}/>
        <Button variant="contained" disabled={handleDisabled()} sx={{width:'300px',marginLeft:'auto',marginRight:'auto'}} onClick={handleSubmit}>Submit</Button>
        <Typography variant="h5" sx={{marginLeft:'auto',marginRight:'auto',marginBottom:'1rem',color:'red'}}>{apiError}</Typography>
    </Box>
    </Box>
    )
}
export default UpdatePost;