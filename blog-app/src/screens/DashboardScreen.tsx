import { Typography, Box, Button, Grid, Paper, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import authAxios from "../service/httpService";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
const DashboardScreen=()=>{
  const navigate=useNavigate();
  const {isLoading,data}=useQuery({
    queryKey:['fetch_posts'],
    queryFn:async()=>{
      try{
        const res=await authAxios.get('http://localhost:5000/posts');
        const data=res.data;
        return data;
      }
      catch(err)
      {
        console.log(err);
        throw new Error('Something went wrong');
      }
    },
    staleTime:0

  });
  if(isLoading)
  {
    return <Box sx={{height:'100vh',width:'100vw',alignItems:'center',justifyContent:'center',border:'1px solid red',display:'flex'}}>
      <CircularProgress/>
    </Box>
  }
    return <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:'2rem'}}>
      <Header/>
  {data.map((val:any)=>{
    return(
  <Paper elevation={3} sx={{borderRadius:'1.5rem',width:'70%',marginTop:'2rem'}} key={val.title} >
     <Grid sx={{gridTemplateColumns:'1fr 1fr',display:"grid",height:'600px'}}>
      <Grid item >
      <img src={val.image} style={{width:'100%',maxHeight:'600px'}} alt='photo img'/>
      </Grid>
      <Grid item  >
  <Typography variant="h2" sx={{marginTop:'1rem',marginLeft:'auto',marginRight:'auto',width:'90%'}} >{val.title}</Typography>
  <Typography variant="h5" sx={{marginLeft:'auto',marginRight:'auto',width:'90%',marginTop:'2rem'}} >{val.description?val.description.slice(0,300)+"...":''}</Typography>
     <Button variant="contained" sx={{marginLeft:'5%',marginTop:'1.5rem'}} onClick={()=>navigate(`/dashboard/${val.id}`)}>Read More</Button>
      </Grid>
    
     </Grid>
     </Paper>)})}
    </Box>
}
export default DashboardScreen;