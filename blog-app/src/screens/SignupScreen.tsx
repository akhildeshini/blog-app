import { Box, Button, TextField, Typography } from "@mui/material";
import { useState,useContext } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate,Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";
type loginApi={
    email:string;
    password:string;
    username:string
}
const SignupScreen=()=>{
    const navigate=useNavigate();
    const loginContext=useContext(DataContext); 
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [username,setUsername]=useState('');
    const [errors,setErrors]=useState({
        email:'',
        password:'',
        username:''
    });
    const [apiError,setApiError]=useState('');
    const handleSubmit=()=>{
        if(errors.email==='' && errors.password==='' && errors.username==='')
        {
            loginMuatation.mutate({email,password,username});
        }

    }

    const loginMuatation=useMutation({
        mutationKey:['login_post'],
        mutationFn:async(signupDetails:loginApi)=>{
            const res=await axios.post('http://localhost:5000/api/signup',signupDetails)
            const data=res.data;
            loginContext.updateData(data.token);
            return data;
        },
        onSuccess:(data)=>{
            loginContext.updateData(data.token);
            setTimeout(()=>{
                navigate('/dashboard');
            },1000)
        },
        onError:(err:any)=>{        
            console.log('err',err);  
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
        else
        {
            if(value.trim().length===0)
            {
                error=true;
                    setErrors((prev)=>({...prev,username:'Please Enter a Username'}));
            }
            else {
                error=false;
                setErrors((prev) => ({ ...prev, username: '', }));
              }
        }
        return error;
    }
    const handleDisabled=()=>{
         if(email!=='' && password!=='' && username!=='' && errors.password==='' && errors.email==='' && errors.username==='')
         return false;
        return true;
    }
    return <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#34ebcf',height:'100vh'}}>
    <Box sx={{display:'flex',flexDirection:'column',backgroundColor:'white',padding:'40px',borderRadius:'1rem'}}>
    <Typography variant="h1" sx={{marginLeft:'auto',marginRight:'auto',marginBottom:'1rem'}}>Sign up</Typography>
    <TextField variant='outlined' type="text" placeholder="username" name='username' sx={{marginBottom:'1rem',width:'400px'}} onChange={(e)=>setUsername(e.target.value)} value={username} onBlur={()=>validate(username,'username')} error={errors.username!==''} helperText={errors.username}/>
        <TextField variant='outlined' placeholder="email" sx={{marginBottom:'1rem',width:'400px'}}  onChange={(e)=>setEmail(e.target.value)} value={email} onBlur={()=>validate(email,'email')} error={errors.email!==''} helperText={errors.email}/>
        <TextField variant='outlined' type="password"  name='password' placeholder="password" sx={{marginBottom:'1rem',width:'400px'}} onChange={(e)=>setPassword(e.target.value)} value={password} onBlur={()=>validate(password,'password')} error={errors.password!==''} helperText={errors.password}/>
        <Button variant="contained" disabled={handleDisabled()} onClick={handleSubmit}>Submit</Button>
        <Typography variant="h5" sx={{marginLeft:'auto',marginRight:'auto',marginBottom:'1rem',color:'red'}}>{apiError}</Typography>
        <Typography variant="h6">Already have an account <Link to='/login'>Login here</Link> </Typography>
    </Box>
    </Box>
}
export default SignupScreen;