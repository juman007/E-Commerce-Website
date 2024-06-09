import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";
import { FaAddressCard } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import signupIcon from "../../images/Sign Up.png";
import "../../styles/Signup.css";

const Register = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [phone, setPhone] = useState("");
   const [address, setAddress] = useState("");
   const [answer, setAnswer] = useState("");
   const navigate = useNavigate();

   // form function
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post("/api/v1/auth/register", {
            name,
            email,
            password,
            phone,
            address,
            answer,
         });
         if (res && res.data.success) {
            toast.success(res.data && res.data.message);
            navigate("/login");
         } else {
            toast.error(res.data.message);
         }
      } catch (error) {
         
         toast.error("Something went wrong");
      }
   };

   return (
      <Layout title="Register - Ecommer App">
         <div style={{ minHeight: "90vh" }}>
            <div className="wrapper margn">
               <div className="logo">
                  <img src={signupIcon} alt="Sign Up" />
               </div>
               <div className="text-center mt-4 name">Signup</div>
               <form className="p-3 mt-3" onSubmit={handleSubmit}>
                  <div className="form-field d-flex align-items-center">
                     <FaUser />
                     <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your Name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                     />
                  </div>
                  <div className="form-field d-flex align-items-center">
                     <MdEmail />
                     <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                  </div>
                  <div className="form-field d-flex align-items-center">
                     <RiLockPasswordFill />
                     <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Your Password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                  </div>
                  <div className="form-field d-flex align-items-center">
                     <FaSquarePhone />
                     <input
                        type="number"
                        name="phone"
                        id="phone"
                        placeholder="Enter your phone number..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                     />
                  </div>
                  <div className="form-field d-flex align-items-center">
                     <FaAddressCard />
                     <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Enter your address..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                     />
                  </div>
                  <div className="form-field d-flex align-items-center">
                     <FaQuestionCircle />
                     <input
                        type="text"
                        name="answer"
                        id="answer"
                        placeholder="Enter your favorite sport..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                     />
                  </div>
                  <button className="btn mt-3" type="submit">
                     Register
                  </button>
               </form>
               <div className="text-center fs-6">
                  <Link to="/forgot-password" className="btn-forget">
                     Forget password?
                  </Link>{" "}
                  or <Link to={"/login"}>Login</Link>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default Register;
