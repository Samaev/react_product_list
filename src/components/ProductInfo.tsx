import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { deleteComment, getComments, postComment,getProduct } from '../utils/api';
import { loadProductAction,getProductSelector } from '../redux/store';
import { FormEditProduct } from '../components/FormEditProduct';
import {Comment} from '../types/types'

export const ProductInfo: React.FC = () => {
  const product = useSelector(getProductSelector);
  const dispatch = useDispatch();
  const params = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const loadProduct = async () => {
    if (params.id) {
      const productFromServer = await getProduct(+params.id);

      dispatch(loadProductAction(productFromServer));
    }
  };

  const loadComments = async () => {
    if (params.id) {
      const commentsFromServer = await getComments(+params.id);

      setComments(commentsFromServer);
    }
  };

  const handleDelete = async (commentId: number) => {
    deleteComment(commentId);
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const handlePostComment = async () => {
    if (params.id && newComment.trim()) {
      const comment = {
        productId: +params.id,
        description: newComment,
        date: Date(),
      };

      await postComment(comment);
      setNewComment('');
      loadComments();
    }
  };

  useEffect(() => {
    if (!product) {
      loadProduct();
    }

    loadComments();
  }, []);

  return (
    <>
      {product && (
        <div className="product">
          <img
            className="product__photo"
            src={product.imageUrl}
            alt="placeholder"
          />
          <h3 className="product__name">{product.name}</h3>
          <p className="product__info">
            {`Quantity: ${product.count}\n`}
            {`Width: ${product.size.width}\n`}
            {`Height: ${product.size.height}\n`}
            {`Weight: ${product.weight}\n`}
          </p>
          <div className="product__comments">
            <span>---</span>
            <h4 className="product__comments-title">Comments:</h4>
            <ul className="product__comments-list">
              {comments.map(comment => (
                <li key={comment.id}>
                  {comment.description}
                  &nbsp;
                  <button
                    type="button"
                    className="product__comment-delete button is-light"
                    onClick={() => handleDelete(comment.id)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
            <textarea
              className="textarea"
              placeholder="Your comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            >
            </textarea>
          </div>
          <div className="product__buttons">
            <Link
              to="/"
              type="button"
              className="product__button button"
            >
              Back
            </Link>
            <button
              type="button"
              className="product__button button is-success"
              onClick={handlePostComment}
            >
              Comment
            </button>
            <FormEditProduct />
          </div>
        </div>
      )}
    </>
  );
};