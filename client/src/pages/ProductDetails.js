import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import "../styles/ProductView.css";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
   const params = useParams();
   const navigate = useNavigate();
   const [product, setProduct] = useState({});
   const [relatedProducts, setRelatedProducts] = useState([]);
   const [cart, setCart] = useCart();

   useEffect(() => {
      if (params?.slug) getProduct();
      window.scrollTo(0, 0);
   }, [params?.slug]);

   const getProduct = async () => {
      try {
         const { data } = await axios.get(
            `/api/v1/product/get-product/${params.slug}`
         );
         setProduct(data?.product);
         getSimilarProduct(data?.product._id, data?.product.category._id);
      } catch (error) {
        
      }
   };

   const getSimilarProduct = async (pid, cid) => {
      try {
         const { data } = await axios.get(
            `/api/v1/product/related-product/${pid}/${cid}`
         );
         setRelatedProducts(data?.products);
      } catch (error) {
         
      }
   };

   const addToCart = (product) => {
      setCart([...cart, product]);
      localStorage.setItem("cart", JSON.stringify([...cart, product]));
      toast.success("Item Added to cart");
   };

   return (
      <Layout>
         <div className="py-3 py-md-5 bg-light">
            <div className="container">
               <div className="row">
                  <div className="col-md-5 mt-3">
                     <div className="">
                        <img
                           src={`/api/v1/product/product-photo/${product._id}`}
                           className="product-img"
                           alt={product.name}
                           height="300"
                           width={"350px"}
                        />
                     </div>
                  </div>
                  <div className="col-md-7 mt-3">
                     <div className="product-view">
                        <h4 className="product-name">
                           Name : {product.name}
                           <label className="label-stock bg-success">
                              In Stock
                           </label>
                        </h4>
                        <hr />
                        <p className="product-path">
                           Home / Category / Product / {product.name}
                        </p>
                        <div>
                           <span className="selling-price">
                              Price :
                              {product?.price?.toLocaleString("en-IN", {
                                 style: "currency",
                                 currency: "INR",
                              })}
                           </span>
                           <span className="original-price">&#8377;499</span>
                        </div>
                        <div>
                           <span className="selling-price">
                              Category : {product?.category?.name}
                           </span>
                        </div>
                        <div className="mt-2">
                           <button
                              className="btn btn1"
                              onClick={() => addToCart(product)}
                           >
                              <i className="fa fa-shopping-cart" /> Add To Cart
                           </button>
                        </div>
                        <div className="mt-3">
                           <h5 className="mb-0">Small Description</h5>
                           <p>Description : {product.description}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <hr />
         <div className="row container similar-products">
            <h4>Similar Products ➡️</h4>
            {relatedProducts.length < 1 && (
               <p className="text-center">No Similar Products found</p>
            )}
            <div className="d-flex flex-wrap">
               {relatedProducts?.map((p) => (
                  <div className="card m-2" key={p._id}>
                     <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="product-img-similar"
                        alt={p.name}
                     />
                     <div className="card-body">
                        <div className="card-name-price">
                           <h5 className="card-title">{p.name}</h5>
                           <h5 className="card-title card-price">
                              {p.price.toLocaleString("en-US", {
                                 style: "currency",
                                 currency: "USD",
                              })}
                           </h5>
                        </div>
                        <p className="card-text ">
                           {p.description.substring(0, 60)}...
                        </p>
                        <div className="card-name-price">
                           <button
                              className="btn btn-info ms-1"
                              onClick={() => navigate(`/product/${p.slug}`)}
                           >
                              More Details
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </Layout>
   );
};

export default ProductDetails;
