import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import "../../styles/Login.css";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import userLoginIcon from "../../images/user-3296.png";
const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [auth, setAuth] = useAuth();

   const navigate = useNavigate();
   const location = useLocation();

   // form function
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post("/api/v1/auth/login", {
            email,
            password,
         });
         if (res && res.data.success) {
            toast.success(res.data && res.data.message);
            setAuth({
               ...auth,
               user: res.data.user,
               token: res.data.token,
            });
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate(location.state || "/");
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
            <div className="wrapper margn" onSubmit={handleSubmit}>
               <div className="logo">
                  <img src={userLoginIcon} alt="" />
               </div>
               <div className="text-center mt-4 name">Login</div>
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
                        type="password"
                        name="password"
                        id="pwd"
                        placeholder="Enter Your Password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

export default Login;
