import {  Box, Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import authAxios from "../service/httpService";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
const SingleDashboard=()=>{
    const navigate=useNavigate();
    const {id}=useParams();
    const {isLoading,data}=useQuery({
        queryKey:['fetch_posts',id],
        queryFn:async()=>{
            const res=await authAxios.get(`http://localhost:5000/posts/${id}`);
            const data=res.data;
            return data;
        }
    
      });
      const tokenContext=useContext(DataContext);
      const token=tokenContext.token;
      const decoded:any = jwtDecode(token);
      if(isLoading)
      {
        return <Box sx={{height:'100%',width:'100%',alignItems:'center',justifyContent:'center'}}>
          <CircularProgress/>
        </Box>
      }
    return  <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:'2rem'}}>
             <Header/>
      <Paper elevation={3} sx={{borderRadius:'1.5rem',width:'90%',marginTop:'2rem'}}>
     <Grid>
      <Grid item >
      <img src={data.image} style={{width:'100%',maxHeight:'600px'}} alt='photo img'/>
      </Grid>
      {decoded.id.id===data.userId &&<Button variant="contained" sx={{marginLeft:'5%',width:'200px',marginTop:'0.5rem'}} onClick={()=>navigate(`/edit/${id}`)}>Edit Post</Button>}
      <Grid item  >
  <Typography variant="h2" sx={{marginTop:'1rem',marginLeft:'auto',marginRight:'auto',width:'90%',color:'teal'}} >{data.title}</Typography>
  <Typography variant="h5" sx={{marginLeft:'auto',marginRight:'auto',width:'90%',marginTop:'0.5rem'}} >{data.description}</Typography>

      </Grid>
     </Grid>
     </Paper>
        </Box>
}
export default SingleDashboard;