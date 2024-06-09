import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineLockReset } from "react-icons/md";
import forgetIcon from "../../images/forgot password.png";
import "../../styles/Login.css";

const ForgotPasssword = () => {
   const [email, setEmail] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [answer, setAnswer] = useState("");

   const navigate = useNavigate();

   // form function
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post("/api/v1/auth/forgot-password", {
            email,
            newPassword,
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
      <Layout title={"Forgot Password - Ecommerce APP"}>
         <div style={{ minHeight: "90vh" }}>
            <div className="wrapper margn" onSubmit={handleSubmit}>
               <div className="logo">
                  <img src={forgetIcon} alt="" />
               </div>
               <div className="text-center mt-4 name">Reset Password</div>
               <form className="p-3 mt-3">
                  <div className="form-field d-flex align-items-center">
                     <FaUser />
                     <input
                        type="email"
                        name="userName"
                        id="userName"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                  </div>
                  <div className="form-field d-flex align-items-center">
                     <RiLockPasswordFill />
                     <input
                        type="text"
                        name="password"
                        id="pwd"
                        placeholder="Enter Your Answer..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                     />
                  </div>
                  <div className="form-field d-flex align-items-center">
                     <RiLockPasswordFill />
                     <input
                        type="password"
                        name="password"
                        id="pwd"
                        placeholder="Enter Your Password..."
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                     />
                  </div>
                  <button className="btn mt-3">Login</button>
               </form>
               <div class="text-center fs-6">
                  <Link
                     to={"/forgot-password"}
                     className="btn-forget"
                     onClick={() => {
                        navigate("/forgot-password");
                     }}
                  >
                     Forget password?
                  </Link>{" "}
                  or <Link to={"/register"}>Sign up</Link>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default ForgotPasssword;
