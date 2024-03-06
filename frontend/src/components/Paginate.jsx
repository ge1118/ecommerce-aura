import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, keyword = '', isAdmin = false }) => {
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
                                        pathname: "/admin/productlist",
                                        search: `?page=${x + 1}`,
                                    } :
                                    !keyword ?
                                        {
                                            pathname: "/",
                                            search: `?page=${x + 1}`,
                                        } :
                                        {
                                            pathname: "/",
                                            search: `?keyword=${keyword}&page=${x + 1}`,
                                        }
                            }
                        >
                            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                        </LinkContainer>
                    ))
                }
            </Pagination >
        )
    )
}

export default Paginate
