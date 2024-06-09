import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import mainLogo from "../../images/ecommerce-logo.png";
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
import "../../styles/Nabar.css";

const Header = () => {
   const [auth, setAuth] = useAuth();
   const [cart] = useCart();
   const categories = useCategory();
   const handleLogout = () => {
      setAuth({
         ...auth,
         user: null,
         token: "",
      });
      localStorage.removeItem("auth");
      toast.success("Logout Successfully");
   };
   return (
      <>
         <div className="main-navbar shadow-sm sticky-top">
            <div className="top-navbar">
               <div className="container-fluid">
                  <div className="row ju">
                     <div className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
                        <Link to={"/"}>
                           <img
                              className="main-logo"
                              src={mainLogo}
                              alt="EliteDeals"
                           />
                        </Link>
                     </div>
                     <SearchInput />
                     <div className="col-md-5 my-auto">
                        <ul className="nav justify-content-end ">
                           <li className="nav-item ">
                              <Link to={"/"} className="nav-link  text-size ">
                                 <FaHome className="icon" /> Home
                              </Link>
                           </li>
                           {!auth?.user ? (
                              <>
                                 <li className="nav-item">
                                    <NavLink
                                       to="/register"
                                       className="nav-link text-size"
                                    >
                                       <SiGnuprivacyguard className="icon" />{" "}
                                       Register
                                    </NavLink>
                                 </li>
                                 <li className="nav-item">
                                    <NavLink
                                       to="/login"
                                       className="nav-link text-size"
                                    >
                                       <RiLoginBoxFill className="icon" /> Login
                                    </NavLink>
                                 </li>
                              </>
                           ) : (
                              <>
                                 <li className="nav-item dropdown">
                                    <NavLink
                                       className="nav-link dropdown-toggle text-capitalize text-size"
                                       href="#"
                                       role="button"
                                       data-bs-toggle="dropdown"
                                       style={{ border: "none" }}
                                    >
                                       <FaUserCircle className="icon" />{" "}
                                       {auth?.user?.name}
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                       <li>
                                          <NavLink
                                             to={`/dashboard/${
                                                auth?.user?.role === 1
                                                   ? "admin"
                                                   : "user"
                                             }`}
                                             className="dropdown-item dashboad-font-weight"
                                          >
                                             <MdDashboard className="icon" />{" "}
                                             Dashboard
                                          </NavLink>
                                       </li>
                                       <li>
                                          <NavLink
                                             onClick={handleLogout}
                                             to="/login"
                                             className="dropdown-item dashboad-font-weight"
                                          >
                                             <RiLogoutBoxFill className="icon" />{" "}
                                             Logout
                                          </NavLink>
                                       </li>
                                    </ul>
                                 </li>
                              </>
                           )}
                           <li className="nav-item">
                              <Link
                                 to={"/cart"}
                                 className="nav-link text-size "
                              >
                                 <i className="fa fa-shopping-cart " />{" "}
                                 <Badge
                                    count={cart?.length}
                                    showZero
                                    offset={[10, -5]}
                                    className="text-size "
                                 >
                                    Cart
                                 </Badge>
                              </Link>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            <nav className="navbar navbar-expand-lg bg-light">
               <div className="container-fluid">
                  <Link
                     to={"/"}
                     className="navbar-brand d-block d-sm-block d-md-none d-lg-none"
                     href="#"
                  >
                     <img
                        className="main-logo"
                        src={mainLogo}
                        alt="EliteDeals"
                     />
                  </Link>
                  <button
                     className="navbar-toggler"
                     type="button"
                     data-bs-toggle="collapse"
                     data-bs-target="#navbarSupportedContent"
                     aria-controls="navbarSupportedContent"
                     aria-expanded="false"
                     aria-label="Toggle navigation"
                  >
                     <span className="navbar-toggler-icon" />
                  </button>
                  <div
                     className="collapse navbar-collapse"
                     id="navbarSupportedContent"
                  >
                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                           <Link
                              to={"/categories"}
                              className="nav-link"
                              href="#"
                           >
                              All Categories
                           </Link>
                        </li>
                        {categories?.map((c) => (
                           <li className="nav-item border-effect">
                              <Link
                                 to={`/category/${c.slug}`}
                                 className="nav-link "
                              >
                                 {c.name}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </nav>
         </div>
      </>
   );
};

export default Header;
