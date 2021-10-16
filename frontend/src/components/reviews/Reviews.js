import React from 'react'
import { Fragment } from 'react'


const Reviews = ({reviews}) => {

  
  
reviews.map(rev => {

  
   console.log(rev.rating / 5 * 100)
   console.log(rev.user)
})
    
//TODO

//review.name does not change when name is updated to a new
//name on profile.


  
    return (
        <Fragment>
          
            <div class="reviews w-75">
            <h3>Other's Reviews:</h3>
            <hr />
            { reviews && reviews.map (review => (
                <div key={review._id} class="review-card my-3">
                    <div class="rating-outer">  
                        <div class="rating-inner"   style={{width: `${review.rating / 5 * 100}%`}} 
                         ></div>
                    </div>
                    <p class="review_user">by {review.name}</p>
                    <p class="review_comment">{review.comment}</p>

                    <hr />
                </div>

            )) } 
               
        </div> 
        </Fragment>
    )
}

export default Reviews
