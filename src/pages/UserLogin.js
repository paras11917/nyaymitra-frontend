import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { userLoginRoute } from "../utils/APIRoutes";

const UserLogin = () => {
   const navigate = useNavigate();
   const [values, setValues] = useState({
      email: "",
      password: "",
   });

   const handleSubmit = async () => {
      try {
         const { email, password } = values;
         const response = await axios.post(userLoginRoute, {
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

         <div>UserLogin</div>
         <div className="flex flex-col gap-3">

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
            <button className="h-10 bg-violet-800 rounded-lg" onClick={handleSubmit}>UserLogin</button>
         </div>
      </div>
   )
}

export default UserLogin