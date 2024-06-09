import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
// import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import "../styles/ProductCart.css";

const CartPage = () => {
   const [auth, setAuth] = useAuth();
   const [cart, setCart] = useCart();
   const [clientToken, setClientToken] = useState("");
   const [instance, setInstance] = useState("");
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

   //total price
   const totalPrice = () => {
      try {
         let total = 0;
         cart?.map((item) => {
            total = total + item.price;
         });
         return total.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
         });
      } catch (error) {}
   };
   //detele item
   const removeCartItem = (pid) => {
      try {
         let myCart = [...cart];
         let index = myCart.findIndex((item) => item._id === pid);
         myCart.splice(index, 1);
         setCart(myCart);
         localStorage.setItem("cart", JSON.stringify(myCart));
      } catch (error) {}
   };

   //get payment gateway token
   const getToken = async () => {
      try {
         const { data } = await axios.get("/api/v1/product/braintree/token");
         setClientToken(data?.clientToken);
      } catch (error) {}
   };
   useEffect(() => {
      getToken();
   }, [auth?.token]);

   //handle payments
   const handlePayment = async () => {
      try {
         setLoading(true);
         const { nonce } = await instance.requestPaymentMethod();
         const { data } = await axios.post(
            "/api/v1/product/braintree/payment",
            {
               nonce,
               cart,
            }
         );
         setLoading(false);
         localStorage.removeItem("cart");
         setCart([]);
         navigate("/dashboard/user/orders");
         toast.success("Payment Completed Successfully ");
      } catch (error) {
         setLoading(false);
      }
   };

   return (
      <Layout>
         <div className=" cart-page upp " style={{ minHeight: "90vh" }}>
            <div className="row">
               <div className="col-md-12">
                  <h1 className="text-center bg-light p-2 mb-1 user-name">
                     {!auth?.user
                        ? "Hello Guest"
                        : `Hello  ${auth?.token && auth?.user?.name}`}
                     <p className="text-center user-cart-num">
                        {cart?.length
                           ? `You Have ${cart.length} items in your cart ${
                                auth?.token ? "" : "please login to checkout !"
                             }`
                           : " Your Cart Is Empty"}
                     </p>
                  </h1>
               </div>
            </div>
            <div className="container ">
               <div className="row ">
                  <div className="col-md-7  p-0 m-0">
                     {cart?.map((p) => (
                        <div className="shopping-cart">
                           <div className="cart-header d-none d-sm-none d-mb-block d-lg-block">
                              <div className="row">
                                 <div className="col-md-5">
                                    <h4 className="cart-heading">Products</h4>
                                 </div>
                                 <div className="col-md-2">
                                    <h4 className="cart-heading">Price</h4>
                                 </div>
                                 <div className="col-md-3">
                                    <h4 className="cart-heading">Quantity</h4>
                                 </div>
                                 <div className="col-md-2">
                                    <h4 className="cart-heading">Remove</h4>
                                 </div>
                              </div>
                           </div>
                           <div className="cart-item">
                              <div className="row">
                                 <div className="col-md-5 my-auto">
                                    <a href>
                                       <label className="product-name">
                                          <img
                                             src={`/api/v1/product/product-photo/${p._id}`}
                                             className="card-img-top"
                                             width={"50px"}
                                             height={"50px"}
                                             alt={p.name}
                                          />
                                          <span className="cartname">
                                             {" "}
                                             {p.name.substring(0, 20)}
                                          </span>
                                       </label>
                                    </a>
                                 </div>
                                 <div className="col-md-2 my-auto">
                                    <label className="price">
                                       &#8377;{p.price}
                                    </label>
                                 </div>
                                 <div className="col-md-3 col-7 my-auto">
                                    <div className="quantity">
                                       <div className="input-group">
                                          <span className="btn btn1">
                                             <i className="fa fa-minus" />
                                          </span>
                                          <input
                                             type="text"
                                             className="input-quantity"
                                             defaultValue={1}
                                          />{" "}
                                          <span className="btn btn1">
                                             <i className="fa fa-plus" />
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-md-2 col-5 my-auto">
                                    <div className="remove">
                                       <a
                                          href
                                          className="btn btn-danger btn-sm"
                                          onClick={() => removeCartItem(p._id)}
                                       >
                                          <i className="fa fa-trash" /> Remove
                                       </a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="col-md-5 cart-summary ">
                     <h2 className="cart-summary-heading">Cart Summary</h2>
                     <p className="cart-summary-heading-sub">
                        Total | Checkout | Payment
                     </p>
                     <hr />
                     <h4 className="cart-summary-heading-price">
                        Total : {totalPrice()}{" "}
                     </h4>
                     {auth?.user?.address ? (
                        <>
                           <div className="mb-3">
                              <h4 className="cart-summary-sub-add">
                                 Current Address
                              </h4>
                              <h5 className="cart-summary-sub-add">
                                 {auth?.user?.address}
                              </h5>
                              <button
                                 className="btn btn-outline-warning"
                                 onClick={() =>
                                    navigate("/dashboard/user/profile")
                                 }
                              >
                                 Update Address
                              </button>
                           </div>
                        </>
                     ) : (
                        <div className="mb-3">
                           {auth?.token ? (
                              <button
                                 className="btn btn-outline-warning"
                                 onClick={() =>
                                    navigate("/dashboard/user/profile")
                                 }
                              >
                                 Update Address
                              </button>
                           ) : (
                              <button
                                 className="btn btn-outline-warning"
                                 onClick={() =>
                                    navigate("/login", {
                                       state: "/cart",
                                    })
                                 }
                              >
                                 Plase Login to checkout
                              </button>
                           )}
                        </div>
                     )}
                     <div className="mt-2">
                        {!clientToken || !auth?.token || !cart?.length ? (
                           ""
                        ) : (
                           <>
                              <DropIn
                                 options={{
                                    authorization: clientToken,
                                    paypal: {
                                       flow: "vault",
                                    },
                                 }}
                                 onInstance={(instance) =>
                                    setInstance(instance)
                                 }
                              />

                              <button
                                 className="btn btn-primary"
                                 onClick={handlePayment}
                                 disabled={
                                    loading || !instance || !auth?.user?.address
                                 }
                              >
                                 {loading ? "Processing ...." : "Make Payment"}
                              </button>
                           </>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default CartPage;
