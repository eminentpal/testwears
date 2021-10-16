import React , {Fragment, useEffect} from 'react'

import MetaData from "../layout/MetaData"

import CheckoutSteps from './CheckoutSteps'

const Offline = () => {
    return (
       <div>
            <MetaData title={'Payment Method'} />
          <CheckoutSteps shipping  confirmOrder payment/>
             <div className="row wrapper">

		   <div className="col-10 col-lg-5">
            <main className="shadow-lg">
            <br/>
            
                  
                  <Fragment>
    
             <a  className="btn btn-block py-3" style={{textDecoration: 'none', color: '#FEBD69'}} href='/paymentmethod'> You are currently offline, kindly check your network connection and refresh page. </a>
    
                  </Fragment>

                  
              </main>
			  </div>
      </div>
      </div>
    )
}

export default Offline
