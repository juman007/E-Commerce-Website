import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
const Search = () => {
   const [values, setValues] = useSearch();
   const [cart, setCart] = useCart();
   const navigate = useNavigate();
   return (
      <Layout title={"Search results"}>
         <div className="container">
            <div className="text-center">
               <h1>Search Resuts</h1>
               <h6>
                  {values?.results.length < 1
                     ? "No Products Found"
                     : `Found ${values?.results.length}`}
               </h6>

               <div className="py-3 py-md-5 bg-light">
                  <div className="container">
                     <div className="row">
                        <div className="col-md-12">
                           <h4 className="mb-4">Our Products</h4>
                        </div>
                        {values?.results.map((p) => (
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
            </div>
         </div>
      </Layout>
   );
};

export default Search;
