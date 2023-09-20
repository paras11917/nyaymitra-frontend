import React, { useState } from "react";
import { useNavigate } from "react-router";
const { Heroimg } = require("../images/Hero-Wrapper__image--center.svg")
export const Hero = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState(null)
  return (

    <div className="w-full flex flex-col justify-center items-center">
      <div className="mx-[100px] mt-[132px] flex flex-row">
        <div>
          {!role &&

            <>
              <div className="text-[53px] font-extrabold leading-[71px] text-[#1A202C]">
                Select, Connect and
                Resolve
              </div>
              <div className="text-[18px] font-400 not-italic leading-[36px] text-gray-700 mb-[56px] mt-[28px]">
                Empowering You to Choose, Connect, and Achieve Justice – Where Freedom Begins
              </div>
              <div className="flex flex-row gap-[32px]">
                <div onClick={() => setRole("user")} className="text-white rounded-[5px] bg-[#3D63EA] px-[30px] py-[20px] shadow-[_0px_4px_49px_0px_rgba(_0,_0,_0,_0.15)] w-fit">
                  I am a User
                </div>
                <div onClick={() => setRole("lawyer")} className="text-white rounded-[5px] bg-[#3D63EA] px-[36px] py-[20px] shadow-[_0px_4px_49px_0px_rgba(_0,_0,_0,_0.15)] w-fit">
                  I am a Lawyer
                </div>
              </div>
            </>
          }


          {role && role == "user" && <> <div className="text-[53px] font-extrabold leading-[71px] text-[#1A202C]">
            Select, Connect and
            Resolve
          </div>
            <div className="text-[18px] font-400 not-italic leading-[36px] text-gray-700 mb-[56px] mt-[28px]">
              Empowering You to Choose, Connect, and Achieve Justice – Where Freedom Begins
            </div>
            <div className="flex flex-row gap-[32px]">
              <div onClick={() => navigate("/user/login")} className="text-white rounded-[5px] bg-[#3D63EA] px-[30px] py-[20px] shadow-[_0px_4px_49px_0px_rgba(_0,_0,_0,_0.15)] w-fit">
                Login
              </div>
              <div onClick={() => navigate("/user/register")} className="text-white rounded-[5px] bg-[#3D63EA] px-[36px] py-[20px] shadow-[_0px_4px_49px_0px_rgba(_0,_0,_0,_0.15)] w-fit">
                Sign Up
              </div>
            </div></>}

          {role && role == "lawyer" &&
            <>
              <div className="text-[53px] font-extrabold leading-[71px] text-[#1A202C]">
                Select, Connect and
                Resolve
              </div>
              <div className="text-[18px] font-400 not-italic leading-[36px] text-gray-700 mb-[56px] mt-[28px]">
                Empowering You to Choose, Connect, and Achieve Justice – Where Freedom Begins
              </div>
              <div className="flex flex-row gap-[32px]">
                <div onClick={() => navigate("/lawyer/login")} className="text-white rounded-[5px] bg-[#3D63EA] px-[30px] py-[20px] shadow-[_0px_4px_49px_0px_rgba(_0,_0,_0,_0.15)] w-fit">
                  Login
                </div>
                <div onClick={() => navigate("/lawyer/register")} className="text-white rounded-[5px] bg-[#3D63EA] px-[36px] py-[20px] shadow-[_0px_4px_49px_0px_rgba(_0,_0,_0,_0.15)] w-fit">
                  Sign Up
                </div>
              </div>
            </>
          }


        </div>
        <div className="h-[546px] w-[614px]">

          <img className="h-full w-full" src={require("../images/web-development 1.png")} alt="hero" />


        </div>



      </div >



    </div >
  );
}
