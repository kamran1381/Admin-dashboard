import React, { useState } from 'react';
import { products } from './producrData';
import './Products.css';

export default function Products() {
  const [visibleProducts, setVisibleProducts] = useState(3);

  const handleLoadMoreClick = () => {
    setVisibleProducts(visibleProducts + 2);
  };

  return (
    <div className="product-container">
      <h2 className="product-title">Products</h2>
      <div className="product-list">
        {products.slice(0, visibleProducts).map((product, index) => (
          <div key={index} className="product-box">
            <img src={product.path} alt={product.item} className="product-image" />
            <p>ProductName : {product.item}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      {visibleProducts < products.length && (
        <button onClick={handleLoadMoreClick} className='load-more'>Load More</button>
      )}
    </div>
  );
}
