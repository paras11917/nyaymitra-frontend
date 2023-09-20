import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { lawyerLoginRoute, userLoginRoute } from "../utils/APIRoutes";

const LawyerLogin = () => {
   const navigate = useNavigate();
   const [values, setValues] = useState({
      regno: "",
      password: "",
   });

   const handleSubmit = async () => {
      try {
         const { regno, password } = values;
         const response = await axios.post(lawyerLoginRoute, {
            regno,
            password,
         });
         if (response) {
            localStorage.setItem(
               "nayay",
               JSON.stringify(response.data.lawyer)
            );
            navigate('/chatl')
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

         <div>LawyerLogin</div>
         <div className="flex flex-col gap-3">

            <input
               type="text"
               placeholder="Registration Number"
               name="regno"
               onChange={(e) => handleChange(e)}
            />
            <input
               type="password"
               placeholder="Password"
               name="password"
               onChange={(e) => handleChange(e)}
            />
            <button className="h-10 bg-violet-800 rounded-lg" onClick={handleSubmit}>LawyerLogin</button>
         </div>
      </div>
   )
}

export default LawyerLogin