export type Product = {
  id: number,
  imageUrl: string,
  name: string,
  count: string,
  size: {
    width: string,
    height: string,
  },
  weight: string,
  comments: Comment[] | null,
}

export type Comment = {
  id: number,
  productId: number,
  description: string,
  date: string,
}