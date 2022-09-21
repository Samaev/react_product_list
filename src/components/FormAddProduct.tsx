import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSortedProducts, postProduct } from '../utils/api';
import { loadProductsAction } from '../redux/store';
import { Product } from '../types/types';

export const FormAddProduct:React.FC = () => {
  const dispatch = useDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [inputValues, setInputValues] = useState({
    imageUrl: '',
    name: '',
    count: '',
    width: '',
    height: '',
    weight: '',
  });

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
        [name]: value.trimStart(),
      });
    }
  };

  const loadProduct = async () => {
    const productsFromServer: Product[] = await getSortedProducts();

    dispatch(loadProductsAction(productsFromServer));
  };

  const clearInput = () => {
    setInputValues({
      imageUrl: '',
      name: '',
      count: '',
      width: '',
      height: '',
      weight: '',
    });
  };

  const handleAddProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const product = {
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

    await postProduct(product);
    loadProduct();
    setIsFormVisible(false);
    clearInput();
  };

  const handleCancel = () => {
    clearInput();
    setIsFormVisible(false);
  };

  return (
    <div>
      <button
        type="button"
        className="button is-success"
        onClick={() => setIsFormVisible(true)}
      >
        Add product
      </button>

      {isFormVisible && (
        <form onSubmit={handleAddProduct}>
          <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Add good</p>
              </header>
              <section className="modal-card-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Photo url"
                      name="imageUrl"
                      value={inputValues.imageUrl}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Title"
                      name="name"
                      value={inputValues.name}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Count"
                      name="count"
                      value={inputValues.count}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Width"
                      name="width"
                      value={inputValues.width}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Height"
                      name="height"
                      value={inputValues.height}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Weight"
                      name="weight"
                      value={inputValues.weight}
                      onChange={handleInput}
                      required
                    />
                  </div>
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
                  onClick={handleCancel}
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