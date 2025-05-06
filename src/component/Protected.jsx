/* eslint-disable no-unused-vars */
 
// import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

 
 

const Protected = ({children}) => {
    const { user } = useContext(UserContext);
   const[cookie,setcookie]=useCookies(['token'])
    
    if(user){ 
        return children
    } else{
        return <Navigate to={"/login"}/>
    }
   
    
}

export default Protected