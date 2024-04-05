import React, { useEffect, useState } from 'react'
import './ProductList.scss'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../sharedComponents/Loader/Loader'
import Message from '../../sharedComponents/Message/Message'
import { listProducts, deleteProduct, createProduct } from '../../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../../constants/productConstants'
import Paginate from '../../sharedComponents/Paginate/Paginate'


const ProductList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [userKeyword, setUserKeyword] = useState('');
    const [order, setOrder] = useState('');

    const keyword = searchParams.get('keyword');
    const pageQuery = searchParams.get('page');

    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages, message } = productList;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const productCreate = useSelector(state => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });

        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        }

        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit?action=create`);
        } else {
            dispatch(listProducts(userKeyword, pageQuery, '', '', order));
        }
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, pageQuery, keyword, order]);

    const deleteHandler = (id) => {
        if (window.confirm('Delete this product?')) {
            dispatch(deleteProduct(id));
        }
    };

    const createProductHandler = () => {
        dispatch(createProduct());
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (userKeyword) {
            navigate(`${location.pathname}?keyword=${userKeyword}&page=1`);
        } else {
            navigate(location.pathname);
        };
    };

    const orderHandler = (newOrder) => {
        setOrder(prevOrder =>
            prevOrder === newOrder ? `-${newOrder}` : newOrder
        );
    };

    return (
        <div className='productlist'>
            <h1>Products</h1>
            <hr />

            {loadingDelete && <Loader />}
            {errorDelete && <Message bgcolor='#ca7e7e' txtcolor='#fff'>{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message bgcolor='#ca7e7e' txtcolor='#fff'>{errorCreate}</Message>}

            {loading ?
                <Loader /> :
                error ? <Message bgcolor='#ca7e7e' txtcolor='#fff'>{error}</Message> :
                    products.length !== 0 ?
                        (
                            <>
                                <div className='list-header'>
                                    <form onSubmit={submitHandler}>
                                        <input type="text" placeholder="Search.." onChange={(e) => setUserKeyword(e.target.value)}></input>
                                    </form>

                                    <button onClick={createProductHandler}>
                                        <i className='fas fa-plus' /> Create Product
                                    </button>
                                </div>

                                <div className='products-table-container'>
                                    <table className="products-table">
                                        <thead>
                                            <tr>
                                                <th onClick={() => orderHandler('_id')}>ID</th>
                                                <th onClick={() => orderHandler('name')}>NAME</th>
                                                <th onClick={() => orderHandler('price')}>PRICE</th>
                                                <th onClick={() => orderHandler('category')}>CATEGORY</th>
                                                <th onClick={() => orderHandler('brand')}>BRAND</th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                products.map(product => (
                                                    <tr key={product._id}>
                                                        <td>{product._id}</td>
                                                        <td>{product.name}</td>
                                                        <td>{product.price}</td>
                                                        <td>{product.category}</td>
                                                        <td>{product.brand}</td>
                                                        <td>
                                                            <button className='edit' onClick={() => navigate(`/admin/product/${product._id}/edit?action=edit`)}>
                                                                <i className='fas fa-edit'></i>
                                                            </button>
                                                            <button className='delete' onClick={() => deleteHandler(product._id)}>
                                                                <i className='fas fa-trash'></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <Paginate pages={pages} page={page} isAdmin={true} adminmenu={'product'} />
                            </>
                        ) : (
                            <Message bgcolor='#ca7e7e' txtcolor='#fff'>{message}</Message>
                        )
            }
        </div>
    )
}

export default ProductList
