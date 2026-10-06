export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  dimensions: ProductDimensions;
  weight: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Stock valorado de un producto: unidades x precio - descuento aplicable.
 *
 * Es una función pura, fuera del componente, para no mezclar lógica de
 * negocio con la vista (la plantilla solo la llama).
 */
export function valorStock(product: Product): number {
  const precioConDescuento =
    product.price * (1 - product.discountPercentage / 100);
  return product.stock * precioConDescuento;
}
