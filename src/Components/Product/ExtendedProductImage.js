import React from "react";
import "./ExtendedProductImage.css"

const ExtendedProductImage = (product) => {
  return (
    <div className="ext-product-image">
      <img
        className="ext-small-image"
        src={"https://django-shopping-backend.herokuapp.com" + product.image}
        alt={product.name}
      />
    </div>
  );
};

export default ExtendedProductImage;
