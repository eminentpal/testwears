import React, {Fragment, useState, useEffect} from 'react';
import { Link} from 'react-router-dom';
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import {useDispatch, useSelector} from 'react-redux';
import Sidebar from './Sidebar';
import {newProduct, clearErrors, } from '../../actions/productActions';
import {useAlert} from 'react-alert'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';



const NewProduct = ({history}) => {

const [name, setName] = useState('')
const [price, setPrice] = useState(0)
const [description, setDescription] = useState('')
const [category, setCategory] = useState('Electronics')
const [stock, setStock] = useState(0)
const [seller, setSeller] = useState('')
const [images, setImages] = useState([])
const [imagesPreview, setImagesPreview] = useState([])


const categories =  ['Electronics',
                    'Cameras',
                    'Laptops',
                    'Accessories',
                    'Headphones',
                    'Food',
                    'Books',
                    'Clothes/Shoes',
                    'Beauty/Health',
                    'Sports',
                    'Outdoor',
                    'Home']

                    

                    const alert = useAlert()
                    const dispatch = useDispatch()
                    
                    
                    const { loading, error, success} = useSelector(state => state.newProduct)
                    
                    
                    useEffect(() => {
                    
                 
                    
                     if (error) { 
                          alert.error(error)
                          dispatch(clearErrors())
                        }
                    
                     if (success) {
                      history.push('/admin/products')
                      alert.success('Product Created')
                      dispatch({type: NEW_PRODUCT_RESET})
                     }
                    }, [dispatch, alert, success, error, history])
                    
                    
 


                    const submitHandler = (e) => {
                        e.preventDefault()
                    
                    const formData = new FormData();
                    formData.set('name', name);
                    formData.set('price', price);
                    formData.set('description', description)
                    formData.set('category', category)
                    formData.set('stock', stock)
                    formData.set('seller', seller)

                    images.forEach(image => {
                        formData.append('images', image)
                    })
                        dispatch(newProduct(formData))
                    }
                    
                    
                    
                       const onChange = e => {
                        
                        const files = Array.from(e.target.files)

                        //we put this sets cus we upload images multiple times
                        setImagesPreview([]); 
                        setImages([])

                        files.forEach(file => {
                            const reader = new FileReader()
                    
                           reader.onload = () => {
    
                               if(reader.readyState === 2){
                                   //we spread  it this way cus we expecting an array of images
                                   setImagesPreview(prevImage => [...prevImage, reader.result])
                                   setImages(prevImage => [...prevImage, reader.result])
                               console.log(imagesPreview)
                                }
                             
                           }
                          
                           reader.readAsDataURL(file)
                       
                        });
                           
                    }
                    
                       
                     
                    

    return (
        <Fragment>
        <MetaData title="New Products" />
          <div  className="row">
           <div className="col-12 col-md-2" >
            <Sidebar />
           </div>
           <div className="col-12 col-md-10" >
               <Fragment  >
              
              
               <div className="wrapper my-5"> 
        <form  onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
            <h1 className="mb-4">New Product</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                required
                className="form-control"
                value={name}
                onChange= {(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea required value={description}  onChange={(e) => setDescription(e.target.value)} className="form-control" id="description_field" rows="8" ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select onChange={(e) => setCategory(e.target.value)} value={category} className="form-control" id="category_field">
                    { categories.map(category => (
                    <option key={category} value={category} >{category}</option>
                    ))}
                    
      
                  </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                required
                  type="text"
                  id="seller_field"
                  className="form-control"
                  value={seller}
                  onChange={(e) =>setSeller(e.target.value)}
                />
              </div>
              
              <div className='form-group'>
                <label>Images</label>
                
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='product_images'
                            className='custom-file-input'
                            id='customFile'
                            required
                            multiple
                            onChange={onChange}
                        />
                        <label className='custom-file-label' for='customFile'>
                            Choose Images
                        </label>
                    </div>
                    {imagesPreview.map(img => (
                       
                       <img  src={img} key={img} className="mt-3 mr-2" alt="Image Preview" width='55' height='52' />
                     
                     
                    ))}
            </div>

  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled= {loading ? true : false}
            >
              CREATE
            </button>

          </form>
    </div>
        

               </Fragment>
           </div>
          </div>
        </Fragment>
    )
}

export default NewProduct
