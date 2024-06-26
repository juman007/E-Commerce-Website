import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";
import Slider from "../components/Slider";
import "../styles/ProductList.css";

const HomePage = () => {
   const navigate = useNavigate();
   const [cart, setCart] = useCart();
   const [products, setProducts] = useState([]);
   const [categories, setCategories] = useState([]);
   const [checked, setChecked] = useState([]);
   const [radio, setRadio] = useState([]);
   const [total, setTotal] = useState(0);
   const [page, setPage] = useState(1);
   const [loading, setLoading] = useState(false);

   //get all cat
   const getAllCategory = async () => {
      try {
         const { data } = await axios.get("/api/v1/category/get-category");
         if (data?.success) {
            setCategories(data?.category);
         }
      } catch (error) {}
   };

   useEffect(() => {
      getAllCategory();
      getTotal();
   }, []);
   //get products
   const getAllProducts = async () => {
      try {
         setLoading(true);
         const { data } = await axios.get(
            `/api/v1/product/product-list/${page}`
         );
         setLoading(false);
         setProducts(data.products);
      } catch (error) {
         setLoading(false);
      }
   };

   //getTOtal COunt
   const getTotal = async () => {
      try {
         const { data } = await axios.get("/api/v1/product/product-count");
         setTotal(data?.total);
      } catch (error) {}
   };

   useEffect(() => {
      if (page === 1) return;
      loadMore();
   }, [page]);
   //load more
   const loadMore = async () => {
      try {
         setLoading(true);
         const { data } = await axios.get(
            `/api/v1/product/product-list/${page}`
         );
         setLoading(false);
         setProducts([...products, ...data?.products]);
      } catch (error) {
         setLoading(false);
      }
   };

   // filter by cat
   const handleFilter = (value, id) => {
      let all = [...checked];
      if (value) {
         all.push(id);
      } else {
         all = all.filter((c) => c !== id);
      }
      setChecked(all);
   };
   useEffect(() => {
      if (!checked.length || !radio.length) getAllProducts();
   }, [checked.length, radio.length]);

   useEffect(() => {
      if (checked.length || radio.length) filterProduct();
   }, [checked, radio]);

   //get filterd product
   const filterProduct = async () => {
      try {
         const { data } = await axios.post("/api/v1/product/product-filters", {
            checked,
            radio,
         });
         setProducts(data?.products);
      } catch (error) {}
   };
   return (
      <Layout title={"ALl Products - Best offers "}>
         <Slider />

         <div className="container-fluid row mt-3 home-page">
            <div className="col-md-3 filters fix">
               <h4 className="text-center">Filter By Category</h4>
               <div className="d-flex flex-column">
                  {categories?.map((c) => (
                     <Checkbox
                        key={c._id}
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                     >
                        {c.name}
                     </Checkbox>
                  ))}
               </div>
               {/* price filter */}
               <h4 className="text-center mt-4">Filter By Price</h4>
               <div className="d-flex flex-column">
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                     {Prices?.map((p) => (
                        <div key={p._id}>
                           <Radio value={p.array}>{p.name}</Radio>
                        </div>
                     ))}
                  </Radio.Group>
               </div>
               <div className="d-flex flex-column">
                  <button
                     className="btn btn-danger"
                     onClick={() => window.location.reload()}
                  >
                     RESET FILTERS
                  </button>
               </div>
            </div>

            <div className="col-md-9 ">
               <h1 className="text-center">All Products</h1>
               {/* <ProductList /> */}
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
                                    <img
                                       src={`/api/v1/product/product-photo/${p._id}`}
                                       alt="Laptop"
                                    />
                                 </div>
                                 <div className="product-card-body">
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
                                       <a
                                          href
                                          className="btn btn1"
                                          onClick={() => {
                                             setCart([...cart, p]);
                                             localStorage.setItem(
                                                "cart",
                                                JSON.stringify([...cart, p])
                                             );
                                             toast.success(
                                                "Item Added to cart"
                                             );
                                          }}
                                       >
                                          Add To Cart
                                       </a>
                                       <a href className="btn btn1">
                                          {" "}
                                          <i className="fa fa-heart" />{" "}
                                       </a>
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

               <div className="m-2 p-3">
                  {products && products.length < total && (
                     <button
                        className="btn loadmore"
                        onClick={(e) => {
                           e.preventDefault();
                           setPage(page + 1);
                        }}
                     >
                        {loading ? (
                           "Loading ..."
                        ) : (
                           <>
                              {" "}
                              Loadmore <AiOutlineReload />
                           </>
                        )}
                     </button>
                  )}
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default HomePage;
