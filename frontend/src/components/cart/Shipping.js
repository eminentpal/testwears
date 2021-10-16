import React, { Fragment, useState} from 'react'
import { Link } from 'react-router-dom'

import { countries } from 'countries-list'
import MetaData from "../layout/MetaData"
import {useDispatch, useSelector} from 'react-redux'
import { saveShippingInfo } from "../../actions/cartActions";
import CheckoutSteps from './CheckoutSteps'
 
 const Shipping = ({history}) => {

   const {shippingInfo} = useSelector(state => state.cart)


   // we use that function to pull out the countries  from the key eg US: { Name: "USA", City: "new york"} US is the key and the rest is its value.
 const countriesList = Object.values(countries)

   //by default we have saved our address in the localstorage of shippinginfo

   const [address, setAddress] = useState(shippingInfo.address)
   const [city, setCity] = useState(shippingInfo.city)
   const [postalCode, setPostcalCode] = useState(shippingInfo.postalCode)
   const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
   const  [country, setCountry] = useState(shippingInfo.country)

   const dispatch = useDispatch()

   const submitHandler = (e) => {
       e.preventDefault()
       dispatch(saveShippingInfo({address, city, phoneNo, postalCode, country}))
       history.push('/order/confirm')
   }

   const checkoutHandler = () => {

   }

     return (
         <Fragment>
          <MetaData title={'shippingInfo'} />
          <CheckoutSteps  shipping />
          <div className="row wrapper">

   
              <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostcalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                                   { 
                                      countriesList.map(country => (
                                 <option key={country.name} value={country.name} >
                                       {country.name}
                                    
                                    </option>

                                
                                      )
                                  
                                  
                                
                                      )   
                                }
                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                          
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
                </div>
         </Fragment>
     )
 }
 
 export default Shipping
 