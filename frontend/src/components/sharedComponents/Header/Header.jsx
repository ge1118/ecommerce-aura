import React, { useEffect, useState } from 'react'
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../../actions/userActions'

const Header = () => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [keyword, setKeyword] = useState('');

    const logoutHandler = () => {
        setIsUserVisible(false);
        setIsAdminVisible(false);
        dispatch(logout());
    };

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isAdminVisible, setIsAdminVisible] = useState(false);
    const [isUserVisible, setIsUserVisible] = useState(false);

    const handleAdminMenuClick = (e) => {
        e.stopPropagation();
        setIsAdminVisible(prev => !prev);
    };

    const handleUserMenuClick = (e) => {
        e.stopPropagation();
        setIsUserVisible(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = () => {
            setIsAdminVisible(false);
            setIsUserVisible(false);
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const submitHandler = (e) => {
        if (keyword && location.pathname.startsWith('/products')) {
            navigate(`${location.pathname}?keyword=${keyword}&page=1`);
        } else if (keyword && !location.pathname.startsWith('/products')) {
            navigate(`products/?keyword=${keyword}&page=1`);
        } else {
            navigate(location.pathname);
        };
    };

    return (
        <div className='header'>
            <div className="fixed-bar">
                <div className="header-top">
                    <form onSubmit={submitHandler} >
                        <input type="text" placeholder="Search.." onChange={(e) => setKeyword(e.target.value)}></input>
                    </form>

                    <ul>
                        {
                            userInfo ? (
                                <li onClick={handleUserMenuClick}>
                                    {userInfo.name}  <i className="fa-solid fa-angle-down"></i>
                                </li>
                            ) : (
                                <li>
                                    <Link to='/login'>Log In</Link>
                                </li>
                            )
                        }
                        <li>
                            <Link to='/cart'>Cart</Link>
                        </li>
                        {
                            userInfo && userInfo.isAdmin && (
                                <li onClick={handleAdminMenuClick}>
                                    Admin  <i className="fa-solid fa-angle-down"></i>
                                </li>
                            )
                        }

                        {
                            isAdminVisible ? (
                                <div className="admin-dropdown">
                                    <ul>
                                        <li>
                                            <Link to='/admin/userlist'>Users</Link>
                                        </li>
                                        <li>
                                            <Link to='/admin/productlist'>Products</Link>
                                        </li>
                                        <li>
                                            <Link to='/admin/orderlist'>Orders</Link>
                                        </li>
                                    </ul>
                                </div>
                            ) : null
                        }

                        {
                            isUserVisible ? (
                                <div className="user-dropdown">
                                    <ul>
                                        <li>
                                            <Link to='/profile'>Profile</Link>
                                        </li>
                                        <li onClick={logoutHandler}>
                                            Log Out
                                        </li>
                                    </ul>
                                </div>
                            ) : null
                        }
                    </ul>
                </div>

            </div>

            <div className="logo" onClick={() => navigate('/')}>
                <h1>Aura</h1>
                <h6>Natural energy</h6>
                <div className='divider'></div>
            </div>

            <div className='nav'>
                <ul>
                    <li>
                        <Link to='/'>HOME</Link>
                    </li>
                    <li
                        onMouseOver={(e) => { setIsMenuVisible(true) }}
                        onMouseLeave={(e) => { setIsMenuVisible(false) }}
                    >
                        <Link to='/products'>
                            SHOP  <i className="fa-solid fa-angle-down"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to='/faq'>FAQ</Link>
                    </li>
                    {/* <li>
                        <Link to='/blog'>BLOG</Link>
                    </li> */}
                    <li>
                        <Link to='/about'>OUR STORY</Link>
                    </li>
                    <li>
                        <Link to='/contact'>CONTACT</Link>
                    </li>
                </ul>

                <div
                    className={`dropdown ${isMenuVisible ? 'visible' : 'hidden'}`}
                    onMouseOver={(e) => { setIsMenuVisible(true) }}
                    onMouseLeave={(e) => { setIsMenuVisible(false) }}
                >
                    <div className="dropdown-items">
                        <div className="category makeup">
                            <Link className="title" to='/products/makeup'>Makeup</Link>

                            <Link to='products/makeup/blush'>Blush</Link>
                            <Link to='products/makeup/eyes+brows'>Eyes + Brows</Link>
                            <Link to='products/makeup/foundation'>Foundation</Link>
                            <Link to='products/makeup/lips'>Lips</Link>
                            <Link to='products/makeup/brushes'>Makeup Brushes</Link>
                        </div>

                        <div className="category bathbody">
                            <Link className="title" to='/products/bath+body'>Bath + Body</Link>

                            <Link to='/products/bath+body/body-lotion'>Body Lotion</Link>
                            <Link to='/products/bath+body/body-wash'>Body Wash</Link>
                            <Link to='/products/bath+body/hand-cream'>Hand Cream</Link>
                            <Link to='/products/bath+body/fragrance'>Fragrance</Link>
                            <Link to='/products/bath+body/soap'>Soap</Link>
                        </div>

                        <div className="category skincare">
                            <Link className="title" to='/products/skincare'>Skincare</Link>

                            <Link to='/products/skincare/cleansers'>Cleansers</Link>
                            <Link to='/products/skincare/masks+exfoliants'>Masks + Exfoliants</Link>
                            <Link to='/products/skincare/moisturizers'>Moisturizers</Link>
                            <Link to='/products/skincare/oils+serums'>Oils + Serums</Link>
                            <Link to='/products/skincare/toners'>Toners</Link>
                        </div>

                        <div className="category hairnails">
                            <Link className="title" to='/products/hair+nails'>Hair + Nails</Link>

                            <Link to='/products/hair+nails/conditioner'>Conditioner</Link>
                            <Link to='/products/hair+nails/nails'>Nails</Link>
                            <Link to='/products/hair+nails/shampoo'>Shampoo</Link>
                            <Link to='/products/hair+nails/treatment+styling'>Treatment + Styling</Link>
                        </div>

                        <div className="category wellness">
                            <Link className="title" to='/products/wellness'>Wellness</Link>

                            <Link to='/products/wellness/candles'>Candles</Link>
                            <Link to='/products/wellness/edible-beauty'>Edible Beauty</Link>
                            <Link to='/products/wellness/cleaning'>Cleaning</Link>
                        </div>
                    </div>

                    <div className="newarrivals">
                        <Link to='/products/new'>Check out our new arrivals!</Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Header
