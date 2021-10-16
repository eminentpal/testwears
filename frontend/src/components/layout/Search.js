import React from 'react'
import { useState } from 'react'



const Search = ({history}) => {

const [keyword, setKeyword] = useState('')


const searchHandler = (e) =>{
    e.preventDefault()

    //.trim() will clear all the spaces in the keyword
    if(keyword.trim()) {
        history.push(`/search/${keyword}`)
    }
    else {
        history.push('/')
    }
}



    return (
     
            <form onSubmit={searchHandler} >
  <div className="input-group">
          <input
          onChange= {(e) => setKeyword(e.target.value)}
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Enter Product Name ..."
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
            </form>
      
    )
}

export default Search
