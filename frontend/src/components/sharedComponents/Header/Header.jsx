import React, { useEffect, useState } from 'react'
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../../actions/userActions'
import { categoriesData } from '../../../assets/data/categoriesData'

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
        navigate('/')
    };

    const [isNarrow, setIsNarrow] = useState(window.innerWidth <= 650);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isCategoryVisible, setIsCategoryVisible] = useState(false);
    const [isAdminVisible, setIsAdminVisible] = useState(false);
    const [isUserVisible, setIsUserVisible] = useState(false);

    const [visibilityStates, setVisibilityStates] = useState({
        isMakeupVisible: false,
        isBathVisible: false,
        isSkincareVisible: false,
        isHairVisible: false,
        isWellnessVisible: false,
    });

    const handleAdminMenuClick = (e) => {
        e.stopPropagation();
        setIsAdminVisible(prev => !prev);
    };

    const handleUserMenuClick = (e) => {
        e.stopPropagation();
        setIsUserVisible(prev => !prev);
    };

    const toggleVisibility = (categoryKey) => {
        setVisibilityStates(prevStates => ({
            ...prevStates,
            [categoryKey]: !prevStates[categoryKey]
        }));
    };

    const mobileMenuClose = () => {
        setIsMenuVisible(false);
        setIsCategoryVisible(false);
        setVisibilityStates({
            isMakeupVisible: false,
            isBathVisible: false,
            isSkincareVisible: false,
            isHairVisible: false,
            isWellnessVisible: false,
        });
    };

    useEffect(() => {
        const handleClickOutside = () => {
            setIsAdminVisible(false);
            setIsUserVisible(false);
        };

        const handleResize = () => {
            setIsNarrow(window.innerWidth < 650);
        };

        document.addEventListener('click', handleClickOutside);
        window.addEventListener('resize', handleResize);

        handleResize();
        mobileMenuClose();

        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('resize', handleResize);
        };
    }, [location]);

    const submitHandler = (e) => {
        e.preventDefault();
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
                {
                    isNarrow ?
                        <>
                            <div className='mobile-menu' onClick={(e) => setIsMenuVisible(prev => !prev)}>
                                <i className="fa-solid fa-bars"></i>
                                MENU
                            </div>
                            {
                                <ul className={isMenuVisible ? 'menu-visible' : 'menu-hidden'}>
                                    <li onClick={mobileMenuClose}>
                                        <Link to='/'>HOME</Link>
                                    </li>
                                    <li>
                                        <Link to='/products' onClick={mobileMenuClose}>
                                            SHOP
                                        </Link>
                                        <i className="fa-solid fa-angle-down" onClick={(e) => setIsCategoryVisible(prev => !prev)}></i>
                                    </li>
                                    <ul className={`narrow-dropdown-category ${isNarrow && isCategoryVisible ? 'menu-visible' : 'menu-hidden'}`}>
                                        {
                                            categoriesData.map((category) => (
                                                <React.Fragment key={category.name}>
                                                    <li>
                                                        <Link
                                                            className="title"
                                                            to={category.url}
                                                            onClick={mobileMenuClose}
                                                        >
                                                            {category.name}
                                                        </Link>
                                                        <i className="fa-solid fa-angle-down" onClick={() => toggleVisibility(category.isVisible)}></i>
                                                    </li>
                                                    <ul className={`narrow-dropdown-subcategory ${visibilityStates[category.isVisible] ? 'menu-visible' : 'menu-hidden'}`}>
                                                        {category.subcategories.map((sub) => (
                                                            <li key={sub.name}
                                                                onClick={mobileMenuClose}>
                                                                <Link to={sub.url}>{sub.name}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </React.Fragment>
                                            ))
                                        }
                                        <Link to='/products/new' className='newarrivals' onClick={mobileMenuClose}>
                                            <li>
                                                Check out our new arrivals!
                                            </li>
                                        </Link>
                                    </ul>
                                    <li onClick={mobileMenuClose}>
                                        <Link to='/faq'>FAQ</Link>
                                    </li>
                                    <li onClick={mobileMenuClose}>
                                        <Link to='/about'>OUR STORY</Link>
                                    </li>
                                    <li onClick={mobileMenuClose}>
                                        <Link to='/contact'>CONTACT</Link>
                                    </li>
                                </ul>
                            }
                        </>
                        :
                        <ul>
                            <li>
                                <Link to='/'>HOME</Link>
                            </li>
                            <li
                                onMouseOver={(e) => { setIsCategoryVisible(true) }}
                                onMouseLeave={(e) => { setIsCategoryVisible(false) }}
                            >
                                <Link to='/products' onClick={(e) => setIsCategoryVisible(true)}>
                                    SHOP  <i className="fa-solid fa-angle-down"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to='/faq'>FAQ</Link>
                            </li>
                            <li>
                                <Link to='/about'>OUR STORY</Link>
                            </li>
                            <li>
                                <Link to='/contact'>CONTACT</Link>
                            </li>
                        </ul>
                }

                {
                    !isNarrow &&
                    <div
                        className={`dropdown ${isCategoryVisible ? 'visible' : 'hidden'}`}
                        onMouseOver={(e) => { setIsCategoryVisible(true) }}
                        onMouseLeave={(e) => { setIsCategoryVisible(false) }}
                    >
                        <div className="dropdown-items">
                            {
                                categoriesData.map(category => (
                                    <div className="category" key={category.name}>
                                        <Link className="title" to={category.url}>{category.name}</Link>

                                        {
                                            category.subcategories.map(sub => (
                                                <Link to={sub.url} key={sub.name}>{sub.name}</Link>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>

                        <div className="newarrivals">
                            <Link to='/products/new'>Check out our new arrivals!</Link>
                        </div>
                    </div>
                }

            </div>
        </div >
    )
}

export default Header
