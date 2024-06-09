// import React from "react";

// const ProductsD = () => {
//    return (
//       <>
//          <div className="py-3 py-md-5 bg-light">
//             <div className="container">
//                <div className="row">
//                   <div className="col-md-5 mt-3">
//                      <div className="bg-white border">
//                         <img
//                            src={`/api/v1/product/product-photo/${product._id}`}
//                            className="card-img-top"
//                            alt={product.name}
//                            height="300"
//                            width={"350px"}
//                         />
//                      </div>
//                   </div>
//                   <div className="col-md-7 mt-3">
//                      <div className="product-view">
//                         <h4 className="product-name">
//                            Name : {product.name}
//                            <label className="label-stock bg-success">
//                               In Stock
//                            </label>
//                         </h4>
//                         <hr />
//                         <p className="product-path">
//                            Home / Category / Product / {product.name}
//                         </p>
//                         <div>
//                            <span className="selling-price">
//                               Price :
//                               {product?.price?.toLocaleString("en-US", {
//                                  style: "currency",
//                                  currency: "USD",
//                               })}
//                            </span>
//                            <span className="original-price">&pound;499</span>
//                         </div>
//                         <div>
//                            <span className="selling-price">
//                               Category : {product?.category?.name}
//                            </span>
//                            <span className="original-price">&pound;499</span>
//                         </div>

//                         <div className="mt-2">
//                            <a href className="btn btn1">
//                               {" "}
//                               <i className="fa fa-shopping-cart" /> Add To Cart
//                            </a>
//                         </div>
//                         <div className="mt-3">
//                            <h5 className="mb-0">Small Description</h5>
//                            <p>Description : {product.description}</p>
//                         </div>
//                      </div>
//                   </div>
//                </div>
//                <div className="row">
//                   <div className="col-md-12 mt-3">
//                      <div className="card">
//                         <div className="card-header bg-white">
//                            <h4>Description</h4>
//                         </div>
//                         <div className="card-body">
//                            <p>
//                               Lorem Ipsum is simply dummy text of the printing
//                               and typesetting industry. Lorem Ipsum has been the
//                               industry's standard dummy text ever since the
//                               1500s, when an unknown printer took a galley of
//                               type and scrambled it to make a type specimen
//                               book. It has survived not only five centuries, but
//                               also the leap into electronic typesetting,
//                               remaining essentially unchanged. It was
//                               popularised in the 1960s with the release of
//                               Letraset sheets containing Lorem Ipsum passages,
//                               and more recently with desktop publishing software
//                               like Aldus PageMaker including versions of Lorem
//                               Ipsum.
//                            </p>
//                         </div>
//                      </div>
//                   </div>
//                </div>
//             </div>
//          </div>
//       </>
//    );
// };

// export default ProductsD;
