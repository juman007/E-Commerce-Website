// import React from "react";
// import "../styles/ProductList.css";
// import demo from "../images/-original-imagnhussytbyhpd.jpeg";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Checkbox, Radio } from "antd";
// import { Prices } from "../components/Prices";
// import { useCart } from "../context/cart";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Layout from "./../components/Layout/Layout";
// import { AiOutlineReload } from "react-icons/ai";
// import "../styles/Homepage.css";
// // import Slider from "../components/Slider";
// // import ProductList from "../components/ProductList";
// // import demo from "../images/-original-imagnhussytbyhpd.jpeg";

// const ProductList = () => {
//    const navigate = useNavigate();
//    const [cart, setCart] = useCart();
//    const [products, setProducts] = useState([]);
//    const [categories, setCategories] = useState([]);
//    const [checked, setChecked] = useState([]);
//    const [radio, setRadio] = useState([]);
//    const [total, setTotal] = useState(0);
//    const [page, setPage] = useState(1);
//    const [loading, setLoading] = useState(false);

//    useEffect(() => {
//       getTotal();
//    }, []);
//    //get products
//    const getAllProducts = async () => {
//       try {
//          setLoading(true);
//          const { data } = await axios.get(
//             `/api/v1/product/product-list/${page}`
//          );
//          setLoading(false);
//          setProducts(data.products);
//       } catch (error) {
//          setLoading(false);
//          console.log(error);
//       }
//    };

//    //getTOtal COunt
//    const getTotal = async () => {
//       try {
//          const { data } = await axios.get("/api/v1/product/product-count");
//          setTotal(data?.total);
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    useEffect(() => {
//       if (page === 1) return;
//       loadMore();
//    }, [page]);
//    //load more
//    const loadMore = async () => {
//       try {
//          setLoading(true);
//          const { data } = await axios.get(
//             `/api/v1/product/product-list/${page}`
//          );
//          setLoading(false);
//          setProducts([...products, ...data?.products]);
//       } catch (error) {
//          console.log(error);
//          setLoading(false);
//       }
//    };

//    // filter by cat

//    useEffect(() => {
//       if (!checked.length || !radio.length) getAllProducts();
//    }, [checked.length, radio.length]);

//    useEffect(() => {
//       if (checked.length || radio.length) filterProduct();
//    }, [checked, radio]);

//    //get filterd product
//    const filterProduct = async () => {
//       try {
//          const { data } = await axios.post("/api/v1/product/product-filters", {
//             checked,
//             radio,
//          });
//          setProducts(data?.products);
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    return (
//       <>
//          <div className="py-3 py-md-5 bg-light">
//             <div className="container">
//                <div className="row">
//                   <div className="col-md-12">
//                      <h4 className="mb-4">Our Products</h4>
//                   </div>
//                   {products?.map((p) => (
//                      <div className="col-md-3">
//                         <div className="product-card">
//                            <div className="product-card-img">
//                               <label className="stock bg-success">
//                                  In Stock
//                               </label>
//                               <img
//                                  src={`/api/v1/product/product-photo/${p._id}`}
//                                  alt="Laptop"
//                               />
//                            </div>
//                            <div className="product-card-body">
//                               <p className="product-brand">HP</p>
//                               <h5 className="product-name">
//                                  <a href>{p.name}</a>
//                               </h5>
//                               <div>
//                                  <span className="selling-price">
//                                     {p.price.toLocaleString("en-IN", {
//                                        style: "currency",
//                                        currency: "INR",
//                                     })}
//                                  </span>
//                                  <span className="original-price">
//                                     &#8377;799
//                                  </span>
//                               </div>
//                               <div className="mt-2">
//                                  <a
//                                     href
//                                     className="btn btn1"
//                                     onClick={() => {
//                                        setCart([...cart, p]);
//                                        localStorage.setItem(
//                                           "cart",
//                                           JSON.stringify([...cart, p])
//                                        );
//                                        toast.success("Item Added to cart");
//                                     }}
//                                  >
//                                     Add To Cart
//                                  </a>
//                                  <a href className="btn btn1">
//                                     {" "}
//                                     <i className="fa fa-heart" />{" "}
//                                  </a>
//                                  <a
//                                     href
//                                     className="btn btn1"
//                                     onClick={() =>
//                                        navigate(`/product/${p.slug}`)
//                                     }
//                                  >
//                                     {" "}
//                                     View{" "}
//                                  </a>
//                               </div>
//                            </div>
//                         </div>
//                      </div>
//                   ))}
//                </div>
//             </div>
//          </div>
//       </>
//    );
// };

// export default ProductList;
