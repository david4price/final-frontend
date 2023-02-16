import React from "react";
import "./ProductImage.css"

const ProductImage = (product) => {
  return (
    <div className="product-image">
      <img
        className="small-image"
        src={"https://django-shopping-backend.herokuapp.com" + product.image}
        alt={product.name}
      />
    </div>
  );
};

export default ProductImage;
