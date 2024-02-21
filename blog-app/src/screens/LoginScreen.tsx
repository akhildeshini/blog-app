import { Box, Button, TextField, Typography, } from "@mui/material";
import { useState,useContext } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
type loginApi={
    email:string;
    password:string;
}
const LoginScreen=()=>{
    const navigate=useNavigate();
    const loginContext=useContext(DataContext); 
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [errors,setErrors]=useState({
        email:'',
        password:''
    });
    const [apiError,setApiError]=useState('');
    const handleSubmit=()=>{
        if(errors.email==='' && errors.password==='')
        {
            loginMuatation.mutate({email,password});
        }

    }

    const loginMuatation=useMutation({
        mutationKey:['login_post'],
        mutationFn:async(loginDetails:loginApi)=>{
            const res=await axios.post('http://localhost:5000/api/login',loginDetails)
            const data=res.data;
            return data;
        },
        onSuccess:(data)=>{

            loginContext.updateData(data.token);
            setTimeout(()=>{
                navigate('/dashboard');
            },1000)
         
        },
        onError:(err:any)=>{
            setApiError(err.response.data.message);
        }
    })
    
    const validate=(value:string,name:string)=>{
        let error=false;
        
        if(name==='email')
        {
            if(value.trim().length===0)
            {
                error=true;
                    setErrors((prev)=>({...prev,email:'Please Enter a Email'}));
            }
            else {
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

                if (!emailRegex.test(value)) {
                    error = true;
                    setErrors((prev) => ({ ...prev, email: 'Please Enter a Valid Email' }));
                  } else {
                    setErrors((prev) => ({ ...prev, email: '' }));
                  }
            }
        }
        else if(name==='password')
        {
            if(value.trim().length===0)
            {
                error=true;
                    setErrors((prev)=>({...prev,password:'Please Enter a Password'}));
            }
            else if(value.trim().length<6)
            {
                error=true;
                    setErrors((prev)=>({...prev,password:'Password should be atleast 6 characters'}));
            }
            else {
                error=false;
                setErrors((prev) => ({ ...prev, password: '' }));
              }
        }
        return error;
    }
    const handleDisabled=()=>{
         if(email!=='' && password!=='' && errors.password==='' && errors.email==='')
         return false;
        return true;
    }
    return <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#34ebcf',height:'100vh'}}>
    <Box sx={{display:'flex',flexDirection:'column',backgroundColor:'white',padding:'40px',borderRadius:'1rem'}}>
    <Typography variant="h1" sx={{marginLeft:'auto',marginRight:'auto',marginBottom:'1rem'}}>Login</Typography>
        <TextField variant='outlined' placeholder="email" sx={{marginBottom:'1rem',width:'400px'}}  onChange={(e)=>setEmail(e.target.value)} value={email} onBlur={()=>validate(email,'email')} error={errors.email!==''} helperText={errors.email}/>
        <TextField variant='outlined' type="password" placeholder="password" sx={{marginBottom:'1rem',width:'400px'}} onChange={(e)=>setPassword(e.target.value)} value={password} onBlur={()=>validate(password,'password')} error={errors.password!==''} helperText={errors.password}/>
        <Button variant="contained" disabled={handleDisabled()} sx={{width:'400px'}} onClick={handleSubmit}>Submit</Button>
        <Typography variant="h5" sx={{marginLeft:'auto',marginRight:'auto',marginBottom:'1rem',color:'red'}}>{apiError}</Typography>
        <Typography variant="h6">New here ? Create your Account  <Link to='/'>Signup here</Link> </Typography>
    </Box>
    </Box>
}
export default LoginScreen;