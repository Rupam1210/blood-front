 
import './App.css';
import {BrowserRouter as Router,Route,Routes} from  'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Protected from './component/Protected';
import { UserContextProvider } from './context/UserContext';
import Donar from './pages/dashboard/Donor';
import Hospiital from './pages/dashboard/Hospiital';
import Orgpage from './pages/dashboard/Orgpage';
import Analytics from './pages/dashboard/Analytics';
 
import Request from './pages/dashboard/Request';
import Orgrequest from './pages/Orgrequest';
import Admin from './pages/Admin';
import Hospitallist from './pages/admin/Hospitallist';
import Orglist from './pages/admin/Orglist';
import DonarList from './pages/admin/DonorList';
import Inventory from './pages/dashboard/Inventory';
import BloodCamp from './pages/dashboard/Bloodcamp';
import Guest from './pages/guest';
 
export const API=axios.create({baseURL:process.env.REACT_APP_API_URL})
// console.log(process.env.REACT_APP_API_URL)

function App() {

  return (
    <>
    <UserContextProvider>
    <Router>
    <ToastContainer/>
      <Routes>
      
        {/* <Route exact path='/' element={
        <Protected>
           <Home/>
        </Protected>
     }/>
     <Route exact path='/guest' element={
        <Guest/>
                   
     }/>
     <Route exact path='/donor' element={
        <Protected>
           <Donar/>
        </Protected>
     }/>
     <Route exact path='/bloodcamp' element={
         
           <BloodCamp/>
       
     }/>
      <Route exact path='/invent' element={
        <Protected>
           <Inventory/>
        </Protected>
     }/>
     <Route exact path='/hospital' element={
        <Protected>
           <Hospiital/>
        </Protected>
     }/>
      <Route exact path='/request' element={
        <Protected>
           <Request/>
        </Protected>
     }/>
     <Route exact path='/org-request' element={
        <Protected>
           <Orgrequest/>
        </Protected>
     }/>
     <Route exact path='/organisation' element={
        <Protected>
           <Orgpage/>
        </Protected>
     }/>
     <Route exact path='/analytics' element={
        
           <Analytics/>
        
     }/>
     <Route exact path='/hospital-list' element={
        <Protected>
           <Hospitallist/>
        </Protected>
     }/>
      <Route exact path='/org-list' element={
        <Protected>
           <Orglist/>
        </Protected>
     }/>
      <Route exact path='/donor-list' element={
        <Protected>
           <DonarList/>
        </Protected>
     }/>
      <Route exact path='/admin' element={
        <Protected>
           <Admin/>
        </Protected>
     }/> */}
     <Route exact path='/' element={
 
           <Home/>
         
     }/>
     <Route exact path='/guest' element={
        <Guest/>
                   
     }/>
     <Route exact path='/donor' element={
       
           <Donar/>
        
     }/>
     <Route exact path='/bloodcamp' element={
         
           <BloodCamp/>
       
     }/>
      <Route exact path='/invent' element={
       
           <Inventory/>
         
     }/>
     <Route exact path='/hospital' element={
     
           <Hospiital/>
       
     }/>
      <Route exact path='/request' element={
        
           <Request/>
        
     }/>
     <Route exact path='/org-request' element={
        
           <Orgrequest/>
         
     }/>
     <Route exact path='/organisation' element={
        
           <Orgpage/>
        
     }/>
     <Route exact path='/analytics' element={
        
           <Analytics/>
        
     }/>
     <Route exact path='/hospital-list' element={
       
           <Hospitallist/>
        
     }/>
      <Route exact path='/org-list' element={
      
           <Orglist/>
      
     }/>
      <Route exact path='/donor-list' element={
    
           <DonarList/>
    
     }/>
      <Route exact path='/admin' element={
       
           <Admin/>
       
     }/>
       
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
      </Routes>
    </Router>
    </UserContextProvider>
    
     
    </>
    
  );
}

export default App;
