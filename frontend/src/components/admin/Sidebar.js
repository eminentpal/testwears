import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Media from "react-media";
const Sidebar = () => {
    const [toggle, setToggle] = useState(false)

    const Clicked = () => {
      setToggle(prev => (
          !prev
      ))
    }
   

   const MobileView = () => {
 

           return(
               
               <div  >

              
                {  !toggle && <i  onClick={Clicked} className="fa  fa-bars"></i>}
               <nav  style={{  display: toggle ? 'inherit' : 'none', }} id="sidebar" className="mobileSidebar">
               <i  onClick={Clicked} class="fa  fa-bars"></i> 

               

                      
                      <ul style={{ display:  toggle ? 'inline' : 'none' }} className="list-unstyled components"    >
                      
                    <li>
                        <Link to="/"><i className="fa fa-home"></i> Home</Link>
                    </li>
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>

                    
            
                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-product-hunt"></i> Products</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                            <Link to="/admin/products"><i className="fa fa-clipboard"></i> All</Link>
                            </li>
            
                            <li>
                            <Link to="/admin/product"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/orders"><i className="fa  fa-shopping-basket"></i> Orders</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li>

                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                    </li>
        
                </ul>
                
               
                </nav>
                </div>
               

    )}

   
    return (
        <>
           
           
        
            <div    className="  sidebar-wrapper">
            
  
                <nav  className="desktopSidebar" id="sidebar"> 
                      <ul  className="list-unstyled components"    >

                    <li>
                        <Link to="/"><i className="fa fa-home"></i> Home</Link>
                    </li>

                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>
            
                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-product-hunt"></i> Products</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                            <Link to="/admin/products"><i className="fa fa-clipboard"></i> All</Link>
                            </li>
            
                            <li>
                            <Link to="/admin/product"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/orders"><i className="fa  fa-shopping-basket"></i> Orders</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li>

                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                    </li>
        
                </ul>
                
               
                </nav>
                
               

              
            </div>
               
            <MobileView />
            
             
        
        </>
    )
}

export default Sidebar
