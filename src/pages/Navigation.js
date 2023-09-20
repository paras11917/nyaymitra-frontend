import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { logoutRoute } from "../utils/APIRoutes";
import axios from "axios";
import { Link } from "react-router-dom";


const Navigation = () => {
    const [userID, setUserID] = useState(null);
    const navigate = useNavigate();
    const ref = useRef(null);

    useEffect(() => {
        if (!localStorage.getItem("nayay")) {
            navigate("/");
        } else {
            setUserID(
                JSON.parse(localStorage.getItem("nayay"))._id
            );
        }
    }, [])

    const handleClick = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const logout = async () => {
        try {
            const id = await JSON.parse(localStorage.getItem("nayay"))._id;
            const data = await axios.get(`${logoutRoute}/${id}`);
            if (data.status === 200) {
                localStorage.clear();
                setUserID(null)
                navigate("/");
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="w-full  flex flex-row items-center justify-between px-[20px] p-[10px] shadow-lg">
            <div className="hover:cursor-pointer" onClick={() => navigate("/")}>
                <div className="flex flex-row gap-[10px] items-center">
                    <div className="w-[20px] h-[15px]">
                        <img className="h-full w-full" src={require("../images/Vector.png")} alt="home" />
                    </div>
                    <div className="flex flex-row">
                        <div className="text-[24px] leading-[34px] font-[400]">Nyay</div>
                        <div className="text-[24px] leading-[34px] font-[700]"> Mitra</div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-row items-center gap-[40px] justify-between">
                    <div onClick={() => navigate("/")} className="hover:cursor-pointer text-[16px] text-[#4A5568] font-[500] leading-[25px]">Home</div>
                    <div onClick={() => navigate("/community")} className="hover:cursor-pointer text-[16px] text-[#4A5568] font-[500] leading-[25px]">Community</div>
                    <div onClick={() => navigate("/updates")} className="hover:cursor-pointer text-[16px]  text-[#4A5568] font-[500] leading-[25px]">Updates</div>
                    <Link to={"https://f8239e46569ea2e230.gradio.live"} className="hover:cursor-pointer text-[16px] text-[#4A5568] font-[500] leading-[25px]">Nyay Kosh</Link>
                    <div onClick={() => navigate("/connect")} className="hover:cursor-pointer text-[16px] text-[#4A5568] font-[500] leading-[25px]">Connect</div>
                    <div onClick={() => navigate("/tracking")} className="hover:cursor-pointer text-[16px] text-[#4A5568] font-[500] leading-[25px]">Track</div>
                    <div className="text-[16px]  text-[#4A5568] font-[500] leading-[25px]">Profile</div>
                </div>
            </div>
            <div className="flex gap-3">
                <div className="max-w-[124px] h-[42px] px-[25px] py-[14px] text-[14px] font-[600] leading-[14px] rounded-[5px] bg-gradient-to-r from-[#6675F7]
                           to-[#57007B]">Contact us</div>

                {userID && <div onClick={logout} className="max-w-[124px] h-[42px] px-[25px] py-[14px] text-[14px] font-[600] leading-[14px] rounded-[5px] bg-gradient-to-r from-[#6675F7]
                           to-[#57007B]">Logout</div>}
            </div>
        </div>
    );
}


export default Navigation;