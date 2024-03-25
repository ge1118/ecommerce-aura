import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../sharedComponents/Loader/Loader'
import Message from '../../sharedComponents/Message/Message'
import { listProductDetails, updateProduct, uploadImage } from '../../../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../../../constants/productConstants'
import './ProductEdit.scss'

const ProductEdit = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [onSale, setOnSale] = useState(false);
    const [salePercent, setSalePercent] = useState(0);
    const [uploading, setUploading] = useState(false);

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productDetails = useSelector(state => state.productDetails);
    const { error, loading, product } = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate;

    const categoryToSubcategories = {
        'Makeup': ['Blush', 'Eyes + Brows', 'Foundation', 'Lips', 'Brushes'],
        'Bath + Body': ['Body Lotion', 'Body Wash', 'Hand Cream', 'Fragrance', 'Soap'],
        'Skincare': ['Cleansers', 'Masks + Exfoliants', 'Moisturizers', 'Oils + Serums', 'Toners'],
        'Hair + Nails': ['Conditioner', 'Nails', 'Shampoo', 'Treatment + Styling'],
        'Wellness': ['Candles', 'Edible Beauty', 'Cleaning']
    };

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            navigate('/admin/productlist');
        } else {
            if (!product.name || product._id !== Number(id)) {
                dispatch(listProductDetails(id));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image_name);
                setBrand(product.brand);
                setCategory(product.category);
                setSubCategory(product.subCategory);
                setCountInStock(product.countInStock);
                setDescription(product.description);
                setOnSale(product.onSale);
                setSalePercent(product.salePercent);
            }
        }
    }, [dispatch, navigate, product, id, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(category, subCategory);
        if (!category || !subCategory) {
            alert('Please choose valid Category or subCategory!');
        } else {
            dispatch(updateProduct({
                _id: product._id,
                name,
                price,
                brand,
                category,
                subCategory,
                countInStock,
                description,
                onSale,
                salePercent,
            }));
        };
    };

    const uploadFileHandler = async (e) => {
        setUploading(true);

        const file = e.target.files[0];
        dispatch(uploadImage(file, id));

        setUploading(false);
    };

    return (
        <div className='productedit'>
            <h1>Product Edit</h1>
            <hr />

            <Link to='/admin/productlist'>Go Back</Link>

            {loadingUpdate && <Loader />}
            {errorUpdate && <Message bgcolor='#ca7e7e' txtcolor='#fff'>{errorUpdate}</Message>}

            {
                loading ? <Loader />
                    : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <form className="product-edit-form" onSubmit={submitHandler}>
                            <label>Name</label>
                            <input
                                type="text"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <label>Price</label>
                            <input
                                type="number"
                                name='price'
                                min='0'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <label>Image</label>
                            <input
                                type="text"
                                name='image'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <input className='file-upload' type="file" name='image'
                                onChange={uploadFileHandler} />
                            {uploading && <Loader />}

                            <label>Brand</label>
                            <input
                                type="text"
                                name='brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />

                            <label>Stock</label>
                            <input
                                type="number"
                                name='stock'
                                min='0'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            />

                            <label>Category</label>
                            <select name='category' onChange={(e) => setCategory(e.target.value)} value={category}>
                                <option disabled selected>Select...</option>
                                {
                                    Object.keys(categoryToSubcategories).map(category =>
                                        <option key={category} value={category}>{category}</option>
                                    )
                                }
                            </select>

                            <label>SubCategory</label>
                            {
                                !category ? (
                                    <select name='subcategory'>
                                        <option>Please select product's category</option>
                                    </select>
                                ) : (
                                    <select name='subcategory' onChange={(e) => setSubCategory(e.target.value)} value={subCategory}>
                                        <option selected value={null}>Select...</option>
                                        {
                                            categoryToSubcategories[category].map(subcategory => (
                                                <option key={subcategory} value={subcategory} >{subcategory}</option>
                                            ))
                                        }
                                    </select>
                                )
                            }

                            <label>Description</label>
                            <textarea
                                type="textarea"
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <div className="onsale">
                                <input
                                    type='checkbox'
                                    id='onSale'
                                    name='onSale'
                                    checked={onSale}
                                    onChange={(e) => setOnSale(e.target.checked)}
                                />
                                <label htmlFor='onSale'>Is this product on sale?</label>
                            </div>


                            {
                                onSale && (
                                    <>
                                        <label>Sale Percent</label>
                                        <input
                                            type="number"
                                            name='price'
                                            max='100'
                                            value={salePercent}
                                            onChange={(e) => setSalePercent(e.target.value)}
                                        />
                                    </>
                                )
                            }

                            <button type="submit">Update</button>
                        </form>
                    )
            }
        </div >
    )
}

export default ProductEdit
