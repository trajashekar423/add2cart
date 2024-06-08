import React from 'react';
import { useGetProductsQuery } from '../../features/api/apiSlice';
import {
  addCartProduct,
  getCartCount,
  getSubTotal,
  calculateTax,
  getTotalAmount,
} from '../../features/api/useCartSlice';
import { useDispatch } from 'react-redux';

function Products() {
  const dispatch = useDispatch();

  const addToCart = (item) => {
    const productObj = {
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
    };
    dispatch(addCartProduct(productObj));
    dispatch(getCartCount());
    dispatch(getSubTotal());
    dispatch(calculateTax());
    dispatch(getTotalAmount());
  };

  const {
    data: products,
    isLoading: isProductLoading,
    isSuccess: isProductSuccess,
    isError: isProductError,
    error: productError,
  } = useGetProductsQuery({ refetchOnMountOrArgChange: true });

  let getData;

  if (isProductLoading) {
    getData = (
      <div className="d-flex justify-content-center w-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else if (isProductSuccess) {
    getData = products?.map((item) => (
      <div className="col-sm-3" key={item.id}>
        <div className="card h-100 product-card">
          <div className="img-grid mb-3">
            <img src={item.image} className="card-img-top" alt={item.title} />
          </div>
          <div className="card-body">
            <h5 className="card-title">${item.price}</h5>
            <p className="card-text">
              {item.description ? item.description.substring(0, 50) : ''}...
            </p>
           
            <button
              onClick={() => addToCart(item)}
              className="btn btn-outline-primary"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    ));
  } else if (isProductError) {
    getData = (
      <div className="alert alert-danger w-100 text-center" role="alert">
        {productError.status} {JSON.stringify(productError)}
      </div>
    );
  }

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-3 row-cols-sm-2 g-4">
        {getData}
      </div>
    </div>
  );
}

export default Products;
