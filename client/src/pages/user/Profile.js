import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { FaAddressCard, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaSquarePhone } from "react-icons/fa6";
import signupIcon from "../../images/user-3296.png";
import "../../styles/Signup.css";
const Profile = () => {
   //context
   const [auth, setAuth] = useAuth();
   //state
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [phone, setPhone] = useState("");
   const [address, setAddress] = useState("");

   //get user data
   useEffect(() => {
      const { email, name, phone, address } = auth?.user;
      setName(name);
      setPhone(phone);
      setEmail(email);
      setAddress(address);
   }, [auth?.user]);

   // form function
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const { data } = await axios.put("/api/v1/auth/profile", {
            name,
            email,
            password,
            phone,
            address,
         });
         if (data?.errro) {
            toast.error(data?.error);
         } else {
            setAuth({ ...auth, user: data?.updatedUser });
            let ls = localStorage.getItem("auth");
            ls = JSON.parse(ls);
            ls.user = data.updatedUser;
            localStorage.setItem("auth", JSON.stringify(ls));
            toast.success("Profile Updated Successfully");
         }
      } catch (error) {
       
         toast.error("Something went wrong");
      }
   };
   return (
      <Layout title={"Your Profile"}>
         <div className="container-fluid m-3 p-3 dashboard">
            <div className="row">
               <div className="col-md-3">
                  <UserMenu />
               </div>
               <div className="col-md-8">
                  <div style={{ marginTop: "-40px" }}>
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
                                    onChange={(e) =>
                                       setPassword(e.target.value)
                                    }
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

                              <button className="btn mt-3" type="submit">
                                 Update
                              </button>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default Profile;
