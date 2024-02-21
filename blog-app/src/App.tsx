import './App.css'
import { Routes,Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import DashboardScreen from './screens/DashboardScreen';
import SingleDashboard from './screens/SingleDashboard';
import CreatePost from './screens/CreatePost';
import EditPost from './screens/EditPost';
function App() {


  return (
    <>
  <Routes>
  <Route path='/' element={<SignupScreen/>}/>
    <Route path='/login' element={<LoginScreen/>}/>

    <Route path='/dashboard' element={<DashboardScreen/>}/>
    <Route path='/dashboard/:id' element={<SingleDashboard/>}/>
    <Route path='/edit/:id' element={<EditPost/>}/>
    <Route path='/create' element={<CreatePost/>}/>
  </Routes>
    </>
  )
}

export default App
