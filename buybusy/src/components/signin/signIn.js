import signInStyleCss from "./sign.module.css";
import { useState } from 'react';
import { NavLink,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../fireBase";
import { useAuthContext } from "../../authContext";

export const SignIn = () => {
    const navigate=useNavigate()
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const { signIn }=useAuthContext();

    const onChangeEmail=(e)=>{
        setEmail(e.target.value)
    }

    const onChangePassword=(e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit=async (e)=>{
        try {
          e.preventDefault()
          let data={
            email:email,
            password:password
          }
          await signIn(data)
          toast.success("Login succesfully!")
          return navigate("/")
        } catch (error) {
          toast.error(error.message)
        }
    }
  return (
    <div className={signInStyleCss.container}>
      <div className={signInStyleCss.inputForm}>
        {/* heading */}
        <h1>Sign In</h1>
        {/* form */}
        <form onSubmit={handleSubmit}>
          {/* email */}
          <input type="email" placeholder="Enter Email" value={email} onChange={onChangeEmail} required />

          <br />
          {/* password */}
          <input type="password" placeholder="Enter Password" password={password} onChange={onChangePassword} required />
          <br />
          {/* submit button */}
          <button>Sign In</button>
        </form>
        <br />
        <span>Or &nbsp;</span>
        {/* link for signup page */}
        <NavLink to="/signUp">Sign Up Instead</NavLink>
      </div>
    </div>
  );
};
