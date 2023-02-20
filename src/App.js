import { useEffect, useState, Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import PrivateRoutes from "./Components/utils/PrivateRoutes";

import ProductsList from "./Components/Product/ProductsList";
import "./App.css";
import CartList from "./Components/Cart_VOL_2/CartList";
import NewProduct from "./Components/NewProduct/NewProduct";

// import Header from "./Components/Header/Header";
import MyHeader from "./Components/Header/MyHeader";

import NotFound from "./Components/utils/NotFound";
import ServerError from "./Components/utils/ServerError";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      fetch("https://django-shopping-backend.herokuapp.com/api/products/")
        .then((response) => response.json())
        .then((data) => setProducts(data));
    };
    getProducts();
  }, []);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getCartItems = () => {
      fetch("https://django-shopping-backend.herokuapp.com/api/cart-items/")
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    };
    getCartItems();
  }, []);

  const addProductHandler = async (product) => {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("image", product.image);

    const res = await fetch(
      "https://django-shopping-backend.herokuapp.com/api/products/",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setProducts([...products, data]);
  };

  const addToCartHandler = async (productId, quantity) => {
    try {
      const response = await fetch(
        `https://django-shopping-backend.herokuapp.com/api/cart-items/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: productId, quantity: quantity }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add to cart!");
      }
      const updatedCart = await response.json();
      setCartItems(updatedCart);
    } catch (err) {
      console.error(err);
    }
    const getCartItems = () => {
      fetch("https://django-shopping-backend.herokuapp.com/api/cart-items/")
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    };
    getCartItems();
  };

  const onRemoveHandler = async (productId, quantity) => {
    try {
      const response = await fetch(
        `https://django-shopping-backend.herokuapp.com/api/cart-items/${productId}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: productId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove from cart!");
      }
      const updatedCart = await response.json();
      setCartItems(updatedCart);
    } catch (err) {
      console.error(err);
    }
    const getCartItems = () => {
      fetch("https://django-shopping-backend.herokuapp.com/api/cart-items/")
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    };
    getCartItems();
  };

  const onAddHandler = async (productId) => {
    try {
      const response = await fetch(
        `https://django-shopping-backend.herokuapp.com/api/cart-items-add/${productId}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: productId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove from cart!");
      }
      const updatedCart = await response.json();
      setCartItems(updatedCart);
    } catch (err) {
      console.error(err);
    }
    const getCartItems = () => {
      fetch("https://django-shopping-backend.herokuapp.com/api/cart-items/")
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    };
    getCartItems();
  };

  const onDeleteHandler = async (productId) => {
    try {
      const response = await fetch(
        `https://django-shopping-backend.herokuapp.com/api/cart-items/${productId}/`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: productId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove from cart!");
      }
      const updatedCart = await response.json();
      setCartItems(updatedCart);
    } catch (err) {
      console.error(err);
    }
    const getCartItems = () => {
      fetch("https://django-shopping-backend.herokuapp.com/api/cart-items/")
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    };
    getCartItems();
  };

  const onArchiveHandler = async (productId) => {
    try {
      const cartItemsResponse = await fetch(
        "https://django-shopping-backend.herokuapp.com/api/cart-items/"
      );
      const cartItems = await cartItemsResponse.json();
      const cartItem = cartItems.find((item) => item.product.id === productId);
      if (cartItem) {
        const removeCartItemResponse = await fetch(
          `https://django-shopping-backend.herokuapp.com/api/cart-items/${cartItem.id}/`,
          {
            method: "DELETE",
          }
        );
        if (!removeCartItemResponse.ok) {
          throw new Error("Failed to remove product from cart");
        }

        const getCartItems = () => {
          fetch("https://django-shopping-backend.herokuapp.com/api/cart-items/")
            .then((response) => response.json())
            .then((data) => setCartItems(data));
        };
        getCartItems();
      }

      const archiveProductResponse = await fetch(
        `https://django-shopping-backend.herokuapp.com/api/products-archive/${productId}/`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: productId }),
        }
      );
      if (!archiveProductResponse.ok) {
        throw new Error("Failed to archive product");
      }

      const productsResponse = await fetch(
        "https://django-shopping-backend.herokuapp.com/api/products/"
      );
      const products = await productsResponse.json();
      setProducts(products);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BrowserRouter>
      <Fragment>
        <div className="App">
          {/* <Header /> */}
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/500" element={ServerError} />
            <Route element={NotFound} />
            <Route
              path="/"
              element={
                <>
                  <MyHeader />
                  <CartList
                    cartItems={cartItems}
                    onRemoveHandler={onRemoveHandler}
                    onAddHandler={onAddHandler}
                    onDeleteHandler={onDeleteHandler}
                  />
                  <ProductsList
                    className="products"
                    products={products}
                    onAddToCart={addToCartHandler}
                    onArchive={onArchiveHandler}
                  />
                  <NewProduct onAddProduct={addProductHandler} />
                </>
              }
            />
            {/* <Route element={<PrivateRoutes />}>
                <Route
                  path="/"
                  element={
                    <>
                      <CartList
                        cartItems={cartItems}
                        onRemoveHandler={onRemoveHandler}
                      />
                      <ProductsList
                        className="products"
                        products={products}
                        onAddToCart={addToCartHandler}
                      />
                      <NewProduct onAddProduct={addProductHandler} />
                    </>
                  }
                />
              </Route> */}
            {/* <Route path="/login" element={<LoginPage />} exact /> */}
          </Routes>
        </div>
      </Fragment>
    </BrowserRouter>
    // <div>
    //   {/* <Cart myCartItems={cartItems} /> */}
    //   <CartList cartItems={cartItems} />
    //   {/* <NewExpense /> */}
    //   <ProductsList products={products} />
    // </div>
  );
}

export default App;
