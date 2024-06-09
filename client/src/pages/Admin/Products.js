import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
   const [products, setProducts] = useState([]);

   //getall products
   const getAllProducts = async () => {
      try {
         const { data } = await axios.get("/api/v1/product/get-product");
         setProducts(data.products);
      } catch (error) {
      
         toast.error("Someething Went Wrong");
      }
   };

   //lifecycle method
   useEffect(() => {
      getAllProducts();
   }, []);
   return (
      <Layout>
         <div className="row dashboard">
            <div className="col-md-3">
               <AdminMenu />
            </div>
            <div className="col-md-9 ">
               <h1 className="text-center">All Products List</h1>
               <div className="py-3 py-md-5 bg-light">
                  <div className="container">
                     <div className="row">
                        <div className="col-md-12">
                           <h4 className="mb-4">Our Products</h4>
                        </div>
                        {products?.map((p) => (
                           <div className="col-md-3">
                              <Link
                                 key={p._id}
                                 to={`/dashboard/admin/product/${p.slug}`}
                              >
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
                                    </div>
                                 </div>
                              </Link>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default Products;
