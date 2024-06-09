import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import "../styles/CategoryP.css";
import axios from "axios";
const CategoryProduct = () => {
   const params = useParams();
   const navigate = useNavigate();
   const [products, setProducts] = useState([]);
   const [category, setCategory] = useState([]);

   useEffect(() => {
      if (params?.slug) getPrductsByCat();
   }, [params?.slug]);
   const getPrductsByCat = async () => {
      try {
         const { data } = await axios.get(
            `/api/v1/product/product-category/${params.slug}`
         );
         setProducts(data?.products);
         setCategory(data?.category);
      } catch (error) {
       
      }
   };

   return (
      <Layout>
         <div className="container mt-3 category">
            <h4 className="text-center category-heading">
               Category - {category?.name}
            </h4>
            <h6 className="text-center category-heading-sub">
               {products?.length} result found{" "}
            </h6>
            <div className="py-3 py-md-5 bg-light">
               <div className="container">
                  <div className="row">
                     <div className="col-md-12">
                        <h4 className="mb-4">Our Products</h4>
                     </div>
                     {products?.map((p) => (
                        <div className="col-md-3">
                           <div className="product-card">
                              <div className="product-card-img">
                                 <label className="stock bg-success">
                                    In Stock
                                 </label>
                                 <img className="img-pro"
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    alt="Laptop"
                                 />
                              </div>
                              <div className="product-card-body">
                                 <p className="product-brand">HP</p>
                                 <h5 className="product-name">
                                    <a href>{p.name}</a>
                                 </h5>
                                 <div>
                                    <span className="selling-price">
                                       {p.price.toLocaleString("en-IN", {
                                          style: "currency",
                                          currency: "INR",
                                       })}
                                    </span>
                                    <span className="original-price">
                                       &#8377;799
                                    </span>
                                 </div>
                                 <div className="mt-2">
                                    {/* <a
                                      href
                                      className="btn btn1"
                                      onClick={() => {
                                         setCart([...cart, p]);
                                         localStorage.setItem(
                                            "cart",
                                            JSON.stringify([...cart, p])
                                         );
                                         toast.success("Item Added to cart");
                                      }}
                                   >
                                      Add To Cart
                                   </a>
                                   <a href className="btn btn1">
                                      {" "}
                                      <i className="fa fa-heart" />{" "}
                                   </a> */}
                                    <a
                                       href
                                       className="btn btn1"
                                       onClick={() =>
                                          navigate(`/product/${p.slug}`)
                                       }
                                    >
                                       {" "}
                                       View{" "}
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default CategoryProduct;
