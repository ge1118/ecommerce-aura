import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Rating from '../../sharedComponents/Rating/Rating'
import Loader from '../../sharedComponents/Loader/Loader'
import Message from '../../sharedComponents/Message/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, createProductReview, deleteReview } from '../../../actions/productActions.js'
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_REVIEW_DELETE_RESET } from '../../../constants/productConstants.js'
import './Reviews.scss'

const Reviews = () => {

    const [reviewToggle, setReviewToggle] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector(state => state.productReviewCreate);
    const { loading: loadingProductReview, error: errorProductReview, success: successProductReview } = productReviewCreate;

    const productReviewDelete = useSelector(state => state.productReviewDelete);
    const { loading: loadingProductReviewDelete, error: errorProductReviewDelete, success: successProductReviewDelete } = productReviewDelete;

    useEffect(() => {
        if (successProductReviewDelete) {
            setTimeout(() => {
                dispatch({ type: PRODUCT_REVIEW_DELETE_RESET });
            }, 3000);
        };
        if (successProductReview) {
            setRating(0);
            setComment('');
            setReviewToggle(false);
            setTimeout(() => {
                dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
            }, 3000);
        };
        if (errorProductReview) {
            setTimeout(() => {
                setReviewToggle(false);
                dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
            }, 3000);
        }
        dispatch(listProductDetails(id));

    }, [dispatch, successProductReview, successProductReviewDelete, errorProductReview]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            id,
            {
                rating,
                comment,
            }
        ));
    };

    const DeleteReviewHandler = (id, review_id) => {
        if (window.confirm('Delete this review?')) {
            dispatch(deleteReview(id, review_id));
        };
    };

    if (error) return null

    return (
        <div className='reviews'>
            <hr />
            <h1>What our customers think</h1>
            <hr />

            <div className="reviews-total">
                <Rating value={product.rating} text={`Based on ${product.numReviews} reviews`} color={'black'} />

                <p onClick={(e) => { setReviewToggle(!reviewToggle) }}>Write your own review!</p>
            </div>

            {loadingProductReview && <Loader />}
            {successProductReview && <Message bgcolor='#70a873' txtcolor='#fff'>Review has been submitted</Message>}

            {reviewToggle ? (
                userInfo ? (
                    <form className='write-review' onSubmit={submitHandler}>
                        <p>Write a review</p>
                        <hr />
                        {errorProductReview && <Message bgcolor='#ca7e7e' txtcolor='#fff'>{errorProductReview}</Message>}

                        <label>Rating</label>
                        <div className="rating" >
                            {rating >= 1 ? <i className="fa-solid fa-star" onClick={(e) => setRating(1)} /> : <i className="far fa-star" onClick={(e) => setRating(1)} />}
                            {rating >= 2 ? <i className="fa-solid fa-star" onClick={(e) => setRating(2)} /> : <i className="far fa-star" onClick={(e) => setRating(2)} />}
                            {rating >= 3 ? <i className="fa-solid fa-star" onClick={(e) => setRating(3)} /> : <i className="far fa-star" onClick={(e) => setRating(3)} />}
                            {rating >= 4 ? <i className="fa-solid fa-star" onClick={(e) => setRating(4)} /> : <i className="far fa-star" onClick={(e) => setRating(4)} />}
                            {rating >= 5 ? <i className="fa-solid fa-star" onClick={(e) => setRating(5)} /> : <i className="far fa-star" onClick={(e) => setRating(5)} />}
                        </div>

                        <label>Review</label>
                        <textarea
                            rows='10'
                            placeholder='Write your comments here'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>

                        <button disabled={loadingProductReview} type='submit'>Submit Review</button>
                    </form>
                ) :
                    <Message bgcolor='#ca7e7e' txtcolor='#fff'>Please <Link to='/login'>login</Link> to write a review</Message>
            ) :
                null
            }

            {product.reviews.length === 0 && !loadingProductReview && <Message bgcolor='#829fdd' txtcolor='#fff'>No Reviews</Message>}
            {successProductReviewDelete && <Message bgcolor='#70a873' txtcolor='#fff'>Review has been successfully deleted</Message>}
            {
                product.reviews.map(review => (
                    <div className="user-reviews" key={review._id}>
                        <Rating value={review.rating} color='black' />
                        <p className='dateanduser'><span>{review.name}</span> on <span>{review.createdAt.substring(0, 10)}</span></p>
                        <p className="review">{review.comment}</p>

                        {userInfo && review.user === userInfo.id && <i className='fas fa-times' style={{ color: 'red' }} onClick={() => DeleteReviewHandler(id, review._id)}></i>}
                        <hr />
                    </div>
                ))

            }
        </div>
    )
}

export default Reviews
