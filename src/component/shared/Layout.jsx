import React from 'react'
import Navbar from './Navbar'
// import Sidebar from './Sidebar'
 

const Layout = ({children}) => {
  return (
   <>
    <Navbar/>
     <div className="flex">
        {/* <div   style={{backgroundColor:"#0B60B0"}}> 
          <Sidebar/>  
        
        </div> */}
        
        {/* <div className=" w-full mx-8 m-3  " style={{overflowX:"auto"}}  > {children}</div> */}
        <div className='w-full m-4' > {children}</div>
       
     </div>
   </>
  )
}

export default Layout