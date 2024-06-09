import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";
const Footer = () => {
   return (
      <>
         <div>
            <div className="footer-area">
               <div className="container">
                  <div className="row">
                     <div className="col-md-3">
                        <h4 className="footer-heading">ElitesDeals </h4>
                        <div className="footer-underline" />
                        <p>
                           Welcome to Elitedeals! Find high-quality products at
                           great prices. Enjoy easy navigation and secure
                           payments for a seamless shopping experience.
                        </p>
                     </div>
                     <div className="col-md-3">
                        <h4 className="footer-heading">Quick Links</h4>
                        <div className="footer-underline" />
                        <div className="mb-2">
                           <Link to={"/"} href className="text-white">
                              Home
                           </Link>
                        </div>
                        <div className="mb-2">
                           <Link to={"/about"} href className="text-white">
                              About Us
                           </Link>
                        </div>
                        <div className="mb-2">
                           <Link to={"/contact"} href className="text-white">
                              Contact Us
                           </Link>
                        </div>
                        <div className="mb-2">
                           <Link to="/policy" className="text-white">
                              Privacy Policy
                           </Link>
                        </div>
                     </div>
                     <div className="col-md-3">
                        <h4 className="footer-heading">Shop Now</h4>
                        <div className="footer-underline" />
                        <div className="mb-2">
                           <Link to={"/"} href className="text-white">
                              Collections
                           </Link>
                        </div>
                        <div className="mb-2">
                           <Link to={"/"} href className="text-white">
                              Trending Products
                           </Link>
                        </div>
                        <div className="mb-2">
                           <Link to={"/"} href className="text-white">
                              New Arrivals Products
                           </Link>
                        </div>
                        <div className="mb-2">
                           <Link to={"/cart"} href className="text-white">
                              Cart
                           </Link>
                        </div>
                     </div>
                     <div className="col-md-3">
                        <h4 className="footer-heading">Reach Us</h4>
                        <div className="footer-underline" />
                        <div className="mb-2">
                           <p>
                              <i className="fa fa-map-marker" /> #444, some main
                              road, some area, some street, Guwahati, india -
                              560077
                           </p>
                        </div>
                        <div className="mb-2">
                           <a href className="text-white">
                              <i className="fa fa-phone" /> +91 888-XXX-XXXX
                           </a>
                        </div>
                        <div className="mb-2">
                           <a href className="text-white">
                              <i className="fa fa-envelope" />
                              &nbsp; eliteDeals@gmail.com
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="copyright-area">
               <div className="container">
                  <div className="row">
                     <div className="col-md-8">
                        <p className>
                           © 2024 - Juman Saikia All rights reserved.
                        </p>
                     </div>
                     <div className="col-md-4">
                        <div className="social-media">
                           Get Connected:
                           <Link to={"#"} href>
                              <i className="fa fa-facebook" />
                           </Link>
                           <Link to={"#"} href>
                              <i className="fa fa-twitter" />
                           </Link>
                           <Link to={"#"} href>
                              <i className="fa fa-instagram" />
                           </Link>
                           <Link to={"#"} href>
                              <i className="fa fa-youtube" />
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Footer;
