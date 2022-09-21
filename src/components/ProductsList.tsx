import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProductsSelector,
  loadProductAction,
  loadProductsAction,
} from "../redux/store";
import { Product } from "../types/types";
import { getSortedProducts, deleteProduct, getProduct } from "../utils/api";
import { FormAddProduct } from "./FormAddProduct";

export const ProductsList: React.FC = () => {
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [productId, setProductId] = useState(0);
  const dispatch = useDispatch();
  const products = useSelector(getProductsSelector);

  const loadProducts = async () => {
    const productsFromServer: Product[] = await getSortedProducts();

    dispatch(loadProductsAction(productsFromServer));
  };

  const handleDeleteConfirmation = (selectedProductId: number) => {
    setIsDeleteVisible(true);
    setProductId(selectedProductId);
  };

  const handleDelete = async () => {
    await deleteProduct(productId);
    setIsDeleteVisible(false);
    loadProducts();
  };

  const handleSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case "alphabet":
        dispatch(
          loadProductsAction(
            [...products].sort((a, b) => a.name[0].localeCompare(b.name[0]))
          )
        );
        break;

      case "count":
        dispatch(
          loadProductsAction([...products].sort((a, b) => +b.count - +a.count))
        );
        break;

      default:
        dispatch(loadProductsAction(products));
    }
  };

  const loadProduct = async (id: number) => {
    const productFromServer = await getProduct(id);

    dispatch(loadProductAction(productFromServer));
  };

  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <div>
      <div className="productsList">
        <h2 className="productsList__title">Products:</h2>
        <div className="productsList__list-container">
          <div className="select productsList__select">
            <select id="sortBy" onChange={handleSortBy}>
              <option value="">Sort by:</option>
              <option value="alphabet">Alphabet</option>
              <option value="count">Count</option>
            </select>
          </div>
          <ul className="productsList__list">
            {products.map((product) => (
              <li key={product.id} className="productsList__item">
                <img src={product.imageUrl} alt="placeholder" />
                <h3 className="productsList__product-title">{product.name}</h3>
                <span className="productsList__product-count">
                  Quantity:&nbsp;
                  {product.count}
                </span>
                <div className="productsList__buttons buttons">
                  <Link
                    to={`${product.id}`}
                    type="button"
                    className="productsList__user-button button"
                    onClick={() => loadProduct(product.id)}
                  >
                    About
                  </Link>
                  <button
                    type="button"
                    className="productsList__user-button button"
                    onClick={() => handleDeleteConfirmation(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isDeleteVisible && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Delete product?</p>
            </header>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                type="submit"
                onClick={handleDelete}
              >
                Confirm
              </button>
              <button
                className="button"
                type="button"
                onClick={() => setIsDeleteVisible(false)}
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}

      <FormAddProduct />
    </div>
  );
};
