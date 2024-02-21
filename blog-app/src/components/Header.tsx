import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
const Header=()=>{
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.clear();
        navigate('/login');
    }
    return (
        <AppBar position="static" sx={{backgroundColor:'black'}}>
        <Toolbar sx={{justifyContent:'space-between',display:'flex'}}>
          <Typography variant="h2" color={'white'} onClick={()=>navigate('/dashboard')}>Blog App</Typography>
          <Button variant="outlined" onClick={()=>navigate('/create')}>Create Post</Button>
          <Button variant="outlined" onClick={logout} sx={{color:'orange'}}>Log Out</Button>
        </Toolbar>
      </AppBar>
    )
}
export default Header;