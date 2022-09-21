import { AnyAction, createStore } from "redux";
import { Product } from "../types/types";

type State = {
  products: Product[],
  product: Product | null,
}

const initialState: State = {
  products: [],
  product: null,
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "products/load":
      return {
        ...state,
        products: action.payload,
      };
    case "product/load":
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};

export const getProductsSelector = (state: State) => state.goods;
export const getProductSelector = (state: State) => state.product;
export const store = createStore(reducer);
export const loadGoodsAction = (payload: Product[]) => ({
  type: "products/load",
  payload,
});

export const loadProductAction = (payload: Product | null) => ({
  type: "product/load",
  payload,
});
