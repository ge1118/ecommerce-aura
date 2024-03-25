import React, { useEffect } from 'react'
import './ProductList.scss'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../sharedComponents/Loader/Loader'
import Message from '../../sharedComponents/Message/Message'
import { listProducts, deleteProduct, createProduct } from '../../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../../constants/productConstants'
import Paginate from '../../sharedComponents/Paginate/Paginate'


const ProductList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get('keyword');
    const pageQuery = searchParams.get('page');

    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const productCreate = useSelector(state => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });

        if (!userInfo.isAdmin) {
            navigate('/login');
        }

        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`);
        } else {
            dispatch(listProducts(keyword, pageQuery));
        }
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, pageQuery]);

    const deleteHandler = (id) => {
        if (window.confirm('Delete this product?')) {
            dispatch(deleteProduct(id));
        }
    };

    const createProductHandler = () => {
        dispatch(createProduct());
    };

    return (
        <div className='productlist'>
            <h1>Products</h1>
            <hr />

            <button onClick={createProductHandler}>
                <i className='fas fa-plus' /> Create Product
            </button>

            {loadingDelete && <Loader />}
            {errorDelete && <Message bgcolor='#ca7e7e' txtcolor='#fff'>{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message bgcolor='#ca7e7e' txtcolor='#fff'>{errorCreate}</Message>}

            {loading ?
                <Loader /> :
                error ? <Message bgcolor='#ca7e7e' txtcolor='#fff'>{error}</Message> :
                    (
                        <>
                            <table className="products-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>BRAND</th>
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
                                                    <button className='edit' onClick={() => navigate(`/admin/product/${product._id}/edit`)}>
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
                            <Paginate pages={pages} page={page} isAdmin={true} adminmenu={'product'} />
                        </>
                    )
            }
        </div>
    )
}

export default ProductList
