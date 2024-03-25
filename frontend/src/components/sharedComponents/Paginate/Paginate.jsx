import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './Paginate.scss'

const Paginate = ({ pages, page, keyword = '', isAdmin = false, isAuth = false, category, subcategory, adminmenu }) => {

    const baseUrl = (
        subcategory ? `/products/${category}/${subcategory}`
            : category ? `/products/${category}`
                : `/products`
    );

    return (
        pages > 1 && (
            <Pagination>
                {
                    [...Array(pages).keys()].map(x => (
                        <LinkContainer
                            key={x + 1}
                            to={
                                isAdmin ?
                                    {
                                        pathname: `/admin/${adminmenu}list`,
                                        search: `?page=${x + 1}`,
                                    } :
                                    isAuth ? {
                                        pathname: `/profile`,
                                        search: `?page=${x + 1}`,
                                    } :
                                        !keyword ?
                                            {
                                                pathname: `${baseUrl}`,
                                                search: `?page=${x + 1}`,
                                            } :
                                            {
                                                pathname: `${baseUrl}`,
                                                search: `?keyword=${keyword}&page=${x + 1}`,
                                            }
                            }
                        >
                            <Pagination.Item active={x + 1 == page ? true : false}>{x + 1}</Pagination.Item>
                        </LinkContainer>
                    ))
                }
            </Pagination >
        )
    )
}

export default Paginate
