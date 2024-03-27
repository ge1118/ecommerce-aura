import React, { useEffect } from 'react'
import './ProductsList.scss'
import Product from '../Product/Product'
import Paginate from '../Paginate/Paginate'
import Loader from '../Loader/Loader'
import Message from '../Message/Message'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { listNewProducts, listProducts, listTopProducts } from '../../../actions/productActions'

const ProductsList = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { category } = useParams();
    const { subcategory } = useParams();

    const productList = useSelector(state => state.productList);
    const { error, loading, products, page, pages } = productList;

    const productTopRated = useSelector(state => state.productTopRated);
    const { loading: loadingTopProducts, error: errorTopProducts, products: topProducts } = productTopRated;

    const keyword = searchParams.get('keyword');
    const pageQuery = searchParams.get('page');

    const formatTitle = (urlParam) => {
        if (urlParam) {
            return urlParam
                .replace(/-/g, ' ')
                .split('+')
                .map(part => part
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ')
                )
                .join(' + ');
        } else {
            return urlParam;
        };
    };

    const encodeParam = (param) => {
        if (param) {
            return param.replace(/\+/g, '%2B');
        } else {
            return param;
        };
    };

    const formattedCategory = formatTitle(category);
    const formattedSubcategory = formatTitle(subcategory);
    const encodedCategory = encodeParam(formattedCategory);
    const encodedSubcategory = encodeParam(formattedSubcategory);

    useEffect(() => {
        dispatch(listProducts(keyword, pageQuery, encodedCategory, encodedSubcategory));
        dispatch(listTopProducts());
    }, [dispatch, keyword, pageQuery, encodedCategory, encodedSubcategory]);

    return (
        <div className='productslist'>
            <h1>
                {
                    (() => {
                        if (subcategory) return formattedSubcategory;
                        else if (category) return formattedCategory;
                        else if (location.pathname.startsWith('/products')) return 'All Products';
                        return 'Top Products';
                    })()
                }
            </h1>
            <hr />

            {
                (() => {
                    if (location.pathname.startsWith('/products')) return (
                        loading
                            ? <Loader />
                            : error
                                ? <Message bgcolor='#ca7e7e' txtcolor='#fff'>{error}</Message>
                                :
                                <>
                                    <div className="products">
                                        {products.map((product, i) => (
                                            <Product
                                                key={i}
                                                product={product}
                                                status={product.countInStock === 0 ?
                                                    'Out of Stock' :
                                                    product.onSale ?
                                                        'Sale' :
                                                        product.isNew ?
                                                            'New' :
                                                            null
                                                }
                                                color={product.countInStock === 0 ?
                                                    '#df4226' :
                                                    product.onSale ?
                                                        '#924a4d' :
                                                        product.isNew ?
                                                            '#8b7569' :
                                                            null
                                                } />
                                        ))}
                                    </div>
                                    <Paginate page={page} pages={pages} keyword={keyword} category={category} subcategory={subcategory} />
                                </>
                    );
                    return (
                        loadingTopProducts
                            ? <Loader />
                            : errorTopProducts
                                ? <Message bgcolor='#ca7e7e' txtcolor='#fff'>{errorTopProducts}</Message>
                                :
                                <>
                                    <div className="products">
                                        {topProducts.map((product, i) => (
                                            <Product
                                                key={i}
                                                product={product}
                                                status={product.countInStock === 0 ?
                                                    'Out of Stock' :
                                                    product.onSale ?
                                                        'Sale' :
                                                        product.isNew ?
                                                            'New' :
                                                            null
                                                }
                                                color={product.countInStock === 0 ?
                                                    '#df4226' :
                                                    product.onSale ?
                                                        '#924a4d' :
                                                        product.isNew ?
                                                            '#8b7569' :
                                                            null
                                                } />
                                        ))}
                                    </div>
                                </>
                    );
                })()
            }
        </div>
    )
}

export default ProductsList
