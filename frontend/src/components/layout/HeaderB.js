import React, {Fragment} from 'react'

import { Link, Route, useLocation } from 'react-router-dom';
// import Search from './Search';
    
import { useDispatch, useSelector} from 'react-redux';
    
import { logout } from "../../actions/userActions";
import { useAlert } from 'react-alert'
    
const HeaderB = () => {

const location = useLocation ()
    
  
    
      const { cartItems } = useSelector(state => state.cart)
    
      const alert = useAlert()
      const dispatch = useDispatch()
    
      const {user, loading } = useSelector(state => state.auth)
    
    const logoutHandler = () =>{
      dispatch(logout())
      alert.success("Logged out successfully.")
    }

    return (
<>
     
            { location.pathname !== '/admin/'  && (
                <div>
                <nav className="navb " >
            
            <div className="toolBar" >
        
                    <Link to='/'> <img className="logo"  className="img2"  src="/images/logo4.png" width="250px" height='30px'  alt='logo' /> </Link>
      
                    
                        <input className="inputSearch"  type='text' placeholder="Enter Product Name " />
                        <i className="fa searchIcon  fa-search"></i>
                    
                    <Fragment style={{marginLeft: '40px'}} className="ml-4 dropdown d-inline" >
                       
                      
                        <main  className="dropdown-menu " aria-labelledby="dropDownMenuButton" >
                        { user ? (
                            <Fragment>
                            <Link className='dropdown-item' to="/me">{user?.name}</Link>
                            {user?.role === 'admin' &&  (<Link className='dropdown-item' to="/dashboard">Dashboard</Link>) } 
                          
                             <Link className='dropdown-item' to="/orders/me">Orders</Link>
                           
                            <Link  onClick={logoutHandler} className="dropdown-item text-danger" to="/"  >
                                Logout
                            </Link>  
                             </Fragment>
                           
                   
                        ) :
                           
                             
                              <Fragment> <Link className='dropdown-item' to="/login">Login</Link>
                            <Link className='dropdown-item' to="/register">Register </Link>  </Fragment> }
                            

                        </main>

                
                        
                        
                        {user ? <img  type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"    src={user?.avatar?.url} className="rounded-circle  avata" alt="avatar"  /> : <i  f009 className="fa fa-user usericon userDiv  btn text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ></i>  }
 
                    
            
                    </Fragment>

                 
                 
                     
                         <span>  <Link  to='/cartB'> <i className="fa usericon fa-shopping-cart"   ></i></Link></span>
                            <span  className="cartLength" >{cartItems.length}</span>
                            
                   
                </div>

                 
                
            </nav>


        </div>

            )}

            
        </>   
    )
}

export default HeaderB
