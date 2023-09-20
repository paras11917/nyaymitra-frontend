import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { lawyerRegisterRoute, userLoginRoute } from "../utils/APIRoutes";
import { Lawyer } from "../data";
import Select from 'react-select'
const LawyerRegister = () => {
   const navigate = useNavigate();
   const [check, setCheck] = useState(false);
   const [otpcheck, setOtpCheck] = useState(false);
   const otp = "12AB"
   const [inputotp, setinputotp] = useState("")
   const [data, setData] = useState(null);
   const [values, setValues] = useState({
      name: "",
      regno: "",
      phone: "",
      date: "",
      password: "",
      bio: "",
      fields: [],
      tags: []
   });
   const [fields, setFields] = useState([])
   const [tags, setTag] = useState([])

   const options = [
      { value: 'Bankruptcy Lawyer', label: 'Bankruptcy Lawyer' },
      { value: 'Corporate Lawyer', label: 'Corporate Lawyer' },
      { value: 'Criminal Defense Lawyer', label: 'Criminal Defense Lawyer' }
   ]

   const tag = [
      { value: 'Bankruptcy', label: 'Bankruptcy' },
      { value: 'Corporate', label: 'Corporate' },
      { value: 'Crimine', label: 'Crimine' }
   ]

   const handleSubmit = async () => {
      try {
         const f = fields.map(f => f.value)
         const t = tags.map(t => t.value)
         setValues({ ...values, fields: f, tags: t })
         console.log(values)
         const response = await axios.post(lawyerRegisterRoute, values);
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

   const handleCheck = async () => {
      const lawyer = Lawyer.filter(l => l['regno'] === values.regno)
      if (lawyer.length !== 0) {
         setCheck(true);
         const [day, month, year] = lawyer[0]["dob"].split('/');
         setValues({
            ...values,
            name: lawyer[0]["name"],
            phone: lawyer[0]["mobile"],
            date: `${year}-${month}-${day}`
         })
      }
   }

   const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
   };

   return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">

         <div>LawyerRegister</div>
         <div className="flex flex-col gap-3">

            {!check ? (
               <>
                  <input
                     type="text"
                     placeholder="Registration Number"
                     name="regno"
                     onChange={(e) => handleChange(e)}
                  />
                  <button className="h-10 bg-violet-800 rounded-lg" onClick={handleCheck}>check</button>
               </>
            ) : (
               <>
                  <input
                     type="text"
                     placeholder="Name"
                     name="name"
                     value={values.name}
                     onChange={(e) => handleChange(e)}
                  />
                  <input
                     type="text"
                     placeholder="Registration Number"
                     name="regno"
                     value={values.regno}
                     onChange={(e) => handleChange(e)}
                  />
                  <input
                     type="number"
                     placeholder="Phone Number"
                     name="phone"
                     value={values.phone}
                     onChange={(e) => handleChange(e)}
                  />
                  <input
                     type="date"
                     placeholder="Date"
                     name="date"
                     value={values.date}
                     onChange={(e) => handleChange(e)}
                  />
                  <input
                     type="password"
                     placeholder="Password"
                     name="password"
                     value={values.password}
                     onChange={(e) => handleChange(e)}
                  />

                  <textarea
                     placeholder="Bio"
                     name="bio"
                     value={values.bio}
                     onChange={(e) => handleChange(e)}
                  />

                  <Select
                     isMulti
                     isSearchable
                     value={fields}
                     options={options}
                     onChange={(selected) => {
                        setFields(selected)
                     }}
                  />


                  <Select
                     isMulti
                     isSearchable
                     value={tags}
                     options={tag}
                     onChange={(selected) => {
                        setTag(selected)
                     }}
                  />

                  {/* <input
                     type="password"
                     placeholder="OTP"
                     name="otp"
                     value={inputotp}
                     onChange={(e) => setinputotp(e.target.value)}
                  />
                  <button className="h-10 bg-violet-800 rounded-lg" onClick={() => inputotp === otp && setOtpCheck(true)}>verify</button> */}

                  <button className="h-10 bg-violet-800 rounded-lg" onClick={handleSubmit}>LawyerRegister</button>
               </>
            )
            }

         </div>
      </div>
   )
}

export default LawyerRegister