import React, {Fragment, useEffect, useState} from 'react'

import { Link, Route, useLocation } from 'react-router-dom';
// import Search from './Search';
    import './style.css';
import { useDispatch, useSelector} from 'react-redux';
    
import { logout } from "../../actions/userActions";
import { useAlert } from 'react-alert'
    
const HeaderB = () => {

const location = useLocation ()
    
        
     const [toggleInput, setToggleInput] = useState(false)

      const [toggleUser, setToggleUser] = useState(false)

      const { cartItems } = useSelector(state => state.cart)
    
      const alert = useAlert()
      const dispatch = useDispatch()
    
      const {user, loading } = useSelector(state => state.auth)
    
    const logoutHandler = () =>{
      dispatch(logout())
      alert.success("Logged out successfully.")
    }

    

   useEffect(() => {
   
    if(location){
        setToggleUser(false)
        setToggleInput(false)
    }

   }, [location])
  
    const handleToggleUser = () => {
      setToggleUser(prev => {
     return (  !prev)
      })
    }
  
    const handleToggle = () => {
      setToggleInput(prev => {
     return (  !prev)
      })
    }
    return (
<Fragment>
     
            { location.pathname !== '/admin/'  && (
               
                <div>
            <div className="navb">
            <div className='navContainer' >
                <div className="headerImage">
                    <Link to="/"><img src="/images/logo4.png" alt="" width="250px" height="50px"/></Link>
                </div>

                <nav className="rowNav">

                     <div  className="inputDiv">
                      <input style={{display: toggleInput ? 'block' : 'none'}}  type="text"  />
                       <i  onClick={handleToggle} className="fa fa-search"></i>
                     </div>

                    <div className="dropdown" >
                       { user ?    <div className="spanUser" > <img   onClick={handleToggleUser} className="userImage  " src={user?.avatar?.url} alt="Profile" /></div>
                       

                       :
                       <i  onClick={handleToggleUser} className="userIcon fa fa-user"></i> 
                    
                       }
                     <div  style={{display: toggleUser ? 'block' : 'none'}}  className="dropdown-content">
                   {    user ? <Fragment>
                                <Link to="/me"> <li>{user?.name}</li></Link>
                            {   user?.role === 'admin' && ( <Link to="/dashboard"> <li>Dashboard</li></Link>)}
                                <Link to="/orders/me"> <li>Orders</li></Link>
                                <Link  onClick={logoutHandler}  to="/"> <li style={{color:'red'}} >Logout</li></Link>

                             </Fragment>

                         :

                            <Fragment>
                                <Link to="/login"> <li>Login</li></Link>
                                <Link to="/register" > <li>Register</li></Link>
                                
                            </Fragment>
                   }

                     </div>
                     </div>
                    <div  className="cartContainer"  >
                     <Link to="/cartB" ><i class="fa fa-shopping-cart"></i></Link>
                     
                      <span class="numberCircle">{cartItems?.length}</span>
                    </div>
                    
                </nav>
                
                </div>
            </div>


  
        </div>
            )}

            
        </Fragment>   
    )
}

export default HeaderB
