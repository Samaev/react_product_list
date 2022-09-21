import { Product, Comment } from "../types/types";

export const API_PRODUCTS = "http://localhost:3030/products";
export const API_COMMENTS = "http://localhost:3030/comments";

export const getProducts = async (): Promise<Product[]> => {
  const responce = await fetch(API_PRODUCTS);
  //@ts-ignore
  return responce.json;
};

export const getAllComments = async (): Promise<Comment[]> => {
  const responce = await fetch(API_COMMENTS);

  return responce.json();
};

export const getSortedProducts = async () => {
  const sortedProducts = await getProducts();

  return sortedProducts
    .sort((a: Product, b: Product) => +b.count - +a.count)
    .sort((a: Product, b: Product) => a.name.localeCompare(b.name));
};

export const getSortedProductsByName = async () => {
  const sortedProducts = await getProducts();
  return sortedProducts
    .sort((a: Product, b: Product) => a.name.localeCompare(b.name));
};

export const getComments = async (productId: number) => {
  const responce = await getAllComments();

  return responce.filter(comment => comment.productId === productId);
};
export const getProduct = async (productId: number) => {
  const responce = await fetch(`${API_PRODUCTS}/${productId}`);

  return responce.json();
};
export const postProduct = async (product: Omit<Product, "id">) => {
  const responce = await fetch(API_PRODUCTS, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(product),
  });

  return responce.json();
};

export async function postComment(comment: Omit<Comment, 'id'>) {
  const response = await fetch(API_COMMENTS, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });

  return response.ok && response.status === 200;
}

export const editProduct = async (product: Product) => {
  const response = await fetch(`${API_PRODUCTS}/${product.id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(product),
  });

  return response.json();
}


export const deleteProduct = async (productId: number)=> {
  return fetch(`${API_PRODUCTS}/${productId}`, {
    method: 'DELETE',
  });
}

export const deleteComment = async (commentId: number) => {
  return fetch(`${API_COMMENTS}/${commentId}`, {
    method: 'DELETE',
  });
};