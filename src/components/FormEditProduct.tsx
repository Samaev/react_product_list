/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, getProduct } from '../utils/api';
import { loadProductAction, getProductSelector } from '../redux/store';

export const FormEditProduct: React.FC = () => {
  const dispatch = useDispatch();
  const product = useSelector(getProductSelector);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [inputValues, setInputValues] = useState({
    imageUrl: '',
    name: '',
    count: '',
    width: '',
    height: '',
    weight: '',
  });

  const loadProduct = async () => {
    if (product) {
      const productFromServer = await getProduct(product.id);

      dispatch(loadProductAction(productFromServer));
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    if (name !== 'name' && name !== 'imageUrl') {
      setInputValues({
        ...inputValues,
        [name]: value.replace(/[a-z]/gi, '').trim(),
      });
    } else {
      setInputValues({
        ...inputValues,
        [name]: value.trimLeft(),
      });
    }
  };

  const handleEditProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (product) {
      const editedProduct = {
        id: product?.id,
        imageUrl: inputValues.imageUrl,
        name: inputValues.name,
        count: inputValues.count,
        size: {
          width: inputValues.width,
          height: inputValues.height,
        },
        weight: inputValues.weight,
        comments: [],
      };

      await editProduct(editedProduct);
      loadProduct();
    }

    setIsFormVisible(false);
  };

  useEffect(() => {
    if (product) {
      setInputValues({
        imageUrl: product.imageUrl,
        name: product.name,
        count: product.count,
        width: product.size.width,
        height: product.size.height,
        weight: product.weight,
      });
    }
  }, [product]);

  return (
    <div>
      <button
        type="button"
        className="Product__button button"
        onClick={() => setIsFormVisible(true)}
      >
        Edit
      </button>
      {isFormVisible && (
        <form onSubmit={handleEditProduct}>
          <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Edit product</p>
              </header>
              <section className="modal-card-body">
                <div className="field">
                  <label className="label">
                    Image
                    <input
                      className="input"
                      type="text"
                      placeholder="Photo url"
                      name="imageUrl"
                      value={inputValues.imageUrl}
                      onChange={handleInput}
                      required
                    />
                  </label>
                </div>
                <div className="field">
                  <label className="label">
                    Title
                    <input
                      className="input"
                      type="text"
                      placeholder="Title"
                      name="name"
                      value={inputValues.name}
                      onChange={handleInput}
                      required
                    />
                  </label>
                </div>
                <div className="field">
                  <label className="label">
                    Quantity
                    <input
                      className="input"
                      type="text"
                      placeholder="Count"
                      name="count"
                      value={inputValues.count}
                      onChange={handleInput}
                      required
                    />
                  </label>
                </div>
                <div className="field">
                  <label className="label">
                    Width
                    <input
                      className="input"
                      type="text"
                      placeholder="Width"
                      name="width"
                      value={inputValues.width}
                      onChange={handleInput}
                      required
                    />
                  </label>
                </div>
                <div className="field">
                  <label className="label">
                    Height
                    <input
                      className="input"
                      type="text"
                      placeholder="Height"
                      name="height"
                      value={inputValues.height}
                      onChange={handleInput}
                      required
                    />
                  </label>
                </div>
                <div className="field">
                  <label className="label">
                    Weight
                    <input
                      className="input"
                      type="text"
                      placeholder="Weight"
                      name="weight"
                      value={inputValues.weight}
                      onChange={handleInput}
                      required
                    />
                  </label>
                </div>
              </section>
              <footer className="modal-card-foot">
                <button
                  className="button is-success"
                  type="submit"
                >
                  Confirm
                </button>
                <button
                  className="button"
                  type="button"
                  onClick={() => setIsFormVisible(false)}
                >
                  Cancel
                </button>
              </footer>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};