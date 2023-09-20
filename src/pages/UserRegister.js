import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { userLoginRoute, userRegisterRoute } from "../utils/APIRoutes";

const UserRegister = () => {
   const navigate = useNavigate();
   const [values, setValues] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
   });

   const handleSubmit = async () => {
      try {

         const { name, email, password } = values;
         const response = await axios.post(userRegisterRoute, {
            name,
            email,
            password,
         });
         if (response) {
            console.log(response)
            localStorage.setItem(
               "nayay",
               JSON.stringify(response.data.user)
            );
            navigate('/connect')
         }
      } catch (err) {
         console.log(err)
      }
   };

   const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
   };

   return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">

         <div>UserRegister</div>
         <div className="flex flex-col gap-3">
            <input
               type="text"
               placeholder="Name"
               name="name"
               onChange={(e) => handleChange(e)}
            />
            <input
               type="email"
               placeholder="Email"
               name="email"
               onChange={(e) => handleChange(e)}
            />
            <input
               type="password"
               placeholder="Password"
               name="password"
               onChange={(e) => handleChange(e)}
            />

            <button className="h-10 bg-violet-800 rounded-lg" onClick={handleSubmit}>UserRegister</button>
         </div>
      </div>
   )
}

export default UserRegister